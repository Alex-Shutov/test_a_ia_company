import { CatalogStore } from "./CatalogStore";

export class RootStore{
    readonly catalog = new CatalogStore()
}