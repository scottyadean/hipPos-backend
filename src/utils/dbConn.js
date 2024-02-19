const mongoose = require("mongoose");

const dbConn = async () => {
    let conn = null;
    try {
        const url = `${process.env.MONGO_DB}`.replace('%ENV%', `${process.env.DB_NAME}`) || '';
        mongoose.set('strictQuery', true);
        conn = await mongoose.connect(`${url}`);
    } catch (error) {
        console.log(error);
    }

    return conn;
}

module.exports = { dbConn }







