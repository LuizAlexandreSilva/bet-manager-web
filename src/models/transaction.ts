export enum TransactionType {
  STANDARD_BET = 'STANDARD_BET',
  MULTIPLE_BET = 'MULTIPLE_BET',
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW',
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  WON = 'WON',
  LOSS = 'LOSS',
  DRAW = 'DRAW',
}

export type Transaction = {
  id: string;
  type: TransactionType;
  eventName: string;
  date: string;
  stake: number;
  odd: number;
  result: number;
  status: TransactionStatus;
  note?: string;
  createdAt?: Date;
  updatedAt?: Date;
  sportId?: string;
  Sport?: any;
  marketId?: string;
  Market?: any;
};
