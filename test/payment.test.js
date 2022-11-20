import TinkoffClient from '../TinkoffClient';

let client = await TinkoffClient.Payment.init({ Amount: "1000", OrderId: 2000 })

test('should TinkoffClient.Payment.init return response', async () => {
 expect(client).not.toBe(null);
 expect(client.Success).toEqual(true)
});

test('should TinkoffClient.Payment.confirm return response', async () => {
 let result = await TinkoffClient.Payment.confirm({ PaymentId: client.PaymentId })
 expect(result).not.toBe(null);
 expect(result.Success).toEqual(false)
 expect(result.Details).toEqual('Изменение статуса недопустимо.')
});

test('should TinkoffClient.Payment.get_state return status of payment', async () => {
 let result = await TinkoffClient.Payment.get_state({ PaymentId: client.PaymentId })
 expect(result).not.toBe(null);
 expect(result.Success).toEqual(true)
 expect(result.Status).toEqual('NEW')
});

test('should TinkoffClient.Payment.cancel return canceled payment', async () => {
 let result = await TinkoffClient.Payment.cancel({ PaymentId: client.PaymentId })
 expect(result).not.toBe(null);
 expect(result.Success).toEqual(true)
 expect(result.Status).toEqual('CANCELED')
});

test('should TinkoffClient.Payment.check_order return order status', async () => {
 let result = await TinkoffClient.Payment.check_order({ OrderId: client.OrderId })
 expect(result).not.toBe(null);
 expect(result.Success).toEqual(true)
 expect(result.Payments).not.toBe(null);

});


test('should TinkoffClient.Payment.send_closing_receipt send closed check to checkout', async () => {
 let init_params = {
  Amount: "333", OrderId: 2002,
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

 let init = await TinkoffClient.Payment.init(init_params)
 expect(client).not.toBe(null);
 expect(client.Success).toEqual(true)


 let receipt_params = {
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

 let result = await TinkoffClient.Payment.send_closing_receipt(receipt_params)
 expect(result).not.toBe(null);
 expect(result.Message).toEqual('[receiptRequestDTO: Закрывающие чеки формируются только для оплаченных платежей]');

});

test('should TinkoffClient.Payment.finish_authorize return order Success status', async () => {
 let params = {
  PaymentId: client["PaymentId"],
  Card: {
   PAN: 5545454545454545,
   ExpDate: 4545,
   CardHolder: "IVAN PETROV",
   CVV: "111"
  }
 }
 let result = await TinkoffClient.Payment.finish_authorize(params)
 expect(result).not.toBe(null);

});

