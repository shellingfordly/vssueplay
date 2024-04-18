import UTF8 from "crypto-js/enc-utf8";
import Base64 from "crypto-js/enc-base64";

function encryptByBase64(cipherText: string) {
  return UTF8.parse(cipherText).toString(Base64);
}

function decodeByBase64(cipherText: string) {
  return Base64.parse(cipherText).toString(UTF8);
}

export class WebStorage {
  private storage: Storage;
  private prefixKey?: string;
  private isEncrypt: boolean = true;

  constructor({
    storage,
    prefixKey,
    isEncrypt,
  }: {
    storage: Storage;
    prefixKey: string;
    isEncrypt: boolean;
  }) {
    this.storage = storage;
    this.prefixKey = prefixKey;
    this.isEncrypt = isEncrypt;
  }

  private getKey(key: string) {
    return `${this.prefixKey}${key}`.toUpperCase();
  }

  get(key: string): Record<string, any> {
    const value = this.storage.getItem(this.getKey(key));

    if (value) {
      return JSON.parse(this.isEncrypt ? decodeByBase64(value) : value);
    }

    return {};
  }

  set(key: string, value: string) {
    const storageValue = this.isEncrypt
      ? encryptByBase64(JSON.stringify(value))
      : JSON.stringify(value);

    this.storage.setItem(this.getKey(key), storageValue);
  }

  remove(key: string) {
    this.storage.removeItem(this.getKey(key));
  }

  clear() {
    this.storage.clear();
  }
}

export function createStorage() {
  const storage = new WebStorage({
    storage: sessionStorage,
    prefixKey: "VITE_",
    isEncrypt: true,
  });
  return storage;
}
