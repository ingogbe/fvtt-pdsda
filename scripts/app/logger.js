export default class Logger {
  static title = "PDSDA - Post Data |";

  static log(obj) {
    console.log(this.title, obj);
  }

  static error(obj) {
    console.error(this.title, obj);
  }

  static info(obj) {
    console.info(this.title, obj);
  }

  static warn(obj) {
    console.warn(this.title, obj);
  }
};