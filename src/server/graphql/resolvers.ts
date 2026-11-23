import { getCategories, getCategory, getProduct, getProductColor, getProducts, getSize, getSizes } from "@/services/api";
import { Resolvers } from "./generated";

async function resolveOrNull<T>(resolveFn: () => Promise<T>) {
    try {
        return await resolveFn()
    } catch (err) {
        if (err instanceof Error) {
            return null;
        }
        throw err
    }

}

export const resolvers: Resolvers = {
    Query: {
        sizes: () => getSizes(),
        size: (_, args) => resolveOrNull(() => getSize(args.id)),
        products: () => getProducts(),
        product: (_, { id }) => resolveOrNull(() => getProduct(id)),
        productColor: (_parendt, { colorId, productId }) => resolveOrNull(() => getProductColor(productId, colorId)),
        categories: () => getCategories(),
        category: (_, { id }) => resolveOrNull(() => getCategory(id))
    }
}

