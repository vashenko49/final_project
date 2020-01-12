const Orders = require("../models/Order");
const SendMail = require('./sendEmail');
const _ = require('lodash');
const cloudinary = require('cloudinary-core');

exports.generatorHTMLTableToOrder = async (idOrder, email) => {
  let order = await Orders.findById(idOrder)
    .populate('idCustomer')
    .populate({path: 'delivery.idShippingMethod', select: '-address'})
    .populate('delivery.storeAddress')
    .populate('products.productId');
  let rowsProducts = '';
  const {products, totalSum, orderNo, name, delivery: {idShippingMethod: {costValue}}} = order;

  products.forEach(element => {
    const {quantity, currentPrice, modelNo, productId: {itemNo, nameProduct, filterImg, productUrlImg}} = element;
    const img = _.isArray(productUrlImg) && productUrlImg.length > 0 ? productUrlImg[0] : _.isArray(filterImg) && filterImg.length > 0 ? filterImg[0] : 'final-project/products/product_without_photo_sample/product_without_phot_ldw3px';

    const urlImg = new cloudinary.Cloudinary({
      cloud_name: process.env.cloudinary_cloud_name
    }).url(img);

    let rowProduct = `<tr> <td> <img style="max-width: 129px" src="${urlImg}" alt="not found"/> <p style=" font-size: 16px; font-family: arial,'helvetica neue',helvetica,sans-serif; line-height: 32px; color: #595959;">${nameProduct}</p> </td> <td> ${itemNo} </td> <td> ${modelNo} </td> <td> ${quantity} </td> <td> ${currentPrice}$ </td></tr>`
    rowsProducts += rowProduct;
  });

  const template = `<!doctype html><html lang="en"><head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"> <title>Crossy</title> <style> table { border-collapse: collapse; width: 100%; } tr, td { text-align: center; } </style></head><body style="font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;"><table> <tr> <td> <a href="${process.env.domen_client}"> <img style="height: 192px; object-fit: cover;" alt="Not Found" src="https://res.cloudinary.com/dxge5r7h2/image/upload/v1578589379/final-project/logo/favicon_xmo9ml.jpg"/></a> </td> </tr> <tr> <td style="Margin: 0; padding: 40px 20px 30px;"> <h3 style=" Margin: 0; line-height: 24px; font-family: arial,'helvetica neue',helvetica,sans-serif; font-size: 20px; font-style: normal; font-weight: normal; color: #595959;">Congratulations, ${name}!</h3></td> </tr> <tr> <td style="Margin: 0; padding: 0 20px 20px;"> <p style="Margin: 0; font-size: 16px; font-family: arial,'helvetica neue',helvetica,sans-serif; line-height: 32px; text-align: justify; color: #595959;">Your order № ${orderNo}. Thank you for choosing Crossy. You can check the status of the order <a style="font-family: arial,'helvetica neue',helvetica,sans-serif; font-size: 16px; text-decoration: underline; color: #568da7;" href="${process.env.domen_client}/personaldata">in your personal account</a></p> </td> </tr></table><table> <tr style="border-bottom: 1px solid #cccccc"> <td> <p style=" font-size: 16px; font-family: arial,'helvetica neue',helvetica,sans-serif; line-height: 32px; color: #000000;"> <strong>Position</strong> </p> </td> <td> <p style=" font-size: 16px; font-family: arial,'helvetica neue',helvetica,sans-serif; line-height: 32px; color: #000000;"><strong>Product code</strong></p> </td> <td> <p style=" font-size: 16px; font-family: arial,'helvetica neue',helvetica,sans-serif; line-height: 32px; color: #000000;"><strong>Model code</strong></p> </td> <td> <p style=" font-size: 16px; font-family: arial,'helvetica neue',helvetica,sans-serif; line-height: 32px; color: #000000;"><strong>Quantity</strong></p> </td> <td> <p style=" font-size: 16px; font-family: arial,'helvetica neue',helvetica,sans-serif; line-height: 32px; color: #000000;"><strong>Cost</strong></p> </td> </tr>${rowsProducts}<tr style="border-bottom: 1px solid #cccccc"> <td> <p style="font-size: 16px; font-family: arial,'helvetica neue',helvetica,sans-serif; line-height: 32px; color: #595959;"> Cost of delivery </p> </td> <td/> <td/> <td/> <td> ${costValue}</td> </tr> <tr style="border-bottom: 1px solid #cccccc"> <td> <p style="font-size: 16px; font-family: arial,'helvetica neue',helvetica,sans-serif; line-height: 32px; color: #595959;"> Total </p> </td> <td/> <td/> <td/> <td> ${totalSum} </td> </tr></table><table> <tr> <td> <p style="font-size: 16px; font-family: arial,'helvetica neue',helvetica,sans-serif; line-height: 32px; color: #595959;"> Have questions? You will receive the most prompt response by replying to this email. </p> </td> </tr></table></body></html>`;

  await SendMail(email, `Your order ${orderNo}`, template);

};
