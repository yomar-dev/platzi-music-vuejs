import config from './config'

const apiKey = config.apiKey
const URL = `https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=colombia&api_key=${apiKey}&format=json`
