var db = require('../db');

module.exports.get = function (callback) {
      var queryStr = 'select * from dogs';
      
      db.query(queryStr, function(err, results) {
        callback(err, results);
      });
};