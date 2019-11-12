const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const config = require('../config/index');
const customerid = require('order-id')(config.usersIdSecret);
const axios = require('axios');
const {google} = require('googleapis');

const Customer = require('../models/Customer');


// Controller for creating customer and saving to DB
exports.createCustomer = (req, res, next) => {

};

//controller for creating cutomer through google
exports.createCustomerGoogle = async (req, res) => {
    try {
        //вызываем авотризацию
        passport.authenticate('google-local', {session: false}, async function (err, customer, info) {
            //ошибка авторизации отключаем
            if (err) {
                return res.status(400).json(err)
            }
            //не пришел ответ от авторизации отключаем
            if (!customer) {
                return res.status(400).json({msg: "error"})
            }

            //проверяем почту в базе данных
            let findCustomer = await Customer.findOne({email: customer.email});


            //если такой пользователь есть выбрасываем
            // TO DO сделать дополнение к списку соц сетей и вернуть токен
            if (findCustomer) {
                return res.status(400).json({msg: "this user is exists"})
            }

            //создаем нового пользователя
            const newCustomer = new Customer({
                email: customer.email,
                firstName: customer.firstName,
                lastName: customer.lastName,
                avatarUrl: customer.avatarUrl,
                customerNo: customerid.generate(),
                socialmedia: ['google'],
                isAdmin: false,
                enabled: true
            });

            //сохраняем в базу данных
            const CreatedCustomer = await newCustomer.save();

            //отвечаем токеном прии успешной его выписке
            await jwt.sign({data: CreatedCustomer}, config.JWT_SECRET, {
                expiresIn: 36000
            }, function (err, token) {
                if(err) { return res.status(400).json({msg : err.message})}

                return  res.status(200).json({
                    success: true,
                    token: "Bearer " + token
                });
            });
        })(req, res);
    } catch (e) {
        res.status(200).json({err: e.message});
    }
};

// Controller for customer login
exports.loginCustomer = async (req, res, next) => {

};

// Controller for getting current customer
exports.getCustomer = (req, res) => {

};

// Controller for editing customer personal info
exports.editCustomerInfo = (req, res) => {

};

// Controller for editing customer password

exports.updatePassword = (req, res) => {

};
