import { query } from "../db";
import bcrypt from "bcrypt";

interface Company {
  name: string;
  profile_id: string;
  registration_date: Date;
  license_valid_until: Date;
  password: string;
}

export const readCompany = async (id: number) => {
  try {
    const result = await query("SELECT * FROM Company WHERE id = $1", [id]);
    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const updateCompany = async (id: number, updates: Partial<Company>) => {
  try {
    const { name, profile_id, registration_date, license_valid_until, password } = updates;
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }
    const result = await query(
      "UPDATE Company SET name=$1 , profile_id=$2 , registration_date=$3 , license_valid_until=$4 , password=$5 WHERE id=$6 RETURNING *",
      [name, profile_id, registration_date, license_valid_until, hashedPassword || null, id]
    );
    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const deleteCompany = async (id: number) => {
  try {
    const result = await query("DELETE FROM Company WHERE id=$1", [id]);
    return result.rowCount;
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const getAllCompanies = async () => {
  try {
    const result = await query("SELECT * FROM Company", []);
    return result.rows;
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const signupCompany = async (company: { name: string; profile_id: string; registration_date: Date; license_valid_until: Date; password: string }) => {
  try {
    const { name, profile_id, registration_date, license_valid_until, password } = company;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await query(
      "INSERT INTO Company(name, profile_id, registration_date, license_valid_until, password) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [name, profile_id, registration_date, license_valid_until, hashedPassword]
    );
    return result.rows[0];
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};

export const signinCompany = async (profile_id: string, password: string) => {
  try {
    const result = await query("SELECT * FROM Company WHERE profile_id = $1", [profile_id]);
    const company = result.rows[0];
    if (company && (await bcrypt.compare(password, company.password))) {
      return company;
    } else {
      return null;
    }
  } catch (err) {
    const error = err as Error;
    throw error;
  }
};
