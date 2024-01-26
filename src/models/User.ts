import bcrypt from "bcrypt";
import { query } from "../db";

interface User {
  name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
}

export const readUser = async (id: number) => {
  try {
    const result = await query("SELECT * FROM Users WHERE id = $1", [id]);
    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const updateUser = async (id: number, updates: Partial<User>) => {
  try {
    const { name, last_name, email, phone_number, password } = updates;
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }
    const result = await query(
      "UPDATE Users SET name=$1 , last_name=$2 , email=$3 , phone_number=$4 , password=$5 WHERE id=$6 RETURNING *",
      [name, last_name, email, phone_number, hashedPassword || null, id]
    );
    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const deleteUser = async (id: number) => {
  try {
    const result = await query("DELETE FROM Users WHERE id=$1", [id]);
    return result.rowCount;
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const result = await query("SELECT * FROM Users", []);
    return result.rows;
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const signupUser = async (user: {
  name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
}) => {
  try {
    const { name, last_name, email, phone_number, password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await query(
      "INSERT INTO users(name, last_name, email, phone_number, password) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [name, last_name, email, phone_number, hashedPassword]
    );
    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const signinUser = async (email: string, password: string) => {
  try {
    const result = await query("SELECT * FROM Users WHERE email = $1", [email]);
    const user = result.rows[0];
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    } else {
      return null;
    }
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};
