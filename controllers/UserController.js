const User = require('../models/user');
const { hashPassword, comparePassword, generateNewToken, response } = require('../helpers/function_helper');
const user = require('../models/user');

class UserController{

    static async login(req, res) {
        try {
            const { username, password } = req.body;

            const user = await User.findOne({ where: {
                username: username
            }});

            if(!user){
                return res.status(404).send(response([],"Username atau password anda salah!"));
            }

            if(!comparePassword(password,user.password)){
                return res.status(401).send(response([],"Username atau password anda salah!"));
            }

            const token = generateNewToken();

            return res.status(200).send(response({token}));
        } catch (error) {
            return res.status(500).send(response(error,error.message));
        }
    }

    static async register(req, res) {
        try {
            const { fullName, email, username, password, imageUrl, age, phoneNumber } = req.body;

            const data = await User.create({
                full_name: fullName,
                email,
                username,
                password: hashPassword(password),
                post_image_url: imageUrl,
                age,
                phone_number: phoneNumber
            });

            res.status(201).send(response({id: data.id}));
        } catch (error) {
            res.status(500).send(response(error,error.message));
        }
    }

    static async delete(req, res) {
        try {
            
        } catch (error) {
            
        }
    }

    static async edit(req, res) {
        try {
            
        } catch (error) {
            
        }
    }
}