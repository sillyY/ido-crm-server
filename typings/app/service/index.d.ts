// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBook from '../../../app/service/book';
import ExportConfigure from '../../../app/service/configure';
import ExportCrawler from '../../../app/service/crawler';

declare module 'egg' {
  interface IService {
    book: ExportBook;
    configure: ExportConfigure;
    crawler: ExportCrawler;
  }
}
