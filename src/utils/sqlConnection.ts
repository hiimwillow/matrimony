import mysql, { ConnectionOptions } from "mysql2/promise";

export async function sqlConnection(query?: string, data?: any) {
  try {
    const access: ConnectionOptions = {
      host: process.env.MYSQL_HOST,
      port: 3306,
      database: process.env.MYSQL_DB,
      user: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
    };

    const db = await mysql.createConnection(access);

    const [result] = await db.execute(query || "", data);

    await db.end();

    return result;
  } catch (error) {
    console.log(error);

    return error;
  }
}
