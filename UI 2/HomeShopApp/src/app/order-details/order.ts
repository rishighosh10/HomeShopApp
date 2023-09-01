export interface ICustomerOrder {
  amount: number;
  paymentMethod: string;
  transactionId: string;
  orderStatus: string;
  customerId: number;
}

// export interface IGuestOrder {
//   orderDate: Date;
//   amount: number;
//   paymentMethod: string;
//   transactionId: string;
//   orderStatus: string;
//   guestId: number;
// }

export interface ICustomerOrderDetails {
  customerOrderId: number;
  productId: number;
  unitPrice: number;
  quantity: number;
}

// export interface IGuestOrderDetails {
//   guestOrderId: number;
//   foodMenuId: number;
//   unitPrice: number;
//   quantity: number;
// }
