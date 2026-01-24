/**
 * Interface representing a validation error message
 * @interface ErrorMessage
 */
export interface ErrorMessage {
    /** Name of the field containing the error */
    field: string,
    /** Descriptive error message */
    message: string
}