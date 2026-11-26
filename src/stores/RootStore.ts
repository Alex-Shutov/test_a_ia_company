import { CartSotre } from "./CartSotre";
import { CatalogStore } from "./CatalogStore";

export class RootStore{
    readonly catalog = new CatalogStore()
    readonly cart = new CartSotre()
}