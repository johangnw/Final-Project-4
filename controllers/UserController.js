const { User } = require('../models');
const { hashPassword, comparePassword, generateNewToken, response } = require('../helpers/function_helper');

class UserController{

    static async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ where: {
                email: email
            }});

            if(!user){
                return res.status(404).send(response([],"Your email or password is wrong!"));
            }

            if(!comparePassword(password,user.password)){
                return res.status(401).send(response([],"Your email or password is wrong!"));
            }
            const token = generateNewToken(user);

            return res.send({token});
        } catch (error) {
            if(error.name == 'SequelizeUniqueConstraintError'){
                res.status(400).send(response(error,error.message));
            }
            else if(error.name == 'SequelizeValidationError') {
                res.status(400).send(response(error,error['errors'][0].message));
            }else{
                res.status(500).send(response(error,error.message));
            }
        }
    }

    static async register(req, res) {
        try {
            const { full_name, email, username, password, profile_image_url, age, phone_number } = req.body;
            const newPassword = await hashPassword(password);
            const dataInsert = {
                full_name,
                email,
                username,
                password: newPassword,
                profile_image_url,
                age,
                phone_number
            };
            console.log(dataInsert);

            const data = await User.create(dataInsert);       
            res.status(201).send({
                user: {
                    email : data.email,
                    full_name : data.full_name,
                    username : data.username,
                    profile_image_url: data.profile_image_url,
                    age: data.age,
                    phone_number: data.phone_number
                }
            });
        } catch (error) {
            console.log(error);
            if(error.name == 'SequelizeUniqueConstraintError'){
                res.status(400).send(response(error,error.message));
            }
            else if(error.name == 'SequelizeValidationError') {
                res.status(400).send(response(error,error['errors'][0].message));
            }else{
                res.status(500).send(response(error,error.message));
            }
        }
    }

    static async delete(req, res) {
        try {
            const userId = req.params.userId;

            if(userId != req.userId){
                return res.status(400).send(response([],"You cannot delete other user"));
            }

            const user = await User.findByPk(userId);
            if(!user){
                return res.status(404).send(response([],"User not found"));
            }

            await User.destroy({
                where: {
                    id: userId
                }
            });

            return res.send({
                msg: "Your account has been successfully deleted"
            })


        } catch (error) {
            if(error.name == 'SequelizeUniqueConstraintError'){
                res.status(400).send(response(error,error.message));
            }
            else if(error.name == 'SequelizeValidationError') {
                res.status(400).send(response(error,error['errors'][0].message));
            }else{
                res.status(500).send(response(error,error.message));
            }
        }
    }

    static async edit(req, res) {
        try {
            const userId = req.params.userId;
            const { full_name, username, profile_image_url, age, phone_number } = req.body;

            const dataUpdate = {
                full_name,
                username,
                profile_image_url,
                age,
                phone_number
            };

            const user = await User.findByPk(userId);
            if(!user){
                return res.status(404).send(response([],"User not found"));
            }

            const data = await User.update(dataUpdate,{
                where: {
                    id: userId
                },
                returning: true,
                plain: true
            });

            const newUser = await User.findByPk(userId);
            
            res.send({
                user: {
                    email : newUser.email,
                    full_name : newUser.full_name,
                    username : newUser.username,
                    profile_image_url: newUser.profile_image_url,
                    age: newUser.age,
                    phone_number: newUser.phone_number
                }
            })
            

        } catch (error) {
            console.log(error);
            if(error.name == 'SequelizeUniqueConstraintError'){
                res.status(400).send(response(error,error.message));
            }
            else if(error.name == 'SequelizeValidationError') {
                res.status(400).send(response(error,error['errors'][0].message));
            }else{
                res.status(500).send(response(error,error.message));
            }
        }
    }
}


module.exports = UserController;