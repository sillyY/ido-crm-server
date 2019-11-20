// app/service/user.js
const Service = require('egg').Service
import axios from 'axios'
import { BASE_URL, SEARCH_SUFFIX } from '../config/index'
import { errorCaptured } from '../extend/helper'

export default class ConfigureService extends Service {
  async search(keyword: string) {
    return new Promise(async (resolve, reject) => {
      const [res, err] = await errorCaptured(
        axios,
        BASE_URL + SEARCH_SUFFIX + encodeURIComponent(keyword)
      )
      if (err) reject(err)
      resolve(res.data.data)
    })
  }
}
