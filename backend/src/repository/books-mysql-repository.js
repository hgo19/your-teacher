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
