const db = require('../db');

module.exports.get = function (callback) {
      var query = 'select * from dogs;';

      db.query(query, function(err, results) {
        callback(err, results);
      });
};
