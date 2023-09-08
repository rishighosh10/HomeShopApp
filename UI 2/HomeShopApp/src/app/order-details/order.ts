export interface ICustomerOrder {
  amount: number;
  paymentMethod: string;
  transactionId: string;
  orderStatus: string;
  customerId: number;
}


export interface ICustomerOrderDetails {
  customerOrderId: number;
  productId: number;
  unitPrice: number;
  quantity: number;
}

