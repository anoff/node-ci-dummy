const {getForecast} = require('./lib/weather')

module.exports = (req, res) => {
  getForecast('Stuttgart,DE')
    .then(weather => res.end(JSON.stringify(weather, null, 2)))
}
