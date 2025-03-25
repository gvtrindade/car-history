import postgres from "postgres";

const sql = postgres({
  host: process.env.POSTGRES_HOST ?? "localhost",
  port: parseInt(process.env.POSTGRES_PORT ?? "5433"),
  database: process.env.POSTGRES_DATABASE ?? "car-history",
  username: process.env.POSTGRES_USERNAME ?? "postgres",
  password: process.env.POSTGRES_PASSWORD ?? "postgres",
});

export default sql;
