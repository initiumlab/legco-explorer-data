var XLSX = require('xlsx');
var glob = require("glob");
var path = require('path');
// var path = './source/vt_by_gc_ps_hour/official_xlsx/';
var paths = './source/**/official_xlsx/**/';
var fs = require('fs');
var xlsx_folder = /official_xlsx/;
var mkdirp = require('mkdirp');
glob(paths+"*.+(xlsx|xls)", function (er, files) {
  console.log(files);
  files.forEach(function (f) {
    console.log(f);
    //skip 1st line for gc voter turnout
    var workbook = XLSX.readFile(f);
    var first_sheet_name = workbook.SheetNames[0];
    var worksheet = workbook.Sheets[first_sheet_name];
    var csvData = XLSX.utils.sheet_to_csv(worksheet);

    mkdirp.sync(path.dirname(f).replace(xlsx_folder,'csv'));

    fs.writeFileSync(f.replace(/(xlsx|xls)$/,'csv').replace(xlsx_folder,'csv'),csvData);
  })
  // files is an array of filenames.
  // If the `nonull` option is set, and nothing
  // was found, then files is ["**/*.js"]
  // er is an error object or null.
})
