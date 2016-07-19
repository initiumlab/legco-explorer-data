var fs = require('fs');


var parseIntFromData= function (numberString) {
    return parseInt(numberString.replace(/,/g,''));
}

var parseIntIfNumber= function (string) {
  if(string.match(/^(\d+,)*[\d]+$/)){
    return parseIntFromData(string);
  }
  return string;
}
var writeJSONFileSync= function (path, data) {
  return fs.writeFileSync(path, JSON.stringify(data, null, 4));
}
module.exports = {
  parseIntFromData:parseIntFromData,
  parseIntIfNumber:parseIntIfNumber,
  writeJSONFileSync:writeJSONFileSync
}
