/**
 * Interface que representa a estrutura completa de um token JWT
 * @interface Token
 */
export interface Token {
    /** Cabeçalho do token contendo algoritmo e tipo */
    header: Header,
    /** Payload do token contendo as claims */
    payload: Payload,
    /** Assinatura do token */
    signature: string
}

/**
 * Interface que representa o cabeçalho de um token JWT
 * @interface Header
 */
export interface Header {
    /** Algoritmo usado para assinar o token */
    alg: string,
    /** Tipo do token */
    typ: string
}

/**
 * Interface que representa o payload de um token JWT
 * @interface Payload
 */
export interface Payload {
    /** Identificador único do token JSON */
    jti: string,    //jsonTokenIdentifier
    /** Emissor do token */
    iss: string,    //issuer
    /** Data/hora de emissão do token (timestamp Unix) */
    iat: number,    //issuedAt
    /** Token não é válido antes desta data/hora (timestamp Unix) */
    nbf: number,    //notBefore (Não Antes)
    /** Data/hora de expiração do token (timestamp Unix) */
    exp: number,    //expiration
    /** Assunto do token (geralmente ID do usuário) */
    sub: string,    //Subject
    /** Audiência destinatária do token */
    aud: string     //Audience
}