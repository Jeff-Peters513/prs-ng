import { Product } from './product.class';
import { Request } from 'src/app/model/request.class';

export class LineItem {
    id: number;
    request: Request;
    product: Product;
    quantity: number = 0;

    constructor(id: number = 0, request: Request = new Request(),
        product: Product = new Product(), quantity: number = 0) {
        this.id = id;
        this.request = request;
        this.product = product;
        this.quantity = quantity;
    }

}
