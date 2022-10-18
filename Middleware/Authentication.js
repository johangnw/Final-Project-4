const { verifyToken, response } = require("../helpers/function_helper");

const authenticate = (req, res, next) => {
    try{
        const baererHeader = req.headers.authorization;
        if(typeof token === undefined){
            return res.status(401).send(response());
        }
        const baerer = baererHeader.split(' ');
        const token = baerer[1];
        const { id } = verifyToken(token);
        req.userId = id
        next();
    }
    catch(error) {
        return res.status(500).send(response(error,error.message));
    }
}