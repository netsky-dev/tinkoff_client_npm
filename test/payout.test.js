import TinkoffClient from '../TinkoffClient';
import { jest } from '@jest/globals'

import Request from '../lib/payout/Request';

let data = { data: true };
Request.prototype.request = jest.fn().mockImplementation(() => data);

beforeEach(() => {
 Request.prototype.request.mockClear();
});

test("calls TinkoffClient.Payout.add_customer", () => {
 let keys = { CustomerKey: "1000" }
 expect(TinkoffClient.Payout.add_customer(keys)).toStrictEqual(data)

 expect(Request.prototype.request).toHaveBeenCalledWith({ path: "AddCustomer", keys });
});

test("calls TinkoffClient.Payout.get_customer", () => {
 let keys = { CustomerKey: "1000" }
 expect(TinkoffClient.Payout.get_customer(keys)).toStrictEqual(data)

 expect(Request.prototype.request).toHaveBeenCalledWith({ path: "GetCustomer", keys });
});

test("calls TinkoffClient.Payout.remove_customer", () => {
 let keys = { CustomerKey: "1000" }
 expect(TinkoffClient.Payout.remove_customer(keys)).toStrictEqual(data)

 expect(Request.prototype.request).toHaveBeenCalledWith({ path: "RemoveCustomer", keys });
});

test("calls TinkoffClient.Payout.add_card", () => {
 let keys = { CustomerKey: "1000" }
 expect(TinkoffClient.Payout.add_card(keys)).toStrictEqual(data)

 expect(Request.prototype.request).toHaveBeenCalledWith({ path: "AddCard", keys });
});

test("calls TinkoffClient.Payout.get_card_list", () => {
 let keys = { CustomerKey: "1000" }
 expect(TinkoffClient.Payout.get_card_list(keys)).toStrictEqual(data)

 expect(Request.prototype.request).toHaveBeenCalledWith({ path: "GetCardList", keys });
});

test("calls TinkoffClient.Payout.remove_card", () => {
 let keys = { CustomerKey: "1000" }
 expect(TinkoffClient.Payout.remove_card(keys)).toStrictEqual(data)

 expect(Request.prototype.request).toHaveBeenCalledWith({ path: "RemoveCard", keys });
});

test("calls TinkoffClient.Payout.init", () => {
 let keys = { CustomerKey: "1000", OrderId: "supertest1", Amount: "333", CardId: 1 }
 expect(TinkoffClient.Payout.init(keys)).toStrictEqual(data)

 expect(Request.prototype.request).toHaveBeenCalledWith({ path: "Init", keys });
});

test("calls TinkoffClient.Payout.payment", () => {
 let keys = { CustomerKey: "1000" }
 expect(TinkoffClient.Payout.payment(keys)).toStrictEqual(data)

 expect(Request.prototype.request).toHaveBeenCalledWith({ path: "Payment", keys });
});

test("calls TinkoffClient.Payout.get_state", () => {
 let keys = { CustomerKey: "1000" }
 expect(TinkoffClient.Payout.get_state(keys)).toStrictEqual(data)

 expect(Request.prototype.request).toHaveBeenCalledWith({ path: "GetState", keys });
});
