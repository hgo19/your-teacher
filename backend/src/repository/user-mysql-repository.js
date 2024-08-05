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

export async function findUserByEmail(email) {
  const query = "SELECT * FROM TeacherAi.user AS u WHERE u.email = ?";
  const [[row]] = await pool.execute(query, [email]);
  return row;
}
