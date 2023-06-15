/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Injectable} from "@nestjs/common";
import { Product } from "./products.model";
import {InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';



@Injectable()
export class ProductsServices {
    constructor(@InjectModel('Product') private readonly productModel : Model<Product>){}
    products : Product[] = [];

    async insertProduct(title : string, description : string, price : number){
        
        const newProduct = new this.productModel({title : title, description : description, price : price});
        const result = await newProduct.save();
        console.log(result);
        return result._id as unknown as string;
    }

    async getProducts(){
        const result = await this.productModel.find({}).exec();

        return result as Product[]
    }
}