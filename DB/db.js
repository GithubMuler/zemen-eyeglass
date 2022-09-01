const mongoose = require("mongoose");
const connection = async () => {
    try {
        const connectionParams = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        };
        await mongoose.connect("mongodb+srv://mulersoft:Mulugeta12@cluster0.hnqpgp6.mongodb.net/GLASS", {useNewUrlParser: true});
        console.log("connected to database.");
    } catch (error) {
        console.log(error, "could not connect database.");
    }
};
module.exports=connection;
