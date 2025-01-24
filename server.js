const express = require('express');
const mongoose = require('mongoose');   
const userRoutes = require('./routes/userRoutes');
const thoughtRoutes = require('./routes/thoughtRoutes');
const reactionRoutes = require('./routes/reactionRoutes');
const seedAll = require('./seeds/seedAll');  // Import the seedAll function

const app = express();
const PORT = process.env.PORT || 3001;


// Seed the database
seedAll().then(() => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(userRoutes);
    app.use(thoughtRoutes);
    app.use(reactionRoutes);

    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`);
    });
}