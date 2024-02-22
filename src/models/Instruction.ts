import { query } from "../db";

interface Instruction {
    id?: number;
    user_id: number;
    name: string;
    instructions: string;
    created_at: string;
}

export const readInstruction = async (id: number) => {
    try {
        const result = await query("SELECT * FROM instructions WHERE id = $1", [id]);
        return result.rows[0];
    } catch (err) {
        const error = err as Error;
        throw error;
    }
};

export const deleteInstruction = async (id: number) => {
    try {
        const result = await query("DELETE FROM instructions WHERE id=$1", [id]);
        return result.rowCount;
    } catch (err) {
        const error = err as Error;
        throw error;
    }
};

export const getAllInstructions = async (id: number) => {
    try {
        const result = await query("SELECT * FROM instructions where user_id = $1", [id]);
        return result.rows;
    } catch (err) {
        const error = err as Error;
        throw error;
    }
};

export const createInstruction = async (data: Partial<Instruction>) => {
    try {
        const result = await query(
            "INSERT INTO instructions(user_id, name, instructions, created_at) VALUES($1,$2,$3,$4) returning *",
            [data.user_id, data.name, data.instructions, new Date().toISOString()]
        );
        return result.rows;
    } catch (err) {
        const error = err as Error;
        throw error;
    }
};
