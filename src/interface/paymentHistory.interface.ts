export interface IPaymentHistory {
  transactionId?: string;
  paymentDate?: Date;
  isSuccess: boolean;
  notes?: string;
  total: number;
  isDeleted: boolean;
}
