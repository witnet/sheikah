/**
 * This module contains all common types for backend and frontend
 * IPC communication
 */
export interface IChan {
    /** Channel handler function */
    handler: (event: any, args: any) => string

    /** Channel id to send response to */
    replyChanId: string
}
