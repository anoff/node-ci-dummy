const {getForecast, mapPrettifyResults} = require('./lib/weather')

module.exports = (req, res) => {
  getForecast('Stuttgart,DE')
    .then(result => result.map(mapPrettifyResults))
    .then(weather => res.end(JSON.stringify(weather, null, 2)))
}
