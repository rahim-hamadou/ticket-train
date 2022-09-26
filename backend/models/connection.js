const mongoose = require("mongoose");

const connectionString = "mongodb+srv://admin123:admin123@cluster0.iq20nwc.mongodb.net/tickethack";

mongoose
	.connect(connectionString, { connectTimeoutMS: 2000 })
	.then(() => console.log("Database connected"))

	.catch((error) => console.error(error + "erreur de connection"));
