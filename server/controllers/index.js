const models = require('../models');
const api = require('../../helper/weather_api.js');

module.exports.get = function (req, res) {
      //api.getWind((value) => {
        // if (err) {
        //   console.log(err);
        // }else {

        //testing without API call
          let value = 5.8;
          console.log('Wind Speed: ',value);

          models.get(function(err, results) {
            if (err) {
              res.sendStatus(404);
            }else {
              if (value>5) {
                res.json(results[0]);
              };
            };
          });
       // };
      //});
};

