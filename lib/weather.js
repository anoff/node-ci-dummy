const axios = require('axios')

const url = city => `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=7ff68704e1c7d87434d1468bf78a2ea1`

function getForecast (cityCode) {
  return axios.get(url(cityCode))
    .then(handleResponse)
}

function handleResponse (res) {
  return (res.data || {}).list || []
}
function mapPrettifyResults (element) {
  return {
    date: new Date(element.dt * 1000).toISOString(),
    dt: element.dt,
    code: (element.weather || []).map(c => c.description),
    temp: element.main.temp,
    humidty: element.main.humidity / 100,
    rain: (element.rain || {})['3h'] || 0,
    clouds: element.clouds.all / 100 || 0
  }
}
module.exports = {
  getForecast,
  handleResponse,
  mapPrettifyResults
}
