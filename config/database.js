const mongoose = require("mongoose");

require("dotenv").config();

//Function to establish connection between 
//App and database
const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("DB Connected Successfully"))
    .catch((err) => {
        console.log('Issue in DB Connection');
        console.error(err.message);
        process.exit(1);
    });
}
module.exports = dbConnect;