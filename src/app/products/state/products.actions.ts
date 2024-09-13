import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../product.model';

//Actions are important to use since it will avoid Typos error in the application.
export const ProductsPageActions = createActionGroup({
  source: 'Products Page',  // Source is from Product Page
  events: {
    'Toggle Show Product Code': emptyProps(),  // 'Toggle Show Product Code' is Action Events raised from Product Page
    'Load Products': emptyProps(),    // emptyProps() is just a placeholder when we don't have any additional propoerty to pass on.
    'Add Product': props<{ product: Product }>(), //props is a property which has metadata called 'product'
    'Update Product': props<{ product: Product }>(),
    'Delete Product': props<{ id: number }>(),
  },
});

export const ProductsAPIActions = createActionGroup({
  source: 'Products API',
  events: {
    'Products Loaded Success': props<{ products: Product[] }>(),
    'Products Loaded Fail': props<{ message: string }>(),
    'Product Added Success': props<{ product: Product }>(),
    'Product Added Fail': props<{ message: string }>(),
    'Product Updated Success': props<{ product: Product }>(),
    'Product Updated Fail': props<{ message: string }>(),
    'Product Deleted Success': props<{ id: number }>(),
    'Product Deleted Fail': props<{ message: string }>(),
  },
});
