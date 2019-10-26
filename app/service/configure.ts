// app/service/user.js
const Service = require('egg').Service;
import axios from 'axios'
import { CRAWLER_SEARCH_URL } from '../config'
import { errorCaptured } from '../extend/helper'

export default class ConfigureService extends Service {
  async search(keyword) {
    const [res, err] = await errorCaptured(axios.get, CRAWLER_SEARCH_URL + encodeURIComponent(keyword))
    if(err) {
      throw new Error(err)
    }
    return res.data
  
}
}

