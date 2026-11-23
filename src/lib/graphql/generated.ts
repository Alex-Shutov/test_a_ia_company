import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type Color = {
  __typename?: 'Color';
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  images: Array<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  price: Scalars['String']['output'];
  sizes: Array<Scalars['Int']['output']>;
};

export type Product = {
  __typename?: 'Product';
  brand: Scalars['String']['output'];
  categoryId: Scalars['Int']['output'];
  colors: Array<Color>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  category?: Maybe<Category>;
  product?: Maybe<Product>;
  productColor?: Maybe<Color>;
  products: Array<Product>;
  size?: Maybe<Size>;
  sizes: Array<Size>;
};


export type QueryCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryProductArgs = {
  id: Scalars['Int']['input'];
};


export type QueryProductColorArgs = {
  colorId: Scalars['Int']['input'];
  productId: Scalars['Int']['input'];
};


export type QuerySizeArgs = {
  id: Scalars['Int']['input'];
};

export type Size = {
  __typename?: 'Size';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  number: Scalars['Int']['output'];
};

/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type GetProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsQuery = { products: Array<{ id: number, name: string, colors: Array<{ id: number, images: Array<string>, price: string, sizes: Array<number> }> }> };


export const GetProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"colors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"sizes"}}]}}]}}]}}]} as unknown as DocumentNode<GetProductsQuery, GetProductsQueryVariables>;