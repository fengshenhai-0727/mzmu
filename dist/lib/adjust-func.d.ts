export declare const have: (...args: any[]) => void;
export declare const injector: (...args: any[]) => void;
export declare const isBaseType: (...args: any[]) => void;
export declare const isDateLike: (...args: any[]) => void;
export declare const isIf: (...args: any[]) => void;
export declare const isNotIf: (...args: any[]) => void;
export declare const ifif: (...args: any[]) => void;
export declare const args: (...args: any[]) => void;
export declare const create: (...args: any[]) => void;
export declare const compare: (...args: any[]) => void;
export declare const toStringWithType: (...args: any[]) => void;
export declare const environment: (...args: any[]) => void;
export declare const insert: (...args: any[]) => void;
export declare const flat: (...args: any[]) => void;
export declare const flatWithBracket: (...args: any[]) => void;
export declare const flatToChain: (...args: any[]) => void;
export declare const timestamp: (...args: any[]) => void;
export declare const ready: (...args: any[]) => void;
export declare const isNull: (value: any) => any;
export declare const isUndefined: (value: any) => any;
export declare const isNumeric: (value: any) => any;
export declare const isInteger: (value: any) => any;
export declare const isElement: (value: any) => any;
export declare const isDate: (value: any) => any;
export declare const isArray: (value: any) => any;
export declare const isObject: (value: any) => any;
export declare const isPlainObject: (value: any) => any;
export declare const isFunction: (value: any) => any;
export declare const isEmptyObject: (value: any) => any;
export declare const isNotExist: (value: any) => any;
export declare const isArrayLike: (value: any) => any;
export declare const randomInt: (max: number, min: number) => any;
export declare const first: (value: any[]) => any;
export declare const last: (value: any[]) => any;
export declare const unique: (value: any[]) => any;
export declare const intersect: (...values: any[]) => any;
export declare const union: (...values: any[]) => any;
export declare const minus: (...values: any[]) => any;
export declare const complement: (...values: any[]) => any;
export declare const clean: (value: any[]) => any;
export declare const indexOf: (value: any[], key: any, fromIndex?: number) => any;
export declare const groupArray: (collection: Collection, iteratee: Iteratee<any>) => any;
export declare const keys: (obj: any) => any;
export declare const vals: (obj: any) => any;
export declare const find: (collection: Collection, predicate: any) => any;
export declare const findIndex: (collection: Collection, predicate: any) => any;
export declare const prop: (obj: object, path: string) => any;
export declare const pick: (obj: object, iteratee: Iteratee<any>) => any;
export declare const bind: (func: MtFunction, context: any, ...args: any[]) => any;
export declare const bindAll: (obj: MtObject, ...keys: any[]) => any;
export declare const debounce: (func: MtFunction, ms: number) => any;
export declare const after: (time: number, func: MtFunction, context?: MtObject) => any;
export declare const trim: (value: string) => any;
export declare const concat: (arr: any[], ...values: any[]) => any;
export declare const now: () => any;
export declare const intercept: (str: string, max: number, adjust: number, symbol: string) => any;