import NodeRSA from 'node-rsa';
import config from 'config';
import fs from 'fs';
const TerminalConfig = config.get('Payment')

const TinkoffClient = {
 Payment: {
  EncryptCardData: {
   encrypt_data(keys) {
    let card = keys.Card;
    let concatenated = Object.entries(card).map((k, v) => [k, v].join("=")).join(";");
    const key = new NodeRSA(fs.readFileSync(TerminalConfig.payment_public_key));
    return key.encrypt(concatenated, 'base64');
   }
  }
 }
}

export default TinkoffClient.Payment.EncryptCardData.encrypt_data