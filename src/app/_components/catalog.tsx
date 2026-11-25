"use client"

import { useStores } from "@/stores/StoreProvider"
import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import ProductView from "./ProductView"

export default observer(function CatalogView() {
    const {catalog} = useStores()

    useEffect(()=>{
        catalog.loadProducts()
    },[catalog])

    if (catalog.status ==='idle' || catalog.status === 'loading'){
        return <p>Загружаем данные...</p>
    }

    if(catalog.products.length === 0){
        return <p>Товаров нет</p>
    }

    const products = catalog.visibleProducts
    return <section className="space-y-6">
        <label className="block">
            <span className="mb-1 block text-sm font-sans">Поиск по названию</span>
            <input type="search" className=" px-2 rounded-lg border border-zinc-50" value={catalog.search} placeholder={'Поиск'} onChange={(e)=>catalog.setSearch(e.target.value)}></input>
        </label>
        {products.length === 0 ? (
            <p className="px-2">Ничего не найдено</p>
        ): (<ul className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product)=>(
                <ProductView product={product}/>
            ))}
        </ul>)}
    </section>
})
