const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const customerid = require('order-id')(process.env.usersIdSecret);


const sendEmail = require('../common/sendEmail');
const CustomerModel = require('../models/Customer');


// Controller for creating customer and saving to DB
exports.createCustomer = async (req, res) => {
  try {



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
        return res
          .status(400)
          .json({message: `Email ${Customer.login} already exists"`});
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


    let tokenEmailConfirmUser = await jwt.sign(
      {_id: newCustomer._id},
      process.env.JWT_EMAIL_SECRET, {
        expiresIn: 1800
      });


    let url = `${process.env.domen}/customers/confirm/${encodeURI(tokenEmailConfirmUser)}`;

    await sendEmail(email, `Hi ${firstName}!`, `<a href=${url}>Confirm</a>`);

    res.status(200).json(Customer);


  } catch (e) {
    res.status(400).json({
      message: e.message
    })
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

//controller for creating customer through social network
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
exports.loginCustomer = async (req, res) => {
  try {
    const {loginOrEmail, password} = req.body;


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

        if (!customer.password) {
          return res.status(400).json({
            message: "You are registered through social networks"
          });
        }

        bcrypt.compare(password, customer.password).then(isMatch => {
          if (isMatch) {
            // Customer Matched
            const payload = {
              _id: customer.id,
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
  CustomerModel.findById(req.user._id)
    .then(customer => {
      if (!customer) {
        errors.id = "Customer not found";
        return res.status(404).json(errors);
      }


      const currentEmail = customer.email;
      const currentLogin = customer.login;
      const newEmail = req.body.email;
      const newLogin = req.body.login;

      if (currentEmail !== newEmail) {
        CustomerModel.findOne({email: newEmail}).then(customer => {
          if (customer) {
            errors.email = `Email ${newEmail} is already exists`;
            res.status(400).json(errors);
          }
        });

      }
      if (currentLogin !== newLogin) {
        CustomerModel.findOne({login: newLogin}).then(customer => {
          if (customer) {
            errors.login = `Login ${newLogin} is already exists`;
            res.status(400).json(errors);
          }
        });
      }

      //отвязываем соц сети от аккаунта так ка почта изменена
      if (newEmail) {
        req.body.socialmedia = [4];
      }

      CustomerModel.findOneAndUpdate(
        {_id: req.user.id},
        {$set: req.body},
        {new: true}
      )
        .then(customer => res.json(customer))
        .catch(err =>
          res.status(400).json({
            message: `Error happened on server: "${err}" `
          })
        );

    })
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server:"${err}" `
      })
    );
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
      if (customer.password) {
        passwordValid = await bcrypt.compare(oldPassword, customer.password);
        if (!passwordValid) {
          return res.status(400).json({
            message: "Password does not match"
          })
        }
      }

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
            message: "Password successfully changed",
            customer: customer
          });
        })
        .catch(err =>
          res.status(400).json({
            message: `Error happened on server: "${err}" `
          })
        );

    } catch (e) {
      res.status(400).json({
        message: `Error happened on server: "${e}" `
      })
    }
  });
};

// controller for sending tokens to the user’s mail to change the password
exports.forgotPassword = async (req, res) => {
  try {

    const {loginOrEmail} = req.body;

    let customer = await CustomerModel.findOne({
      $or: [{email: loginOrEmail}, {login: loginOrEmail}]
    });

    if (!customer) {
      return res.status(400).json({
        message: `user no found by ${loginOrEmail}`
      })
    }

    let tokenChangePassword = await jwt.sign(
      {_id: customer._id},
      process.env.JWT_FORGOT_PASSWORD, {
        expiresIn: 1800
      });

    let url = `${process.env.domen}/customers/forgotpassword/${encodeURI(tokenChangePassword)}`;

    await sendEmail(customer.email, `Hi ${customer.firstName}! Change password`, `<a href=${url}>Confirm</a>`);

    return res.status(200).json({
      message: "Email sent"
    });
  } catch (e) {
    return res.status(400).json({
      message: `Error happened on server: "${e}" `
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

    res.status(301).redirect(`${process.env.domen_client}/passwordrecovery/${token}`);

  } catch (e) {
    res.status(301).redirect(process.env.domen_client);
  }
};

// controller for changing the password through the token forgot password
exports.updatePasswordAfterConfirm = async (req, res) => {
  let token = req.headers.authorization.split(' ');
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
            message: "Password successfully changed",
            customer: customer
          });
        })
        .catch(err =>
          res.status(400).json({
            message: `Error happened on server: "${err}" `
          })
        );

    } catch (e) {
      res.status(400).json({
        message: `Error happened on server: "${e}" `
      })
    }
  });
};
