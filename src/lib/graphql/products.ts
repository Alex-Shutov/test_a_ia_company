import { print } from "graphql";

import { request } from "./client";
import { GetProductDetailsDocument, GetProductsDocument } from "./generated";
import type { GetProductDetailsQuery, GetProductsQuery } from "./generated";

export async function fetchProducts() {
    const data = await request<GetProductsQuery>(
        print(GetProductsDocument),
    );

    return data.products;
}

export async function fetchProduct(id:number){
    const data = await request<GetProductDetailsQuery>(print(GetProductDetailsDocument),{id})
    return data

}