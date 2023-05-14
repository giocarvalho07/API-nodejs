import { Router } from "express";
import { productController } from "../controllers/product";

const productRouter = Router();
productRouter.post('/', productController.insertProduct);
productRouter.get('/', productController.listProducts);
productRouter.get('/:id', productController.getProducts);
productRouter.delete('/:id', productController.deleteProducts);
productRouter.put('/:id', productController.updateProducts);

export{
    productRouter
}