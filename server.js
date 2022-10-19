const express = require('express');
const { json } = require('express');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const { UserRouter, PhotoRouter, SocialMediaRouter, CommentRouter } = require('./routers');

dotenv.config();

app.use(cors())
app.use(json())

app.use('/users',UserRouter);
app.use('/photos',PhotoRouter);
app.use('/socialmedias',SocialMediaRouter);
app.use('/comments',CommentRouter);

app.listen(PORT,() => {
    console.log("Server dah jalan di http://localhost:"+PORT);
})