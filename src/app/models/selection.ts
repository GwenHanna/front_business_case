export class selection {
  constructor(
    public name: string,
    public serviceTypes: string,
    public priceTotal: number,
    public quantity: number
  ) {}

  setQuantity(quantity: number) {
    this.quantity = quantity;
    return this.quantity;
  }
}
