// import mongoose from "mongoose";
// import { DB_NAME } from "./constants.js";
import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})


connectDB()
















// ;( async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB-URI}/${DB_NAME}`)
//         app.on("error" , (error) => {
//             console.log("Error On Express",error);
//             throw error
//         })

//         app.listen(process.env.PORT , () => {
//             console.log(`App listening on port : ${process.env.PORT}`);
//         })
//     } catch (error) {
//         console.error("ERROR : ",error)
//         throw error
//     }
// })()