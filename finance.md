# Finance
## Web Credits
The `cc:` vocab defines [web credits](https://webcredits.org/#example),
[web ledgers](https://webcredits.org/#example-0), and
[web wallets](https://webcredits.org/#example-1).

## Payment pointers
See the [Open Payments Account API](https://docs.openpayments.dev/accounts#get). This could
live at https://alice.com/.well-known/pay (for payment pointer `$alice.com`), or at
https://alice.com/any/other.location (for payment pointer `$alice.com/any/other.location`).

## Transactions
Solid OS stores [Two-Line Transaction](http://solid.github.io/solid-ui/examples/storybook/?path=/docs/widgets--two-line-transactions#twolinetransactions).
See [Quicken interchange format](https://www.w3.org/2000/10/swap/pim/qif-doc/QIF-doc.htm), [qif2n3.py](https://www.w3.org/2000/10/swap/pim/qif2n3.py) and 
the [qu: vocab](https://www.w3.org/2000/10/swap/pim/qif.n3).

## Half Trades

The MoneyPane of Solid OS imports bank statements into half-trade entries in a ledger view.
A half-trade is half a trade, so either a payment or a purchase. If you pay 1 dollar for
a banana, then receiving the banana is one half-trade, and paying 1 dollar (which is the
event that may show up in your bank statements) is another.
These look as follows:
```turtle
@prefix halftrade: <https://ledgerloops.com/vocab/HalfTrade#>
<#d6e6bf16-759a-450d-92d9-02c109d97e34> a halftrade:HalfTrade ;
  dct:date  "2019-04-17T07:50:18Z"^^XML:dateTime ;
  halftrade:from <iban:CH93-0076-2011-6238-5295-7> ;
  halftrade:to <../shops.ttl#gumus> ;
  halftrade:amount 13.84 ;
  halftrade:unit "EUR" ;
  halftrade:impliedBy <../my-bank-statement.csv> ;
  halftrade:description "Electronic payment in shop" .

<#c1ed80a9-e7b1-4ba3-8877-a8656c6823b2> a halftrade:HalfTrade ;
  dct:date  "2019-04-17T07:50:18Z"^^XML:dateTime ;
  halftrade:from <../shops.ttl#gumus> ;
  halftrade:to <https://alice.com/#me> ;
  halftrade:amount 13.84 ;
  halftrade:unit "EUR" ;
  halftrade:impliedBy <#d6e6bf16-759a-450d-92d9-02c109d97e34> ;
  halftrade:description "Purchase implied by Electronic payment in shop" .
```
The effect of these two half-trades together is a change in balance
between https://alice.com/#me and iban:CH93-0076-2011-6238-5295-7.
Half trades can also be implied by [SNAP messages](./chat.md#SNAP-messages), but
only if they have `snap:newState snap:Accepted`. SNAP messages on top of Solid Chat
are always stored twice (once by the sender and once by the receiver), but the convention
is to link to the user's own copy, on their own PDS, and not to the copy on the other
party's PDS.