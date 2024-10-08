import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, exhaustMap, map, mergeMap, of } from 'rxjs';
import { ProductsService } from '../products.service';
import { ProductsAPIActions, ProductsPageActions } from './products.actions';

@Injectable()
export class ProductEffects {

  // Import/Inject below dependencies
  constructor(
    private productsService: ProductsService,
    private actions$: Actions
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(     // pipe is rxjs operator
      ofType(ProductsPageActions.loadProducts),   // ofType is NgRx operator which will be used to listen to actions dispatched from component
      exhaustMap(() =>      // merged in the output Observable only if the previous projected Observable has completed
        this.productsService.getAll().pipe(
          map((products) =>
            ProductsAPIActions.productsLoadedSuccess({ products })
          ),
          catchError((error) =>
            of(ProductsAPIActions.productsLoadedFail({ message: error }))
          )
        )
      )
    )
  );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.addProduct),
      concatMap(({ product }) =>
        this.productsService.add(product).pipe(
          map((newProduct) =>
            ProductsAPIActions.productAddedSuccess({ product: newProduct })
          ),
          catchError((error) =>
            of(ProductsAPIActions.productAddedFail({ message: error }))
          )
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.updateProduct),
      concatMap(({ product }) =>
        this.productsService.update(product).pipe(
          map(() => ProductsAPIActions.productUpdatedSuccess({ product })),
          catchError((error) =>
            of(ProductsAPIActions.productUpdatedFail({ message: error }))
          )
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.deleteProduct),
      mergeMap(({ id }) =>
        this.productsService
          .delete(id)
          .pipe(map(() => ProductsAPIActions.productDeletedSuccess({ id })))
      ),
      catchError((error) =>
        of(ProductsAPIActions.productDeletedFail({ message: error }))
      )
    )
  );
}
