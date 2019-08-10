var models = require('../models');

module.exports.get = function (req, res) {
      models.get(function(err, results) {
        if (err) { console.log(err) }
        res.json(results);
      });
    }
  ;
