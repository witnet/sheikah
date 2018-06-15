var path = require('path');
var merge = require('deepmerge');

console.log(JSON.stringify(merge.apply(null, process.argv.slice(2).map(function(p) {
  var rootPath = path.join(__dirname, "..", p)
  return require(rootPath);
}))));
