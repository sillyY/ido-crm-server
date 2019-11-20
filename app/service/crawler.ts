// app/service/user.js
const Service = require('egg').Service;
import axios from 'axios'
import { BASE_URL, CHAPTER_PREFIX, CONTENT_PREFIX} from '../config/index'
import { errorCaptured } from '../extend/helper'

export default class CrawlerService extends Service {
  async getChapter(link) {
    const [res, err] = await errorCaptured(axios.get, BASE_URL + CHAPTER_PREFIX  + link)
    if(err) {
      throw new Error(err)
    }
    return res.data.data
  }
  async getContent(link) {
      const [res, err] = await errorCaptured(axios.get, BASE_URL + CONTENT_PREFIX  + link)
      if(err) {
        throw new Error(err)
      }
      return res.data.data
  }
}

