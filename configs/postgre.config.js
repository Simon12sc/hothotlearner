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

// const db=new Sequelize("postgres://hot_hot_learner_user:e97Bp7ZfZtFKhD5so22IJMeL3jrpoNMm@dpg-cf82qi2rrk0e2as1e7h0-a.oregon-postgres.render.com/hot_hot_learner")
export default db;
