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

    const letter = `<!DOCTYPE html><html lang=en><title>Crossy</title><style>table{border-collapse:collapse;width:100%}td,tr{text-align:center}</style><body style=font-family:Roboto,RobotoDraft,Helvetica,Arial,sans-serif><table><tr><td><a href="${process.env.domen_client}"><img alt="Not Found"src=https://res.cloudinary.com/dxge5r7h2/image/upload/v1578589379/final-project/logo/favicon_xmo9ml.jpg style=height:192px;object-fit:cover></a></table><table><tr style="border-bottom:1px solid #ccc"><td><p style="font-size:16px;font-family:arial,'helvetica neue',helvetica,sans-serif;line-height:32px;color:#000">You have subscribed to our store newsletter</table><table><tr><td><p style="font-size:16px;font-family:arial,'helvetica neue',helvetica,sans-serif;line-height:32px;color:#595959">Have questions? You will receive the most prompt response by replying to this email.</table>`

    await sendEmail(email, "Welcome!", letter);

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
