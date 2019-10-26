// app/service/user.js
const Service = require('egg').Service;
import axios from 'axios'
import { GET_CHAPTER_PREFIX, GET_CONTENT_PREFIX} from '../config'
import { errorCaptured } from '../extend/helper'

export default class CrawlerService extends Service {


  async getChapter(link) {
    const [res, err] = await errorCaptured(axios.get, GET_CHAPTER_PREFIX  + link)
    if(err) {
      throw new Error(err)
    }
    return res.data.data
  }
  async getContent(link) {
      const [res, err] = await errorCaptured(axios.get, GET_CONTENT_PREFIX  + link)
      if(err) {
        throw new Error(err)
      }
      return res.data.data
  }
}

