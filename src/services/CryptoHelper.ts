// cryptoHelper.js
import * as CryptoJS from "crypto-js";

const SECRET_KEY = "a91b8f0d9d21c8a6f4e2bda3f3c7c123badae99876f4b123dfe4321aab98c77f";


// Encrypt JS object → Encrypted query string
export function encryptQuery(obj:any): string {
  const jsonString = JSON.stringify(obj);
  const encrypted = CryptoJS.AES.encrypt(jsonString, SECRET_KEY).toString();
  return encodeURIComponent(encrypted);
}

// Decrypt query string → JS object
export function decryptQuery(encryptedStr:any): any {
  try {
    const decoded = decodeURIComponent(encryptedStr);
    const bytes = CryptoJS.AES.decrypt(decoded, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  } catch (err) {
    console.error("❌ Decryption failed:", err);
    return null;
  }
}
