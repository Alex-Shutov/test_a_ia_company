export interface Size {
    id: number;
    name: string;
    number: number;
}

export interface Category {
    id: number;
    name: string;
}
export interface Color {
    id: number;
    name: string;
    images: string[]
    price: string;
    description: string;
    sizes: number[]

}

export interface Product {
    id: number;
    name: string;
    categoryId: number;
    brand: string;
    colors: Color[]
}

export function getSizes(): Promise<Size[]>;

export function getSize(id: number): Promise<Size>;

export function getCategories(): Promise<Category[]>

export function getCategory(id: number): Promise<Category>

export function getProducts(): Promise<Product[]>
export function getProduct(id: number): Promise<Product>
export function getProductColor(productId: number, colorId: number): Promise<Color>
