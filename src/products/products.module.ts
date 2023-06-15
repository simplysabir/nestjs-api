/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsServices } from "./products.services";
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from "./products.model";

@Module({
  imports: [MongooseModule.forFeature([{name : 'Product', schema : ProductSchema}])],
  controllers: [ProductsController],
  providers : [ProductsServices],
})
export class ProductsModule {}