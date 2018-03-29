const axios = require('axios')

const url = city => `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=7ff68704e1c7d87434d1468bf78a2ea1`

function getForecast (cityCode) {
  return axios.get(url(cityCode))
    .then(function (res) {
      console.log(url(cityCode))
      const data = ((res.data || {}).list || [])
        .map(e => {
          return {
            date: new Date(e.dt * 1000).toISOString(),
            dt: e.dt,
            code: (e.weather || []).map(c => c.description),
            temp: e.main.temp,
            humidty: e.main.humidity / 100,
            rain: e.rain['3h'] || 0,
            clouds: e.clouds.all / 100 || 0,
            location: res.data.city.coord
          }
        })
      return data
    })
    .catch(function (error) {
      console.log(error)
    })
}

module.exports = {
  getForecast
}
