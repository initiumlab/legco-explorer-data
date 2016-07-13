var fs = require('fs');
module.exports = {
  parseIntFromData: function (numberString) {
      return parseInt(numberString.replace(',',''));
  },
  writeJSONFileSync: function (path, data) {
    return fs.writeFileSync(path, JSON.stringify(data, null, 4));
  }
}
