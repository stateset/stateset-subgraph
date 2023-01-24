import { Protobuf, Reader } from "as-proto";

// Decoder Functions

export function decodeMsgDelegate(a: Uint8Array): MsgDelegate {
  return Protobuf.decode<MsgDelegate>(a, MsgDelegate.decode);
}

export function decodeMsgRequestLoan(a: Uint8Array): MsgRequestLoan {
  return Protobuf.decode<MsgRequestLoan>(a, MsgRequestLoan.decode);
}

export function decodeMsgCancelLoan(a: Uint8Array): MsgCancelLoan {
  return Protobuf.decode<MsgCancelLoan>(a, MsgCancelLoan.decode);
}

export function decodeMsgApproveLoan(a: Uint8Array): MsgApproveLoan {
  return Protobuf.decode<MsgApproveLoan>(a, MsgApproveLoan.decode);
}

export function decodeMsgRepayLoan(a: Uint8Array): MsgRepayLoan {
  return Protobuf.decode<MsgRepayLoan>(a, MsgRepayLoan.decode);
}

export function decodeMsgLiquidateLoan(a: Uint8Array): MsgLiquidateLoan {
  return Protobuf.decode<MsgLiquidateLoan>(a, MsgLiquidateLoan.decode);
}

export class MsgSend {
  static decode(reader: Reader, length: i32): MsgSend {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new MsgSend();

    while (reader.ptr < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from_address = reader.string();
          break;

        case 2:
          message.to_address = reader.string();
          break;

        case 3:
          message.amount = MsgCoin.decode(reader, reader.uint32());
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  }

  from_address: string;
  to_address: string;
  amount: MsgCoin | null;

  constructor(from_address: string = "", to_address: string = "", amount: MsgCoin | null = null) {
    this.from_address = from_address;
    this.to_address = to_address;
    this.amount = amount;
  }
}


// Delegate Msg 

export class MsgDelegate {
  static decode(reader: Reader, length: i32): MsgDelegate {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new MsgDelegate();

    while (reader.ptr < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegator_address = reader.string();
          break;

        case 2:
          message.validator_address = reader.string();
          break;

        case 3:
          message.amount = MsgCoin.decode(reader, reader.uint32());
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  }

  delegator_address: string;
  validator_address: string;
  amount: MsgCoin | null;

  constructor(delegator_address: string = "", validator_address: string = "", amount: MsgCoin | null = null) {
    this.delegator_address = delegator_address;
    this.validator_address = validator_address;
    this.amount = amount;
  }
}

// Msg Coin

export class MsgCoin {
  static decode(reader: Reader, length: i32): MsgCoin {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new MsgCoin();

    while (reader.ptr < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;

        case 2:
          message.amount = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  }

  denom: string;
  amount: string;

  constructor(denom: string = "", amount: string = "") {
    this.denom = denom;
    this.amount = amount;
  }
}

// Request Loan Message

export class MsgRequestLoan {
  static decode(reader: Reader, length: i32): MsgRequestLoan {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new MsgRequestLoan();

    while (reader.ptr < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;

        case 2:
          message.amount = MsgCoin.decode(reader, reader.uint32());
          break;

        case 3:
          message.fee = MsgCoin.decode(reader, reader.uint32());
          break;

        case 4:
          message.collateral = MsgCoin.decode(reader, reader.uint32());
          break;

        case 4:
          message.deadline = reader.string();
          break;


        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  }

  creator: string;
  amount: MsgCoin | null;
  fee: MsgCoin | null;
  collateral: MsgCoin | null;
  deadline: string;

  constructor(creator: string = "", amount: MsgCoin | null = null, fee: MsgCoin | null = null, collateral: MsgCoin | null = null, deadline: string = "") {
    this.creator = creator;
    this.amount = amount;
    this.fee = fee;
    this.collateral = collateral;
    this.deadline = deadline;
  }
}

// Approve Loan Msg

export class MsgApproveLoan {
  static decode(reader: Reader, length: i32): MsgApproveLoan {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new MsgApproveLoan();

    while (reader.ptr < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  }

  creator: string;
  id: string;

  constructor(creator: string = "", id: string = "") {
    this.creator = creator;
    this.id = id
  }
}

// Repay Loan Message

export class MsgRepayLoan {
  static decode(reader: Reader, length: i32): MsgRepayLoan {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new MsgRepayLoan();

    while (reader.ptr < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  }

  creator: string;
  id: string;

  constructor(creator: string = "", id: string = "") {
    this.creator = creator;
    this.id = id
  }
}

// Cancel Loan Message

export class MsgCancelLoan {
  static decode(reader: Reader, length: i32): MsgCancelLoan {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new MsgCancelLoan();

    while (reader.ptr < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  }

  creator: string;
  id: string;

  constructor(creator: string = "", id: string = "") {
    this.creator = creator;
    this.id = id
  }
}


// Liquidate Loan Message

export class MsgLiquidateLoan {
  static decode(reader: Reader, length: i32): MsgLiquidateLoan {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new MsgLiquidateLoan();

    while (reader.ptr < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  }

  creator: string;
  id: string;

  constructor(creator: string = "", id: string = "") {
    this.creator = creator;
    this.id = id
  }
}