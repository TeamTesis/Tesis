import mysql from "serverless-mysql";

/**  export const conn = mysql({
  config: {
    host: "127.0.0.1" ,
    user: "root",
    password: "d429aa0dd70102",
    port: 3306,
    database: "nextmysqlcrud",
  },
});
*/ 

export const conn = mysql({
  config: {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
  },
}); 


