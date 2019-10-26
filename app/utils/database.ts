import * as mongoose from 'mongoose'
import { DATABASE } from '../config'
import * as autoIncrement from 'mongoose-auto-increment'

export interface IDataBase {
  instance: IDataBase | null
}
class DataBase {
  private static instance: DataBase
  private dbClient: any
  public autoIncrement: any
  constructor() {
    this.dbClient = null
    this.autoIncrement = null
    this.connect()
    this.initEvent()
  }

  static getInstance() {
    if (!DataBase.instance) {
      DataBase.instance = new DataBase()
    }
    return DataBase.instance
  }
  connect() {
    let that = this
    return new Promise(async (resolve, reject) => {
      if (!that.dbClient) {
        try {
          that.dbClient = await mongoose.connect(
            `mongodb://${DATABASE.root}:${DATABASE.password}@${DATABASE.server}:${DATABASE.port}/${DATABASE.db}`,
            { useUnifiedTopology: true, useNewUrlParser: true, keepAlive: true }
          )
          autoIncrement.initialize(that.dbClient)
          that.autoIncrement = autoIncrement
          resolve(that.dbClient)
        } catch (err) {
          reject(err)
        }
      } else {
        resolve(that.dbClient)
      }
    })
  }
  initEvent() {
    /**
     * 连接成功
     */
    mongoose.connection.on('connected', function() {
      console.log('Mongoose connection open to ' + DATABASE.server)
    })

    /**
     * 连接异常
     */
    mongoose.connection.on('error', function(err) {
      console.log('Mongoose connection error: ' + err)
    })

    /**
     * 连接断开
     */
    mongoose.connection.on('disconnected', function() {
      console.log('Mongoose connection disconnected')
    })
  }
}
export default DataBase.getInstance()
