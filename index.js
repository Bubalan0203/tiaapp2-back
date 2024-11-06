const { default: mongoose } = require('mongoose');
const { app } = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3000; // Default port is 3000 if not specified in .env file

app.listen(PORT, async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected successfully...");
    } catch (error) {
        console.log(error);
    }
    console.log(`Server started on port ${PORT}`);
});


