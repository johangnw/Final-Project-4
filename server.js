const express = require('express');
const { json } = require('express');
const app = express();
const cors = require('cors');
const { UserRouter, PhotoRouter, SocialMediaRouter, CommentRouter } = require('./routers');
const PORT = process.env.PORT || 5000;
// if(process.env.NODE_ENV == 'development'){
    const dotenv = require('dotenv');
    dotenv.config();
// }

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users',UserRouter);
app.use('/photos',PhotoRouter);
app.use('/socialmedias',SocialMediaRouter);
app.use('/comments',CommentRouter);

module.exports = app;

// app.listen(PORT,() => {
//     console.log("Server dah jalan di http://localhost:"+PORT);
// });