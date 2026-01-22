export interface Token {
    header: {
        alg: string;
        typ: string;
    };
    payload: {
        jti: string;
        iss: string;
        iat: string;
        nbf: string;
        exp: string;
        sub: string;
        aud: string;
    };
    signature: string;
}
export interface Header {
    alg: string;
    typ: string;
}
export interface Payload {
    jti: string;
    iss: string;
    iat: string;
    nbf: string;
    exp: string;
    sub: string;
    aud: string;
}
export declare const initialHeader: Header;
export declare const initialPayload: Payload;
//# sourceMappingURL=token.d.ts.map