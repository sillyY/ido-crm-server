// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBase from '../../../app/controller/base';
import ExportBook from '../../../app/controller/book';
import ExportConfigure from '../../../app/controller/configure';

declare module 'egg' {
  interface IController {
    base: ExportBase;
    book: ExportBook;
    configure: ExportConfigure;
  }
}
