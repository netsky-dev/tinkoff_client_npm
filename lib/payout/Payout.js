import Request from './Request.js';

const request = new Request();

const TinkoffClient = {
 Payout: {

  add_customer(keys) {
   return request.request({ path: "AddCustomer", keys: keys })
  },

  get_customer(keys) {
   return request.request({ path: "GetCustomer", keys: keys })
  },

  remove_customer(keys) {
   return request.request({ path: "RemoveCustomer", keys: keys })
  },

  add_card(keys) {
   return request.request({ path: "AddCard", keys: keys })
  },

  get_card_list(keys) {
   return request.request({ path: "GetCardList", keys: keys })
  },

  remove_card(keys) {
   return request.request({ path: "RemoveCard", keys: keys })
  },

  init(keys) {
   return request.request({ path: "Init", keys: keys })
  },

  payment(keys) {
   return request.request({ path: "Payment", keys: keys })
  },

  get_state(keys) {
   return request.request({ path: "GetState", keys: keys })
  },

 }
}

export default TinkoffClient.Payout
