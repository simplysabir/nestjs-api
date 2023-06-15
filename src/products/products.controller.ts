/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Controller, Post,Body } from '@nestjs/common';
import { ProductsServices } from './products.services';

@Controller('products')
export class ProductsController {
    constructor(private readonly productServices : ProductsServices) {}
    @Post()
    addProduct(@Body('title') prodTitle : string, @Body('description') proddescription : string, @Body('price') prodPrice : number,  ) : any {
        const prodId = new Date().toString();
       const generatediD = this.productServices.insertProduct( prodTitle, proddescription, prodPrice)

       return {id : generatediD}
    }

}
