import SendRequest from "../../SendRequest.js"
import config from 'config';
import EncryptData from "./EncryptData.js";

const TerminalConfig = config.get('Payout')

const TinkoffClient = {
 Payout: {
  Request: class {
   constructor(defaultUrl = 'https://securepay.tinkoff.ru/e2c/v2/') {
    this.url = defaultUrl
   };

   init_params(keys) {
    let hash = this.encrypt_data(keys)

    let data = {
     TerminalKey: TerminalConfig.payout_terminal_key,
     SignatureValue: hash.signature_value,
     DigestValue: hash.digest_value,
     X509SerialNumber: hash.x509_serial_number,
     ...keys
    };

    return data
   };

  }
 }
}

Object.assign(TinkoffClient.Payout.Request.prototype, SendRequest);
Object.assign(TinkoffClient.Payout.Request.prototype, EncryptData);

export default TinkoffClient.Payout.Request