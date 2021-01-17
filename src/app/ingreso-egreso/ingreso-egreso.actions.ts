import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

export const unsetItems = createAction('[IngresoEgreso] Unset Items');

export const setItems = createAction(
    '[IngresoEgreso] set Items',
    props<{ items: IngresoEgreso[] }>()
);
