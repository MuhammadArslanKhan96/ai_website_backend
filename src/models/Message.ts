import { query } from "../db";

interface Message {
    id?: number;
    user_id: number;
    role: string;
    content: string;
    created_at: string;
}

export const readMessage = async (id: number) => {
    try {
        const result = await query("SELECT * FROM messages WHERE id = $1", [id]);
        return result.rows[0];
    } catch (err) {
        const error = err as Error;
        throw error;
    }
};

export const deleteMessage = async (id: number) => {
    try {
        const result = await query("DELETE FROM messages WHERE id=$1", [id]);
        return result.rowCount;
    } catch (err) {
        const error = err as Error;
        throw error;
    }
};

export const getAllMessages = async (id: number) => {
    try {
        const result = await query("SELECT * FROM messages where user_id = $1", [id]);
        return result.rows;
    } catch (err) {
        const error = err as Error;
        throw error;
    }
};

export const createMessage = async (data: Partial<Message>) => {
    try {
        const result = await query(
            "INSERT INTO messages(user_id, role, content, created_at) VALUES($1,$2,$3,$4) returning *",
            [data.user_id, data.role, data.content, new Date().toISOString()]
        );
        return result.rows;
    } catch (err) {
        const error = err as Error;
        throw error;
    }
};
