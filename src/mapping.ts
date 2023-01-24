import { BigInt, cosmos } from "@graphprotocol/graph-ts";
import { Loan, Invoice, Block, Reward, Delegation, Coin, Send } from "../generated/schema";
import { MsgDelegate, MsgCoin, decodeMsgDelegate, decodeMsgRequestLoan, decodeMsgApproveLoan, decodeMsgCancelLoan, decodeMsgLiquidateLoan, decodeMsgRepayLoan, MsgRequestLoan, MsgApproveLoan, MsgCancelLoan, MsgLiquidateLoan, MsgRepayLoan, MsgSend } from "./decoding";

export function handleBlock(bl: cosmos.Block): void {
    const hash = bl.header.hash.toHexString();
    const height = BigInt.fromString(bl.header.height.toString());

    const block = new Block(hash);

    block.number = height;
    block.timestamp = BigInt.fromString(bl.header.time.seconds.toString());

    block.save();
}


export function handleReward(data: cosmos.EventData): void {
    const height = data.block.header.height;

    const amount = data.event.getAttributeValue("amount");
    const validator = data.event.getAttributeValue("validator");

    let reward = new Reward(`${height}-${validator}`);

    reward.amount = amount;
    reward.validator = validator;

    reward.save();
}

export function handleTx(data: cosmos.TransactionData): void {
    const id = `${data.block.header.hash.toHexString()}-${data.tx.index}`;
    const messages = data.tx.tx.body.messages;
  
    for (let i = 0; i < messages.length; i++) {
      let msgType = messages[i].typeUrl;
      let msgValue = messages[i].value as Uint8Array;
  
      if (msgType == "/cosmos.staking.v1beta1.MsgDelegate") {
        saveDelegation(id, decodeMsgDelegate(msgValue)) // The message needs to be decoded to access its attributes.
      } else if (msgType == "/stateset.core.loan.MsgRequestLoan") {
        saveLoan(id, decodeMsgRequestLoan(msgValue))
      } else if (msgType == "/stateset.core.loan.MsgApproveLoan") {
        approveLoan(id, decodeMsgApproveLoan(msgValue))
      } else if (msgType == "/stateset.core.loan.MsgCancelLoan") {
        cancelLoan(id, decodeMsgCancelLoan(msgValue))
      } else if (msgType == "/stateset.core.loan.MsgRepayLoan") {
        repayLoan(id, decodeMsgRepayLoan(msgValue))
      } else if (msgType == "/stateset.core.loan.MsgLiquidateLoan") {
        liquidateLoan(id, decodeMsgLiquidateLoan(msgValue))
      }
    }
  }


  function saveSend(id: string, message: MsgSend): void {
    const msg = new Send(id);
  
    msg.fromAddress = message.from_address;
    msg.toAddress = message.to_address;
    msg.amount = saveCoin(id, message.amount as MsgCoin);
  
    msg.save();
  }
  
  function saveDelegation(id: string, message: MsgDelegate): void {
    const msg = new Delegation(id);
  
    msg.delegatorAddress = message.delegator_address;
    msg.validatorAddress = message.validator_address;
    msg.amount = saveCoin(id, message.amount as MsgCoin);
  
    msg.save();
  }

  function saveLoan(id: string, message: MsgRequestLoan): void {
    const msg = new Loan(id);

    msg.creator = message.creator;
    msg.amount = saveCoin(id, message.amount as MsgCoin);
    msg.fee = saveCoin(id, message.fee as MsgCoin);
    msg.collateral = saveCoin(id, message.collateral as MsgCoin);
    msg.deadline = message.deadline;
  
    msg.save();

  }

  function approveLoan(id: string, message: MsgApproveLoan): void {
    const msg = new Loan(id);
    msg.creator = message.creator;
    msg.id = message.id;
    msg.save();

  }

  function repayLoan(id: string, message: MsgRepayLoan): void {
    const msg = new Loan(id);
    msg.creator = message.creator;
    msg.id = message.id;
    msg.save();

  }

  function cancelLoan(id: string, message: MsgCancelLoan): void {
    const msg = new Loan(id);
    msg.creator = message.creator;
    msg.id = message.id;
    msg.save();

  }
  
  function liquidateLoan(id: string, message: MsgLiquidateLoan): void {
    const msg = new Loan(id);
    msg.creator = message.creator;
    msg.id = message.id;
    msg.save();

  }


  function saveCoin(id: string, c: MsgCoin): string {
    const coin = new Coin(id);
  
    coin.amount = c.amount;
    coin.denom = c.denom;
  
    coin.save();
  
    return id;
  }

export function handleInvoices(data: cosmos.EventData): void {

    const height = data.block.header.height;
    const seller = data.event.getAttributeValue("seller");
    const purchaser = data.event.getAttributeValue("purchaser");
    const factor = data.event.getAttributeValue("factor");

    let invoice = new Invoice(`${height}-${seller}`);
    invoice.seller = seller;
    invoice.purchaser = purchaser;
    invoice.factor = factor;

    invoice.save();
}