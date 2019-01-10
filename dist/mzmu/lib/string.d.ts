export declare function __stringFormat(str: string, format: any): string;
interface NumberFormatOptions {
    thousands?: number;
    delimiter?: string;
    unit?: string;
    scaler?: number;
    math?: 'round' | 'floor' | 'ceil';
    count?: number;
    len?: number;
}
export declare function __numberFormat(num: number, options: NumberFormatOptions): string;
export declare function __dateFormat(date: any, format: string): string;
export declare function __format(value: Value, format?: any | any[] | NumberFormatOptions, dateLike?: boolean): string;
export declare function __deepDecodeURIComponent(str: string): string;
export declare const __leftpad: (str: string, length: number, symbol?: string) => string;
export {};
