import store from 'storejs';
export default class MyStore {
  static get(key: string) {
    return store.get(key);
  }
  static remove(key: string) {
    return store.remove(key);
  }
  static set(key: string, value: string) {
    return store.set(key, value);
  }
}
