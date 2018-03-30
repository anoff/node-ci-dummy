import test from 'ava'
import {mapPrettifyResults, handleResponse} from './weather'

const response = {
  'dt': 1522692000,
  'main': {
    'temp': 5.77,
    'temp_min': 5.77,
    'temp_max': 5.77,
    'pressure': 965.27,
    'sea_level': 1024.53,
    'grnd_level': 965.27,
    'humidity': 82,
    'temp_kf': 0
  },
  'weather': [
    {
      'id': 802,
      'main': 'Clouds',
      'description': 'scattered clouds',
      'icon': '03n'
    }
  ],
  'clouds': {
    'all': 44
  },
  'wind': {
    'speed': 1.86,
    'deg': 88.0018
  },
  'rain': {},
  'sys': {
    'pod': 'n'
  },
  'dt_txt': '2018-04-02 18:00:00'
}
test('can handle empty respoonse', t => {
  t.deepEqual(handleResponse({}), [])
})

test('can handle missing list property', t => {
  t.deepEqual(handleResponse({data: {}}), [])
})

test('works if temp is missing', t => {
  const s = JSON.parse(JSON.stringify(response))
  delete s.main.temp
  t.notThrows(() => mapPrettifyResults(s))
})

test('crashes if time is missing', t => {
  const s = JSON.parse(JSON.stringify(response))
  delete s.dt
  t.throws(() => mapPrettifyResults(s))
})
