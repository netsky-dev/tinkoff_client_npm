import Request from './Request.js';
import EncryptCardData from "./EncryptCard.js"

let request = new Request();

const TinkoffClient = {
 Payment: {

  init(keys) {
   return request.request({ path: "Init", keys: keys })
  },

  confirm(keys) {
   return request.request({ path: "Confirm", keys })
  },

  get_state(keys) {
   return request.request({ path: "GetState", keys })
  },

  cancel(keys) {
   return request.request({ path: "Cancel", keys })
  },

  check_order(keys) {
   return request.request({ path: "CheckOrder", keys })
  },

  send_closing_receipt(keys) {
   return request.request({ path: "SendClosingReceipt", keys })
  },

  finish_authorize(keys) {
   let card_data = EncryptCardData(keys);
   keys.CardData = card_data;
   const { Card, ...payload } = keys;
   return request.request({ path: "FinishAuthorize", keys: payload })
  }

 }
}

export default TinkoffClient.Payment

