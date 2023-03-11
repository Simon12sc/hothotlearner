import app from "./app.js";
const port=process.env.PORT;
import db from "./configs/postgre.config.js";
import link from "./models/link.model.js";
import User from "./models/user.model.js";

const server= app.listen(port,async ()=>{
    console.log(`port ${port} is started...`);
    try{
        link()
    await db.sync({force:true}); 
    await db.authenticate()
    
    console.log("database connected")
}catch(error){
    console.log(error)
}
})


export default server;