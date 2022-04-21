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
}

export type Transaction = {
  id: string;
  type: TransactionType;
  eventName: string;
  date: string;
  stake: number;
  odd: number;
  status: TransactionStatus;
  note?: string;
  createdAt?: Date;
  updatedAt?: Date;
  sportId: string;
  Sport: any;
  bankrollId?: string;
  Bankroll?: any;
  competitionId?: string;
  Competition?: any;
  marketId?: string;
  Market?: any;
  MultipleSelections?: [];
};
