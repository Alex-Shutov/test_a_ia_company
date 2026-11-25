import { GetProductsQuery } from "@/lib/graphql/generated";
import { StoreError, StoreStatus } from "./store.types";
import { makeAutoObservable, runInAction } from "mobx";
import { fetchProducts } from "@/lib/graphql/products";
export class CatalogStore{
    products: GetProductsQuery["products"]=[];
    search: string = ''
    status: StoreStatus = 'idle'
    error: StoreError = null

    constructor(){
        makeAutoObservable(this,{},{autoBind:true})
    }

    get visibleProducts(){
       const query = this.search.trim().toLowerCase()
       return this.products.filter((product)=>{
        const mathesQuery = product.name.includes(query)
        return mathesQuery
       })
    }

     async loadProducts(){
        if(this.status === 'loading' || this.status === 'success') return;
        this.status = 'loading'  
        this.error = null
        try{
        const products = await fetchProducts()
        runInAction(()=>{
            this.products = products
            this.status = 'success'
        })
        } catch(err){
            runInAction(()=>{
                this.error = 'Данные не загружены'
                this.status = 'error'
            })
        }
    }
    setSearch(query:string){
        this.search = query    
    }


}