export class OrderDto {
  orderId?: string;
  action?: string;
  type?: string;
  quantity?: number;
  quantityType?: string;
  marketTime?: string;
  symbol?: string;
  accountNumber?: string;
  userId?: string;
  limitPrice?: number;
  stopPrice?: number;
  status?: string;
  createdAt?: Date;
}
