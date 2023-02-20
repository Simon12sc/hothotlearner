import { Sequelize } from "sequelize";
import dotenv from "dotenv"
dotenv.config({path:"configs/.env"});
// const db=new Sequelize(process.env.DATABASE,process.env.DB_USER,process.env.DB_PASSWORD,{
//     host:process.env.DB_HOST,
//     dialect:"postgres"
// })
const db=new Sequelize(process.env.DATABASE,process.env.DB_USER,process.env.DB_PASSWORD,{
        host:process.env.DB_HOST,
       dialect:"postgres",
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
})

export default db;
