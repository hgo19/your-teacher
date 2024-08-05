import connection from "../database/mysql/connection.js";

const pool = connection;

export async function saveUser(input) {
  const { name, email, password } = input;
  const params = [name, email, password];
  const query =
    "INSERT INTO TeacherAi.user (name, email, password) VALUES (?, ?, ?)";
  const [{ insertId }] = await pool.execute(query, params);

  return insertId;
}
