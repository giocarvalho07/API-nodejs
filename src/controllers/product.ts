import { Request, Response } from "express";
import { badRequest, internalServerError, notFound, ok, validateNumber } from "../services/util";
import { Product, productModel } from "../models/product";

const insertProduct = (req: Request, res: Response) => {
    {
        const product = req.body;
        if(!product)
            return badRequest(res, "Produto inválido");

        if(!product.name)
            return badRequest(res, "Informe o nome do produto");

        if(!validateNumber(product.price))
            return badRequest(res, "informe o preço do produto");
    }

    const product = req.body as Product;
    productModel.insertProduct(product)
        .then(id => {
            res.json(product)
        })
        .catch(err => internalServerError(res, err));
}

const listProducts = (req: Request, res: Response) => {
    productModel.listProducts()
        .then(products => {
            res.json(products)
        })
        .catch(err => internalServerError(res, err));
}

const getProducts = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, "id inválido");
    }
    productModel.getProducts(id)
        .then((product) => {
            if(product)
                return res.json(product);
            else 
                return notFound(res);     
        })
        .catch(err => internalServerError(res, err));
}

const deleteProducts = async(req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, "id inválido");

            const productSaved = await productModel.getProducts(id);
            if(!productSaved)
                return notFound(res);   
    }
    productModel.getProducts(id)
        .then(() => ok(res))
        .catch(err => internalServerError(res, err));
}

const updateProducts = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, "id inválido");

        const product = req.body;
        if(!product)
            return badRequest(res, "Produto inválido");
        if(!product.name)
            return badRequest(res, "Informe o nome do produto");
        if(!validateNumber(product.price))
            return badRequest(res, "informe o preço do produto");

        const productSaved = await productModel.getProducts(id);
        if(!productSaved)
            return notFound(res);    

    }

    const product = req.body as Product;
    productModel.updateProducts(product)
        .then(product => {
            res.json(product)
        })
        .catch(err => internalServerError(res, err));
}

export const productController = {
    insertProduct,
    listProducts,
    getProducts,
    deleteProducts,
    updateProducts
}


