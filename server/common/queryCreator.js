const FormValidator = require("../validation/FormValidator");
const isJSON = require("./isJSON");

const excludedParams = ["letterSubject", "letterHtml"];

// Перебирает этот объект.
// Если в каком-то поле находится json, то он его парсит превращает в объект.
// Если в поле ничего нет, пустое значение, то не принимает его в учет.
// Возвращает обратно объект, который можно записать в базу.

module.exports = function queryCreator(data) {
  return Object.keys(data).reduce((queryObject, param) => {
    if (isJSON(data[param])) {
      queryObject[param] = JSON.parse(data[param]);
    } else if (
      !FormValidator.isEmpty(data[param]) &&
      !excludedParams.includes(param)
    ) {
      queryObject[param] = data[param];
    }

    return queryObject;
  }, {});
};
