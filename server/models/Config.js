const mongoose = require('mongoose');
const ConnectToConfigDB = require('../config/ConnectToConfigDB');
const Schema = mongoose.Schema;


const ConfigSchema = new Schema({
  customId: {
    type: String,
    require: true
  },
  development: {
    domen: {
      type: String,
      require: true
    },
    database: {
      uri: {
        type: String,
      }
    },
    nodemailer: {
      email: {
        type: String
      },
      password: {
        type: String
      },
      service: {
        type: String
      }
    },
    auth: {
      JWT_SECRET: {
        type: String
      },
      JWT_EMAIL_SECRET: {
        type: String
      },
      usersIdSecret: {
        type: String
      },
      orderIdSecret: {
        type: String
      },
      oauth:{
        google:{
          clientID:{
            type:String,
          },
          clientSecret:{
            type:String
          }
        },
        facebook:{
          clientID:{
            type:String,
          },
          clientSecret:{
            type:String
          }
        },
        github:{
          clientID:{
            type:String,
          },
          clientSecret:{
            type:String
          }
        }
      }
    },
    infinitScrollEnabled: {
      type: Boolean
    },
    paginationEnabled: {
      type: Boolean
    },
    showProductsPerPage: {
      mobile: {
        type: Number
      },
      tablet: {
        type: Number
      },
      desktop: {
        type: Number
      }
    },
    minOrderValue: {
      type: Number
    }
  },
  production: {
    domen: {
      type: String,
      require: true
    },
    database: {
      uri: {
        type: String,
      }
    },
    nodemailer: {
      email: {
        type: String
      },
      password: {
        type: String
      },
      service: {
        type: String
      }
    },
    auth: {
      JWT_SECRET: {
        type: String
      },
      JWT_EMAIL_SECRET: {
        type: String
      },
      usersIdSecret: {
        type: String
      },
      orderIdSecret: {
        type: String
      },
      oauth:{
        google:{
          clientID:{
            type:String,
          },
          clientSecret:{
            type:String
          }
        },
        facebook:{
          clientID:{
            type:String,
          },
          clientSecret:{
            type:String
          }
        },
        github:{
          clientID:{
            type:String,
          },
          clientSecret:{
            type:String
          }
        }
      }
    },
    infinitScrollEnabled: {
      type: Boolean
    },
    paginationEnabled: {
      type: Boolean
    },
    showProductsPerPage: {
      mobile: {
        type: Number
      },
      tablet: {
        type: Number
      },
      desktop: {
        type: Number
      }
    },
    minOrderValue: {
      type: Number
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});


module.exports = ConnectToConfigDB.model("configs", ConfigSchema);
