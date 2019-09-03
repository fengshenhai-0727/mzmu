declare type Primitive = boolean | number | string | symbol | null | undefined;

declare type NonPrimitive = object;

declare type MtObject = { [propName: string]: any };

declare type SoFunc = ((val: any) => any) | any;

declare type Value = string | number | symbol | any[] | any;

declare type KeyInx = string | number;

declare type Collection = any[] | object;

declare type Iteratee<T> = (value: any, key: KeyInx, collection?: any) => T;

declare type Many<T> = T | ReadonlyArray<T>;

declare type AtLeast<T> = T | Array<T>;

declare type PropertyName = string | number | symbol;

declare type NotVoid = {} | null | undefined;

declare type AtLeastPropertyName = PropertyName | PropertyName[];

declare type IterateeProperty<T> = Iteratee<T> | PropertyName;

declare type IterateeAtLeastProperty<T> = Iteratee<T> | AtLeastPropertyName;

declare type DataRow = MtObject;

declare type DataTable = MtObject[];

declare type MtFunction = (...args: any[]) => any;

declare type FalseType = 'undefined' | 'nil' | 'false' | 'empty';


