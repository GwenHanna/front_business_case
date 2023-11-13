export class selection {
  constructor(
    public articleName: string,
    private serviceName: string,
    public priceTotal: number,
    public quantity: number
  ) {}

  setQuantity(quantity: number) {
    this.quantity = quantity;
    return this.quantity;
  }
}
