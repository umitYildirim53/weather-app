const request = require("request");

const geocode = (coorX, coorY, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=0b09d0b8a6c3d8c7bcd29fbb0b2e029c&query=" + coorX + "," + coorY;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect to weather api", undefined);
    } else {
      const { temperature, feelslike } = response.body.current;
      callback(
        undefined,
        "it is currently " +
          temperature +
          " degress out. It feels like " +
          feelslike +
          " degress out."
      );
    }
  });
};

module.exports = geocode;