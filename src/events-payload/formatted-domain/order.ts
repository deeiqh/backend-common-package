  import { OrderIdProps } from './order-id';
  import { OrderActionProps } from './order-action';
  import { OrderTypeProps } from './order-type';
  import { OrderQuantityProps } from './order-quantity';
  import { OrderQuantityTypeProps } from './order-quantity-type';
  import { OrderMarketTimeProps } from './order-market-time';
  import { OrderSymbolProps } from './order-symbol';
  import { OrderAccountNumberProps } from './order-account-number';
  import { OrderUserIdProps } from './order-user-id';
  import { OrderLimitPriceProps } from './order-limit-price';
  import { OrderStopPriceProps } from './order-stop-price';
  import { OrderStatusProps } from './order-status';

export class OrderProps {    
  orderId: OrderIdProps = new OrderIdProps();
  action: OrderActionProps = new OrderActionProps();
  type: OrderTypeProps = new OrderTypeProps();
  quantity: OrderQuantityProps = new OrderQuantityProps();
  quantityType: OrderQuantityTypeProps = new OrderQuantityTypeProps();
  marketTime: OrderMarketTimeProps = new OrderMarketTimeProps();
  symbol: OrderSymbolProps = new OrderSymbolProps();
  accountNumber?: OrderAccountNumberProps = new OrderAccountNumberProps();
  userId?: OrderUserIdProps = new OrderUserIdProps();
  
  limitPrice?: OrderLimitPriceProps = new OrderLimitPriceProps();
  stopPrice?: OrderStopPriceProps = new OrderStopPriceProps();
  status: OrderStatusProps = new OrderStatusProps();
  createdAt = new Date();
}
