const Subscribers = require('../models/Subscriber');
const sendEmail = require('../common/sendEmail');
const { validationResult } = require("express-validator");


exports.addSubsriber = async (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email } = req.body;

  try {
    const sub = await Subscribers.findOne({ email });

    if (sub) {
      return res.status(409).json({ msg: `This email is already registered!` })
    }

    const newSub = new Subscribers({ email });
    await newSub.save();

    sendEmail(email, "Welcome!", "<div>We glade to see you</div>")

    res.status(200).json({ msg: `Congratulations! You have successfully subscribed!` })
  } catch (err) {
    res.status(500).json({
      message: `Error happened on server: "${err}" `
    })
  }
}

exports.removeSubscriber = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email } = req.body.email;

  try {
    const sub = await Subscribers.findOne({ email });

    if (!sub) {
      return res.status(404).json({ msg: `Subscriber with this email was not found!` })
    }

    await sub.remove()
    sendEmail(email, "Unsubscribed", "<div>Unfortunately you unsubscribed<div>")

    res.status(200).json({ msg: `You successfully unsubscribed!` })

  } catch (err) {
    res.status(500).json({
      message: `Error happened on server: "${err}" `
    })
  }

}
