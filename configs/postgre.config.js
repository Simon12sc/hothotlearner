import { Sequelize } from "sequelize";

const db=new Sequelize("blog","postgres","simon123",{
    host:"localhost",
    dialect:"postgres"
})
export default db;
