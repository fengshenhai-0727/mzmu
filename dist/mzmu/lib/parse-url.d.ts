export declare function parseURL(url?: string): {
    source: string;
    protocol: string;
    host: string;
    hostname: string;
    port: string;
    origin: string;
    pathname: string;
    path: string;
    search: string;
    query: {};
    hash: string;
    username: string;
    password: string;
    ext: any;
    protocolname: any;
    rebuild: any;
    reform: any;
};
export declare function rebuildURL(oldurl: any, opts: any): any;