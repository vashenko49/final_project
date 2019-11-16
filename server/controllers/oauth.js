const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const customerid = require('order-id')(process.env.usersIdSecret);
const nodemailer = require("nodemailer");

const CustomerModel = require('../models/Customer');

// Load validation helper to validate all received fields
const validateRegistrationForm = require("../validation/validationHelper");


// Controller for creating customer and saving to DB
exports.createCustomer = async (req, res) => {
  try {

    const {errors, isValid} = validateRegistrationForm(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }


    const {firstName, lastName, login, email, password, telephone, gender} = req.body;

    let Customer = await CustomerModel.findOne({
      $or: [{email: email}, {login: login}]
    });

    if (Customer) {
      if (Customer.email === email) {
        return res
          .status(400)
          .json({message: `Email ${Customer.email} already exists"`});
      }

      if (Customer.login === login) {
        const connectDB = require('./config/db');
      }
    }

    let newCustomer = new CustomerModel({
      email,
      firstName,
      lastName,
      login,
      gender,
      telephone,
      customerNo: customerid.generate(),
      socialmedia: [4],
      isAdmin: false,
      enabled: false
    });

    const salt = await bcrypt.genSalt(10);
    newCustomer.password = await bcrypt.hash(password, salt);

    Customer = await newCustomer.save();


    let tokenEmail = await jwt.sign(
      {id: newCustomer._id},
      process.env.JWT_EMAIL_SECRET, {
        expiresIn: 1800
      });


    let url = `${process.env.domen}/oauth/confirm/${encodeURI(tokenEmail)}`;

    const transporter = nodemailer.createTransport({
      service: process.env.nodemailer_service,
      auth: {
        user: process.env.nodemailer_email,
        pass: process.env.nodemailer_password
      }
    });


    const mailOptions = {
      from: process.env.nodemailer_email,
      to: email,
      subject: `Hi ${firstName}!`,
      html: `<a href=${url}>Confirm</a>`
    };


    await transporter.sendMail(mailOptions);

    res.status(200).json(Customer);


  } catch (e) {
    res.status(400).json({
      message: e.message
    })
  }
};

exports.confirmCustomer = async (req, res) => {
  try {
    let {emailtoken} = req.params;
    emailtoken = decodeURI(emailtoken);
    let idClient = jwt.verify(emailtoken, process.env.JWT_EMAIL_SECRET);
    let customer = await CustomerModel.findById(idClient.id);
    customer.enabled = true;
    customer.save();

  } catch (e) {
    res.status(400).json({
      message: e.message
    })
  }


  res.status(301).redirect("http://localhost:3000/")
};

//controller for creating cutomer through google
exports.createCustomerSocialNetwork = async (req, res) => {

  try {

    let customer = req.user;

    //проверяем почту в базе данных
    let Customer = await CustomerModel.findOne({email: customer.email});

    if (Customer) {

      console.log('Пользователь уже зареган ---->');
      let isinThisSocialNetwork = Customer.socialmedia.some(typeSicoalNetwork => {
        return typeSicoalNetwork === customer.typeSocial;
      });


      if (!isinThisSocialNetwork) {
        console.log('Регаем новую социальную сеть ---->');
        //добавляем новый тип регестрации
        Customer.socialmedia.push(customer.typeSocial);
        await Customer.save();
      }
    } else {
      console.log('новый пользователь ---->');
      //регестрируем пользователя
      const Customer = new CustomerModel({
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
        avatarUrl: customer.avatarUrl,
        customerNo: customerid.generate(),
        socialmedia: [customer.typeSocial],
        isAdmin: false,
        enabled: true
      });
      await Customer.save();
    }

    await jwt.sign({data: Customer}, process.env.JWT_SECRET, {
      expiresIn: 11750400
    }, function (err, token) {
      return res.status(200).json({
        success: true,
        token: "Bearer " + token
      });
    });

  } catch (e) {
    return res.status(400).json({message: e.message});
  }


};


// Controller for customer login
exports.loginCustomer = async (req, res, next) => {
  try {
    const {errors, isValid} = validateRegistrationForm(req.body);

    const {loginOrEmail, password} = req.body;

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Find customer by email
    CustomerModel.findOne({
      $or: [{email: loginOrEmail}, {login: loginOrEmail}]
    })
      .then(customer => {
        // Check for customer
        if (!customer) {
          errors.loginOrEmail = "Customer not found";
          return res.status(404).json(errors);
        }

        // Check Password
        bcrypt.compare(password, customer.password).then(isMatch => {
          if (isMatch) {
            // Customer Matched
            const payload = {
              id: customer.id,
              firstName: customer.firstName,
              lastName: customer.lastName,
              isAdmin: customer.isAdmin
            }; // Create JWT Payload

            // Sign Token
            jwt.sign(
              payload,
              process.env.JWT_SECRET,
              {expiresIn: 36000},
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              }
            );
          } else {
            errors.password = "Password incorrect";
            return res.status(400).json(errors);
          }
        });
      })


  } catch (e) {
    return res.status(400).json({message: e.message});
  }


};

// Controller for getting current customer
exports.getCustomer = (req, res) => {
  res.json(req.user);
};

// Controller for editing customer personal info
exports.editCustomerInfo = (req, res) => {

};

// Controller for editing customer password

exports.updatePassword = (req, res) => {

};
