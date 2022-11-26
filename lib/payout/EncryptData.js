import NodeRSA from 'node-rsa';
import config from 'config';
import fs from 'fs';
import crypto from "crypto";

const { X509Certificate } = await import('node:crypto');

const TerminalConfig = config.get('Payout')

const TinkoffClient = {
 Payout: {
  EncryptData: {
   encrypt_data(keys) {
    const x509 = new X509Certificate(fs.readFileSync(TerminalConfig.payout_certificate));
    const key = new NodeRSA(fs.readFileSync(TerminalConfig.payout_private_key));
    key.setOptions({ encryptionScheme: 'pkcs1' })
    let data = {
     TerminalKey: TerminalConfig.payout_terminal_key,
     ...keys
    };

    let concatenated = Object.values(data).sort().join("");
    const hash = crypto.createHash("sha256");
    hash.update(concatenated);
    const digest = hash.digest("base64");
    const signature = key.sign(digest, 'base64', 'base64')

    let result = { signature_value: signature, digest_value: digest, x509_serial_number: x509.serialNumber }

    return result;

   }
  }
 }
}

export default TinkoffClient.Payout.EncryptData