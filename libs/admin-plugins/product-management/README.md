# Bavaan Product Review

A commerce plugin for [Bavaan Marketplace Platform](https://bavaan.com/) that allows customer can review product.

[![Build Status](https://travis-ci.com/bavaan/vendure-review-plugin.svg?branch=master)](#)
[![Coverage Status](https://coveralls.io/repos/github/bavaan/vendure-review-plugin/badge.svg?branch=master)](#)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](#) 

## Table of Contents

- [Bavaan Product Grid](#bavaan-product-grid)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [GraphQL Extensions](#graphql-extensions)
    - [query productGrid](#query-productgrid)
  - [Customize field](#customize-field)
  - [Admin UI Extensions](#admin-ui-extensions)
  - [Error Handling](#error-handling)
  - [License](#license)

## Installation
1. If you haven't already, create your server as described in Vendure's [official docs](https://www.vendure.io/docs/getting-started/)

2. Install the package using [npm](https://www.npmjs.com) or [yarn](https://yarnpkg.com) package manager:

```sh
npm install @bavaan/vendure-product-grid
```
```sh
yarn add @@bavaan/vendure-product-grid
```

3. In your `vendure-config.ts` file, initialize the `SocialAuthPlugin` plugin inside the `VendureConfig` object's plugin array:

```typescript
import { ProductGridPlugin } from '@bavaan/vendure-product-grid';

export const config: VendureConfig = {
    plugins: [
    AdminUiPlugin.init({
        port: 3002
        },
        app: compileUiExtensions({
         outputPath: path.join(__dirname, 'admin-ui'),
               extensions: [{
                 ProductGridPlugin.uiExtensions
               }],
               devMode: true,
         }),
    ...
       ProductGridPlugin 
    ]
}
```

## Configuration
// TODO

## GraphQL Extensions
The current version of Vendure Reviews extends the existing schema with a new mutation:

### Query Product Grid
Start the Vendure server and then in the Admin API (http://localhost:3000/ad-api) try the following query:
```SDL
query{  
  productGrid(options:{ 
    take: 10,
    skip: 0,
    filter:{
     enabled: {eq: true}
    }
    }){
    totalItems
    items{
      id
      name
      variants {
      sku
        name
        stockOnHand
      }
    }
  }
  
}
```
The result of query is filter product by variant condition.

Parameters:
* *ProductListOptions* - [Object!](https://www.vendure.io/docs/graphql-api/admin/input-types/#productlistoptions) - condition for filters.

Return type: [ProductList!](https://www.vendure.io/docs/graphql-api/admin/object-types/#productlist)

## Customize field
* product-variant
    * shippingBusinessPrice (float);
    * shippingPrice (float);
* product
    * isInStock (boolean)

## Admin UI Extensions
 Add menubar and router by config:
 ```
class ProductGridPlugin {
    static uiExtensions: AdminUiExtension = {
        extensionPath: path.join(__dirname, 'ui'),
        ngModules: [
            {
                type: 'shared' as const,
                ngModuleFileName: 'product-management-ui-extension.module.ts',
                ngModuleName: 'ProductManagementUiExtensionModule',
            },
            {
                type: 'lazy' as const,
                route: 'product-grid',
                ngModuleFileName: 'product-management-ui-lazy.module.ts',
                ngModuleName: 'ProductManagementUiLazyModule',
            },
        ],
    };
```

## Error Handling
// TODO

## License

Vendure Reviews Plugin is licensed under the [MIT](#) license.  
Copyright &copy; 2020, Bavaan Platform



 

