const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.generateNewToken = (user) => {
    const token = jwt.sign({id: user.id, username: user.username},process.env.SECRET_KEY,{ expiresIn: '1h' });
    return token;
}

exports.verifyToken = (token) => {
    const credential = jwt.verify(token,process.env.SECRET_KEY,{});
    return credential;
}


exports.hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password,10);
    return hashedPassword;
}
exports.comparePassword = async (password, hashPass) => {
    const match = await bcrypt.compare(password,hashPass);
    return match;
}

exports.response = (data=[], msg="") => ({msg, data});