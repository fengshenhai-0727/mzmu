declare type Primitive = boolean | number | string | symbol | null | undefined;

declare type NonPrimitive = object;

declare type SoFunc = ((val: any) => any) | any;

// 对象字面量 怎么表示?
declare type Obj = object;

declare type Value = string | number | symbol | any[] | any;

declare type KeyInx = string | number;

declare type Collection = any[] | object;

declare type Iteratee<T> = (value: any, key: KeyInx, collection?: any) => T;

declare type Many<T> = T | ReadonlyArray<T>;

declare type AtLeast<T> = T | Array<T>;

declare type PropertyName = string | number;

declare type NotVoid = {} | null | undefined;

declare type AtLeastPropertyName = PropertyName | PropertyName[];

declare type IterateeProperty<T> = Iteratee<T> | PropertyName;

declare type IterateeAtLeastProperty<T> = Iteratee<T> | AtLeastPropertyName;

declare type DataRow = Obj;

declare type DataTable = Obj[];

declare type MtFunction = (...args: any[]) => any;

declare type MtObject = { [propName: string]: any };
