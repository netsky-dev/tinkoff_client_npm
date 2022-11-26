# TinkoffClient

Tinkoff Javascript API wrapper for payments and e2c payouts 

## Installation

```javascript
npm instal tinkoff_client
```

## Usage

Make configuration file
config/default.json
 
and add

```json
{
 "Payment": {
  "payment_terminal_key": "1111111111",
  "payment_terminal_secret": "111111111",
  "payment_public_key": "./private.key"
 },
 "Payout": {
  "payout_terminal_key": "11111111111",
  "payment_terminal_secret": "1111111111",
  "payout_certificate": "./open-api-cert.pem",
  "payout_private_key": "./private.key"
 }
}
```


payment_public_key is optional, others are required

If you do not have your own payment form, to make a payment, simply call the init method

```javascript
import TinkoffClient from 'tinkoff_client';

const result = await TinkoffClient.Payment.init({ Amount: "1000", OrderId: 3000 });
```

and every method return for you object response for example method init return this

```javascript
{"Success"=>true,
 "ErrorCode"=>"0",
 "TerminalKey"=>"1111111111",
 "Status"=>"NEW",
 "PaymentId"=>"123456789",
 "OrderId"=>"3331",
 "Amount"=>1000,
 "PaymentURL"=>"https://securepayments.tinkoff.ru/q2wER3t0"}
 ```

or something like this

```javascript
 {"Success"=>false, 
 "ErrorCode"=>"9999", 
 "Message"=>"Неверные параметры.", 
 "Details"=>"Поле OrderId не должно быть пустым."}
 ```


in version 1.0.0 available methods

for Payment:
```javascript
TinkoffClient.Payment.init();
TinkoffClient.Payment.confirm();
TinkoffClient.Payment.get_state();
TinkoffClient.Payment.cancel();
TinkoffClient.Payment.check_order();
TinkoffClient.Payment.send_closing_receipt();
TinkoffClient.Payment.finish_authorize();
```


for Payout:
```javascript
TinkoffClient.Payout.add_customer();
TinkoffClient.Payout.get_customer();
TinkoffClient.Payout.remove_customer();
TinkoffClient.Payout.add_card();
TinkoffClient.Payout.get_card_list();
TinkoffClient.Payout.remove_card();
TinkoffClient.Payout.init();
TinkoffClient.Payout.payment();
TinkoffClient.Payout.get_state();

```



see full trace params for request and returning response
https://www.tinkoff.ru/kassa/develop/api/payments/
## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/netsky-dev/tinkoff_client_npm



MIT License

Copyright (c) 2022 Netsky

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
