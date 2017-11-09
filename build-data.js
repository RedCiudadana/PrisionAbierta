const Tabletop = require('tabletop');
const jsonfile = require('jsonfile');
const fs = require('fs');

var spreadsheet = fs.readFileSync('public/spreadsheet-url', 'utf-8').trim();
var targetPath = 'public/static-files/';

Tabletop.init({
  key: spreadsheet,
  callback: function(sheets) {
    Object.keys(sheets).forEach(function(key) {
      var file = targetPath + key + '.json';
      
      jsonfile.spaces = 2;
      jsonfile.writeFileSync(file, sheets[key].elements);
    });
  }
});
