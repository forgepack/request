/**
 * Interface representing the complete structure of a JWT token
 * @interface Token
 */
export interface Token {
    /** Token header containing algorithm and type */
    header: Header,
    /** Token payload containing the claims */
    payload: Payload,
    /** Token signature */
    signature: string
}

/**
 * Interface representing a JWT token header
 * @interface Header
 */
export interface Header {
    /** Algorithm used to sign the token */
    alg: string,
    /** Token type */
    typ: string
}

/**
 * Interface representing a JWT token payload
 * @interface Payload
 */
export interface Payload {
    /** JSON Token Identifier unique identifier */
    jti: string,    //jsonTokenIdentifier
    /** Token issuer */
    iss: string,    //issuer
    /** Token issue date/time (Unix timestamp) */
    iat: number,    //issuedAt
    /** Token not valid before this date/time (Unix timestamp) */
    nbf: number,    //notBefore
    /** Token expiration date/time (Unix timestamp) */
    exp: number,    //expiration
    /** Token subject (usually user ID) */
    sub: string,    //Subject
    /** Token intended audience */
    aud: string     //Audience
}