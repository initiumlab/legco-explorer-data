var expect = require('chai').expect;
var fs = require('fs');
var glob = require('glob');
var utils = require('../utils');
var _ = require('lodash');
var geoMapping = require('../source/geocode/lc_mapping.json');

//TODO Make more sense to use rule-base test
var parse = require('csv-parse/lib/sync');
describe('Final Register by District age and sex profile',function () {
  it('should add up to intermediate sum and grand total',function (done) {
    glob('./source/fr_dc_age_sex/csv/*.csv', function (er, files) {
      files.forEach(function (file) {
        console.log(file);
        var csvData = fs.readFileSync(file);
        try{
        var records = parse(csvData, {columns:true ,trim: true });
        records.forEach(function (record, i) {

        describe(`${file} L:${i+1}`,function () {
          it('should be correct',function () {
            record= _.mapValues(record, utils.parseIntIfNumber);
            // TODO gen from mapping
            // geoMapping
            var expected={};
            var actual={};
            _.forEach(_.values(geoMapping),function (gc) {
              console.log(gc.districts);
              var sum = _(record).pick(gc.districts).values().sum();
              var key = gc.alias+'_total';
              var total = record[key];
              expected[key] = total;
              actual[key] = sum;
              console.log('key %s, sum: %s, total: %s',key, sum, total);
            })
            expect(actual).to.eql(expected);

          });
        });
        });
      }catch(e){
        console.error('error in file');
        console.error(file);
        console.error(e);
      }
      });
      done();
    });

  })
})
