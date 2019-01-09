type Primitive = boolean | number | string | symbol | null | undefined;

type NonPrimitive = object;

type SoFunc = ((...val: any[]) => any) | any;

// 对象字面量 怎么表示?
type Obj = object;

type Value = string | number | symbol | any[] | any;

type KeyInx = string | number;

type Collection = any[] | object;

type Iteratee<T> = (value: any, key: KeyInx, collection?: any) => T;

type Many<T> = T | ReadonlyArray<T>;

type AtLeast<T> = T | Array<T>;

type PropertyName = string | number | symbol;

type NotVoid = {} | null | undefined;

type AtLeastPropertyName = PropertyName | PropertyName[];

type IterateeProperty<T> = Iteratee<T> | PropertyName;

type IterateeAtLeastProperty<T> = Iteratee<T> | AtLeastPropertyName;

type DataRow = Obj;

type DataTable = Obj[];

type MtFunction = (...args: any[]) => any;
type MtObject = { [propName: string]: any };
