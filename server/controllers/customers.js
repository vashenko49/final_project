const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const uniqueRandom = require("unique-random");
const rand = uniqueRandom(100000, 999999);

const sendEmail = require("../common/sendEmail");
const CustomerModel = require("../models/Customer");
const {validationResult} = require("express-validator");
const _ = require("lodash");

// Controller for creating customer and saving to DB
exports.createCustomer = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const values = Object.values(req.files);
    const userAvatar =
      values.length > 0
        ? await cloudinary.uploader.upload(values[0].path, {folder: "final-project/userAvatar"})
        : null;

    const {firstName, lastName, login, email, password, gender} = req.body;

    let Customer = await CustomerModel.findOne({
      $or: [{email: email}, {login: login}]
    });

    if (Customer) {
      if (Customer.email === email) {
        return res.status(400).json({message: `Email ${Customer.email} already exists"`});
      }

      if (Customer.login === login) {
        return res.status(400).json({message: `Email ${Customer.login} already exists"`});
      }
    }

    let newCustomer = new CustomerModel({
      email,
      firstName,
      lastName,
      login,
      gender,
      avatarUrl: userAvatar ? userAvatar.public_id : "",
      customerNo: rand().toString(),
      socialmedia: [3],
      isAdmin: false,
      enabled: false
    });

    const salt = await bcrypt.genSalt(10);
    newCustomer.password = await bcrypt.hash(password, salt);

    Customer = await newCustomer.save();

    let tokenEmailConfirmUser = await jwt.sign(
      {_id: newCustomer._id},
      process.env.JWT_EMAIL_SECRET,
      {
        expiresIn: 1800
      }
    );

    let url = `${process.env.domen}/api/customers/confirm/${encodeURI(tokenEmailConfirmUser)}`;

    await sendEmail(email, `Hi ${firstName}!`, `<a href=${url}>Confirm</a>`);

    const payload = {
      _id: Customer._id,
      firstName: Customer.firstName,
      lastName: Customer.lastName,
      isAdmin: Customer.isAdmin
    }; // Create JWT Payload

    // Sign Token
    jwt.sign({data: payload}, process.env.JWT_SECRET, {expiresIn: 36000}, (err, token) => {
      return res.json({
        success: true,
        token: "Bearer " + token
      });
    });
  } catch (e) {
    res.status(400).json({
      message: e.message
    });
  }
};

exports.enablesAccountCustom = async (req, res)=>{
  try {
    const {_id, firstName, enabled, email} = req.user;
    let tokenEmailConfirmUser = await jwt.sign(
      {_id: _id},
      process.env.JWT_EMAIL_SECRET,
      {
        expiresIn: 1800
      }
    );

    if(enabled){
     return  res.status(400).json({
       message: 'Your account is enabled'
     });
    }

    let url = `${process.env.domen}/api/customers/confirm/${encodeURI(tokenEmailConfirmUser)}`;

    await sendEmail(email, `Hi ${firstName}!`, `<a href=${url}>Confirm</a>`);
    res.status(200).json({message:"Checked your email"});
  }catch (e) {
    res.status(400).json({
      message: e.message
    });
  }
};

exports.isPassword = async (req, res) => {
  try {
    const {_id} = req.user;
    const ispasword = await CustomerModel.findById(_id);
    res.status(200).json({
      status: _.isString(ispasword.password) && ispasword.password.length > 0
    })
  } catch (err) {
    res.status(500).json({
      message: "Server Error!"
    });
  }
};
// Controller for confirm customer
exports.confirmCustomer = async (req, res) => {
  try {
    let {emailtoken} = req.params;
    emailtoken = decodeURI(emailtoken);
    let idClient = jwt.verify(emailtoken, process.env.JWT_EMAIL_SECRET);
    let customer = await CustomerModel.findById(idClient._id);
    customer.enabled = true;
    customer.save();

    res.status(301).redirect(process.env.domen_client);
  } catch (e) {
    res.status(400).redirect(process.env.domen_client);
  }
};

//check login or email in base
exports.checkLoginOrEmail = async (req, res) => {
  try {
    const {type, data} = req.body;

    if (!type || !data) {
      return res.status(200).json({status: false});
    }
    let config = type === "login" ? {login: data} : {email: data};

    const customer = await CustomerModel.findOne(config);

    if (customer) {
      return res.status(200).json({status: false});
    }

    return res.status(200).json({status: true});
  } catch (e) {
    return res.status(500).json({
      message: `Server error ${e.message}`
    });
  }
};

//controller for creating customer through social network
exports.createCustomerSocialNetwork = async (req, res) => {
  try {
    let customer = req.user;

    //проверяем почту в базе данных
    let Customer = await CustomerModel.findOne({email: customer.email});

    if (Customer) {
      console.log("Пользователь уже зареган ---->");
      let isinThisSocialNetwork = Customer.socialmedia.some(typeSicoalNetwork => {
        return typeSicoalNetwork === customer.typeSocial;
      });

      if (!isinThisSocialNetwork) {
        console.log("Регаем новую социальную сеть ---->");
        //добавляем новый тип регестрации
        Customer.socialmedia.push(customer.typeSocial);
        await Customer.save();
      }
    } else {
      console.log("новый пользователь ---->");
      //регестрируем пользователя
      const userImg = await cloudinary.uploader.upload(customer.avatarUrl, {
        folder: "final-project/userAvatar"
      });

      Customer = new CustomerModel({
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
        avatarUrl: userImg.public_id,
        customerNo: (rand()).toString(),
        socialmedia: [customer.typeSocial],
        isAdmin: false,
        enabled: true
      });
      await Customer.save();
    }

    await jwt.sign(
      {data: Customer},
      process.env.JWT_SECRET,
      {
        expiresIn: 11750400
      },
      function (err, token) {
        return res.status(200).json({
          success: true,
          token: "Bearer " + token
        });
      }
    );
  } catch (e) {
    console.log(e);
    return res.status(400).json({message: e.message});
  }
};

// Controller for customer login
exports.loginCustomer = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;

    // Find customer by email
    CustomerModel.findOne({
      $or: [{email: email}, {login: email}]
    }).then(customer => {
      // Check for customer
      if (!customer) {
        errors.loginOrEmail = "Customers not found";
        return res.status(404).json(errors);
      }
      // Check Password

      if (!customer.password) {
        return res.status(400).json({
          message: "You are registered through social networks"
        });
      }

      bcrypt.compare(password, customer.password).then(isMatch => {
        if (isMatch) {
          // Customers Matched
          const payload = {
            _id: customer._id,
            firstName: customer.firstName,
            lastName: customer.lastName,
            isAdmin: customer.isAdmin
          }; // Create JWT Payload

          // Sign Token
          jwt.sign(
            {data: payload},
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
    });
  } catch (e) {
    return res.status(400).json({message: e.message});
  }
};

// Controller for getting current customer
exports.getCustomer = (req, res) => {
  res.json(req.user);
};

// get customers for admin - panel
exports.getCustomers = async (req, res) => {
  try {
    const customers = await CustomerModel.find({});
    res.status(200).json(customers);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Server Error!"
    });
  }
};

// Controller for editing customer personal info
exports.editCustomerInfo = async (req, res) => {
  try {
    const {_id} = req.user;

    const customer = await CustomerModel.findById(_id);
    if (!customer) {
      errors.id = "Customers not found";
      return res.status(404).json(errors);
    }

    const currentEmail = customer.email;
    const currentLogin = customer.login;

    const deepClone = _.cloneDeep(req.body);
    const {email, login} = deepClone;
    const {avatarUrl} = req.files;


    if (_.isString(email) && currentEmail !== email) {
      const isUseEmail = await CustomerModel.findOne({email: email});
      if (isUseEmail) {
        return res.status(400).json({
          message: `Email ${email} is already exists`
        });
      }
      deepClone.email = email;
    }
    if (_.isString(login) && currentLogin !== login) {
      const isUseLogin = await CustomerModel.findOne({login: login});
      if (isUseLogin) {
        return res.status(400).json({
          message: `Login ${login} is already exists`
        });
      }
      deepClone.login = login;
    }

    //отвязываем соц сети от аккаунта так ка почта изменена
    if (_.isString(email)) {
      deepClone.socialmedia = [3];
    }

    if (_.isObject(avatarUrl)) {
      if (_.isString(customer.avatarUrl)) {
        await cloudinary.uploader.destroy(customer.avatarUrl);
      }

      const photo = await cloudinary.uploader.upload(avatarUrl.path, {
        folder: "final-project/userAvatar"
      });
      deepClone.avatarUrl = photo.public_id;
    }

    let newData = await CustomerModel.findByIdAndUpdate(_id, {$set: deepClone}, {new: true});
    newData = await newData.save();

    res.status(200).json(newData);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Server Error!",
      err:e
    });
  }
};

//edit customer from admin
exports.editStatusCustomer = async (req, res)=>{
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {customerId, enabled, isAdmin} = req.body;

    if(!_.isBoolean(enabled) && !_.isBoolean(isAdmin)){
      return res.status(500).json({
        message: "Get me data"
      });
    }

    let newData = await CustomerModel.findByIdAndUpdate(customerId, {$set: {[`${_.isBoolean(enabled)?"enabled":'isAdmin'}`]:_.isBoolean(enabled)?enabled:isAdmin}}, {new: true});
    res.status(200).json(newData);
  }catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Server Error!",
      err:e
    });
  }
};

// Controller for editing customer password
exports.updatePassword = (req, res) => {
  CustomerModel.findById(req.user._id, async (err, customer) => {
    try {
      if (err) {
        throw err;
      }
      let oldPassword = req.body.password;
      let newPassword = req.body.newPassword;
      let passwordValid;

      if (_.isString(customer.password) && customer.password > 0) {
        passwordValid = await bcrypt.compare(oldPassword, customer.password);
        if (!passwordValid) {
          return res.status(400).json({
            message: "Password does not match"
          });
        }
      }
      const salt = await bcrypt.genSalt(10);
      newPassword = await bcrypt.hash(newPassword, salt);

      CustomerModel.findOneAndUpdate(
        {_id: req.user._id},
        {
          $set: {
            password: newPassword
          }
        },
        {new: true}
      )
        .then(customer => {
          res.json({
            message: "Password successfully changed",
          });
        })
        .catch(err =>
          res.status(400).json({
            message: `Error happened on server: "${err}" `
          })
        );
    } catch (e) {
      console.log(e);
      res.status(400).json({
        message: `Error happened on server: "${e}" `
      });
    }
  });
};

// controller for sending tokens to the user’s mail to change the password
exports.forgotPassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    const {loginOrEmail} = req.body;

    let customer = await CustomerModel.findOne({
      $or: [{email: loginOrEmail}, {login: loginOrEmail}]
    });

    if (!customer) {
      return res.status(400).json({
        message: `User by ${loginOrEmail} not found`
      });
    }

    let tokenChangePassword = await jwt.sign(
      {_id: customer._id},
      process.env.JWT_FORGOT_PASSWORD,
      {
        expiresIn: 1800
      }
    );

    let url = `${process.env.domen_client}/api/passwordrecovery/${encodeURI(tokenChangePassword)}`;

    await sendEmail(
      customer.email,
      `Hi ${customer.firstName}! Change password`,
      `<a href=${url}>Confirm</a>`
    );

    return res.status(200).json({
      message: "Email sent, check email"
    });
  } catch (e) {
    return res.status(400).json({
      message: `Oops, something went wrong" `
    });
  }
};

// checking the token for password changes and redirecting to the password change page
exports.confirmForgotCustomer = async (req, res) => {
  try {
    let {token} = req.params;
    let decodeToken = decodeURI(token);
    let idClient = await jwt.verify(decodeToken, process.env.JWT_FORGOT_PASSWORD);

    if (!idClient) {
      res.status(301).redirect(process.env.domen_client);
    }

    res.status(301).redirect(`${process.env.domen_client}/api/passwordrecovery/${token}`);
  } catch (e) {
    res.status(301).redirect(process.env.domen_client);
  }
};

// controller for changing the password through the token forgot password
exports.updatePasswordAfterConfirm = async (req, res) => {
  let token = req.headers.authorization.split(" ");
  token = token[1];

  let idClient = await jwt.verify(token, process.env.JWT_FORGOT_PASSWORD);

  CustomerModel.findById(idClient._id, async (err, customer) => {
    try {
      if (err) {
        throw err;
      }

      let newPassword = req.body.password;

      const salt = await bcrypt.genSalt(10);
      newPassword = await bcrypt.hash(newPassword, salt);

      CustomerModel.findOneAndUpdate(
        {_id: req.user.id},
        {
          $set: {
            password: newPassword
          }
        },
        {new: true}
      )
        .then(customer => {
          res.json({
            message: "Password successfully changed"
          });
        })
        .catch(err =>
          res.status(400).json({
            message: `Oops, something went wrong" `
          })
        );
    } catch (e) {
      res.status(400).json({
        message: `Oops, something went wrong `
      });
    }
  });
};
