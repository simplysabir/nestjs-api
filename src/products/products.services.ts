/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Injectable} from "@nestjs/common";
import { Product } from "./products.model";



@Injectable()
export class ProductsServices {
    products : Product[] = [];

    insertProduct(title : string, description : string, price : number){
        const prodId = new Date().toString();
        const newProduct = new Product(prodId, title, description, price);
        this.products.push(newProduct);
        return {prodId, newProduct}
    }
}