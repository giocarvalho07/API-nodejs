import { dbQuery, dbQueryFirst } from "../services/db";

export type Product = {
    id: number;
    name: string;
    price: number;
}

export const insertProduct = async (product: Product) => {
    await dbQuery(`INSERT INTO product (name, price) VALUES(?, ?)`, [product.name, product.price])
    let retorno = await dbQuery(`SELECT seq AS Id From sqlite_sequence WHERE name= 'product'`);
    return retorno[0].Id as number | undefined;
}

const listProducts = async () => {
    const retorno = await dbQuery(`SELECT * FROM product`);
    return retorno as Product[];
}

const getProducts = async (id: number) => {
    const retorno = await dbQueryFirst(`SELECT * FROM product WHERE id=?`, [id]);
    return retorno as Product | undefined;
}

const deleteProducts = async (id: number) => {
    await dbQueryFirst(`DELETE FROM product WHERE id=?`, [id]);
}

const updateProducts = async (product: Product) => {
    await dbQuery(`UPDATE product SET name =?, price =? WHERE id=?`, [product.name, product.price, product.id]);
    return getProducts(product.id);
}

export const productModel = {
    insertProduct,
    listProducts,
    getProducts,
    deleteProducts,
    updateProducts
}