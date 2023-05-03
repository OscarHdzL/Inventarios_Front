import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncriptarService {
  constructor() { }

  private readonly SALT = CryptoJS.enc.Base64.parse("SW52ZW50YXJpb3NfMjAxM19wbVM=");
  private readonly KEY = "363c246596532b1db9c0129e741c14510c7296b2";
  private readonly ITERATIONS = 1000;

  Encrypt(origin: string): string{
    try {
      let keyWordArray = CryptoJS.enc.Utf8.parse(this.KEY);
      let originWordArray = CryptoJS.enc.Utf16LE.parse(origin);
      let keyAndIv = CryptoJS.PBKDF2(keyWordArray, this.SALT, {
        keySize: 256/32 + 128/32,
        iterations: this.ITERATIONS,
        hasher: CryptoJS.algo.SHA1
      });
      let hexKeyAndIv = CryptoJS.enc.Hex.stringify(keyAndIv);
      let hexKey = CryptoJS.enc.Hex.parse(hexKeyAndIv.substring(0, 64));
      let iv = CryptoJS.enc.Hex.parse(hexKeyAndIv.substring(64, hexKeyAndIv.length));
      return CryptoJS.AES.encrypt(originWordArray, hexKey, {iv: iv}).toString();
    }
    catch (error) {
      throw error;
    }
  }

  Decrypt(encrypted: string): string{
    try {
      let keyWordArray = CryptoJS.enc.Utf8.parse(this.KEY);

      let keyAndIv = CryptoJS.PBKDF2(keyWordArray, this.SALT, {
        keySize: 256/32 + 128/32,
        iterations: this.ITERATIONS,
        hasher: CryptoJS.algo.SHA1
      });

      let hexKeyAndIv = CryptoJS.enc.Hex.stringify(keyAndIv);

      let hexKey = CryptoJS.enc.Hex.parse(hexKeyAndIv.substring(0, 64));
      let iv = CryptoJS.enc.Hex.parse(hexKeyAndIv.substring(64, hexKeyAndIv.length));

      let decryptedWordArray = CryptoJS.AES.decrypt(encrypted, hexKey, {iv: iv});
      return CryptoJS.enc.Utf16LE.stringify(decryptedWordArray);
    }
    catch (error) {
      throw error;
    }
  }
}
