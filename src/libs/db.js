import mysql from "serverless-mysql";

export const conn = mysql({
  config: {
    host: "127.0.0.1" /**localhost */,
    user: "root",
    password: "d429aa0dd70102",
    port: 3306,
    database: "nextmysqlcrud",
  },
});
