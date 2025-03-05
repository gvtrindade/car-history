import postgres from "postgres";

const sql = postgres({
  host: process.env.POSTGRES_HOST,
  port: 5433,
  database: process.env.POSTGRES_DATABASE,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
});

export default sql;
