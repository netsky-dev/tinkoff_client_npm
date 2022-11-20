import SendRequest from "../../SendRequest.js"
import config from 'config';
import { createHash } from 'crypto';

const TerminalConfig = config.get('Payment')

const TinkoffClient = {
 Payment: {
  Request: class {
   constructor(defaultUrl = 'https://securepay.tinkoff.ru/v2/') {
    this.url = defaultUrl
   };

   init_params(keys) {
    let data = {
     TerminalKey: TerminalConfig.payment_terminal_key,
     Password: TerminalConfig.payment_terminal_secret,
     ...keys
    };

    data.Token = this.generate_token(data);
    const { Password, ...payload } = data;
    return payload
   };

   generate_token(keys) {
    const { Receipt, Shops, DATA, ...data } = keys;
    let payload = Object.entries(data).sort().map(function (value, index) { return value[1]; }).join("");
    return createHash('sha256').update(payload).digest('hex');
   }
  }
 }
}

Object.setPrototypeOf(TinkoffClient.Payment.Request.prototype, SendRequest);

export default TinkoffClient.Payment.Request