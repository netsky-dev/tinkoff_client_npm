import TinkoffClient from '../TinkoffClient';
import { jest } from '@jest/globals'

import Request from '../lib/payment/Request';

let data = { data: true };
Request.prototype.request = jest.fn().mockImplementation(() => data);

beforeEach(() => {
 Request.prototype.request.mockClear();
});

test("calls TinkoffClient.Payment.init", () => {
 let keys = { Amount: "1000", OrderId: 3000 }
 expect(TinkoffClient.Payment.init(keys)).toStrictEqual(data)

 expect(Request.prototype.request).toHaveBeenCalledWith({ path: "Init", keys });
});


test("calls TinkoffClient.Payment.confirm", () => {
 let keys = { PaymentId: "1000" }
 expect(TinkoffClient.Payment.confirm(keys)).toStrictEqual(data)

 expect(Request.prototype.request).toHaveBeenCalledWith({ path: "Confirm", keys });
});


test("calls TinkoffClient.Payment.get_state", () => {
 let keys = { PaymentId: "1000" }
 expect(TinkoffClient.Payment.get_state(keys)).toStrictEqual(data)

 expect(Request.prototype.request).toHaveBeenCalledWith({ path: "GetState", keys });
});

test("calls TinkoffClient.Payment.cancel", () => {
 let keys = { PaymentId: "1000" }
 expect(TinkoffClient.Payment.cancel(keys)).toStrictEqual(data)

 expect(Request.prototype.request).toHaveBeenCalledWith({ path: "Cancel", keys });
});


test("calls TinkoffClient.Payment.check_order", () => {
 let keys = { OrderId: "1000" }
 expect(TinkoffClient.Payment.check_order(keys)).toStrictEqual(data)

 expect(Request.prototype.request).toHaveBeenCalledWith({ path: "CheckOrder", keys });
});

test("calls TinkoffClient.Payment.send_closing_receipt", () => {
 let keys = {
  PaymentId: "1986709080",
  Receipt: {
   Email: "test@test.ru", Taxation: "osn",
   Items: [{
    Name: "test", Quantity: "2",
    Amount: "333", Price: "333",
    Tax: "vat20", PaymentMethod: "full_payment",
    PaymentObject: "lottery_prize"
   }]
  }
 }
 expect(TinkoffClient.Payment.send_closing_receipt(keys)).toStrictEqual(data)

 expect(Request.prototype.request).toHaveBeenCalledWith({ path: "SendClosingReceipt", keys });
});


