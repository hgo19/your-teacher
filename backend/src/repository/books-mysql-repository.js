import connection from "../database/mysql/connection.js";

const pool = connection;

export async function saveBook(input) {
  const { author, title, publishedAt, fileUrl } = input;
  const params = [author, title, publishedAt, fileUrl];
  const query =
    "INSERT INTO TeacherAi.book (author, title, publishedAt, fileUrl) VALUES (?, ?, ?, ?)";
  const [{ insertId }] = await pool.execute(query, params);

  return insertId;
}

export async function getBookById(id) {
  const query = "SELECT * FROM TeacherAi.book WHERE id = ?";
  const [rows] = await pool.execute(query, [id]);

  return rows[0] || null;
}

export async function getAllBooks() {
  const query = "SELECT * FROM TeacherAi.book";
  const [rows] = await pool.execute(query);

  return rows;
}

export async function deleteBookById(id) {
  const query = "DELETE FROM TeacherAi.book WHERE id = ?";
  const { affectedRows } = await pool.execute(query, [id]);

  return affectedRows > 0;
}
