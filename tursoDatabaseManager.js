import { createClient } from '@libsql/client';

class TursoDatabaseManager {
    constructor() {
        // Configuración del cliente de Turso
        this.client = createClient({
            url: 'libsql://blockforsaleawards-unosowacho.turso.io',
            authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NDI4NTk0NTksImlkIjoiNTAxMGExNDctYTQ2My00OWRhLWE3YjktNzk3NzAyNGNkZjAyIiwicmlkIjoiNzE0YzFlMTMtMWIwOC00ZmJhLTgwMWEtOWM3MWYxOWJmNTM0In0.Rgy2WDdlDAJa4En886MCqLFlJpid_Ke3cHV_v8v_FrRPS3IQt-g8Mc99dVCoygPxYw6aY1P3_Ys3hBCu8vktCQ'
        });
    }

    // Inicializar la base de datos (crear tablas si no existen)
    async initializeDatabase() {
        try {
            // Crear tabla de usuarios de Discord
            await this.client.execute(`
                CREATE TABLE IF NOT EXISTS discord_users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    discord_id TEXT UNIQUE,
                    username TEXT,
                    email TEXT,
                    avatar TEXT,
                    discriminator TEXT,
                    access_token TEXT,
                    refresh_token TEXT,
                    linked_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `);

            // Crear tabla de votos
            await this.client.execute(`
                CREATE TABLE IF NOT EXISTS votes (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_discord_id TEXT,
                    category_id TEXT,
                    nominee_index INTEGER,
                    voted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    UNIQUE(user_discord_id, category_id)
                )
            `);

            console.log('Tablas de usuarios y votos verificadas/creadas');
        } catch (error) {
            console.error('Error inicializando base de datos:', error);
        }
    }

    // Guardar o actualizar usuario de Discord
    async saveDiscordUser(userData) {
        try {
            const result = await this.client.execute({
                sql: `
                    INSERT OR REPLACE INTO discord_users 
                    (discord_id, username, email, avatar, discriminator, access_token, refresh_token) 
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                `,
                args: [
                    userData.id,
                    userData.username,
                    userData.email,
                    userData.avatar,
                    userData.discriminator,
                    userData.access_token,
                    userData.refresh_token
                ]
            });

            console.log(`Usuario ${userData.username} guardado/actualizado`);
            return result;
        } catch (error) {
            console.error('Error guardando usuario:', error);
            throw error;
        }
    }

    // Verificar si un usuario está vinculado
    async checkUserLinked(discordId) {
        try {
            const result = await this.client.execute({
                sql: 'SELECT * FROM discord_users WHERE discord_id = ?',
                args: [discordId]
            });

            return result.rows.length > 0;
        } catch (error) {
            console.error('Error verificando usuario:', error);
            throw error;
        }
    }

    // Obtener información de usuario por Discord ID
    async getUserByDiscordId(discordId) {
        try {
            const result = await this.client.execute({
                sql: 'SELECT * FROM discord_users WHERE discord_id = ?',
                args: [discordId]
            });

            return result.rows[0] || null;
        } catch (error) {
            console.error('Error obteniendo usuario:', error);
            throw error;
        }
    }

    // Guardar un voto
    async saveVote(userDiscordId, categoryId, nomineeIndex) {
        try {
            const result = await this.client.execute({
                sql: `
                    INSERT OR REPLACE INTO votes 
                    (user_discord_id, category_id, nominee_index) 
                    VALUES (?, ?, ?)
                `,
                args: [userDiscordId, categoryId, nomineeIndex]
            });

            console.log(`Voto guardado para usuario ${userDiscordId} en categoría ${categoryId}`);
            return result;
        } catch (error) {
            console.error('Error guardando voto:', error);
            throw error;
        }
    }

    // Verificar si un usuario ya ha votado en una categoría
    async hasUserVotedInCategory(userDiscordId, categoryId) {
        try {
            const result = await this.client.execute({
                sql: 'SELECT * FROM votes WHERE user_discord_id = ? AND category_id = ?',
                args: [userDiscordId, categoryId]
            });

            return result.rows.length > 0;
        } catch (error) {
            console.error('Error verificando voto previo:', error);
            throw error;
        }
    }
}

export const databaseManager = new TursoDatabaseManager();

// Call initialization directly when the module is imported
databaseManager.initializeDatabase();