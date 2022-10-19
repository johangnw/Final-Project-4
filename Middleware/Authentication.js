const { verifyToken, response } = require("../helpers/function_helper");
const { User } = require('../models');

exports.authenticate = async (req, res, next) => {
    try{
        const baererHeader = req.headers.authorization;
        if(typeof baererHeader === undefined){
            return res.status(401).send({msg: "Unauthorize"});
        }
        const baerer = baererHeader.split(' ');
        const token = baerer[1];
        const { id } = verifyToken(token);

        const user = await User.findByPk(id);

        if(!user){
            return res.status(401).send({msg: "Unauthorize"});
        }

        req.userId = id;
        next();
    }
    catch(error) {
        console.log(error.message);
        return res.status(401).send({ msg: 'Unauthorize' });
    }
}