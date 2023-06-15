/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Controller, Post,Body, Get } from '@nestjs/common';
import { ProductsServices } from './products.services';

@Controller('products')
export class ProductsController {
    constructor(private readonly productServices : ProductsServices) {}
    @Post()
    async addProduct(@Body('title') prodTitle : string, @Body('description') proddescription : string, @Body('price') prodPrice : number,  ) : Promise<any> {
        
       const generatediD = await this.productServices.insertProduct( prodTitle, proddescription, prodPrice)

       return {id : generatediD}
    }

    @Get()
    async getProducts() : Promise<any> {
       return this.productServices.getProducts();
    }

}
