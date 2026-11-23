import { print } from "graphql";

import { request } from "./client";
import { GetProductsDocument } from "./generated";
import type { GetProductsQuery } from "./generated";

export async function fetchProducts() {
    const data = await request<GetProductsQuery>(
        print(GetProductsDocument),
    );

    return data.products;
}