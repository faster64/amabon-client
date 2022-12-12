import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MessageBox } from '../components/message-box/message-box.component';
import { Message } from '../models/message/message';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(
        private zone: NgZone
    ) { }

    handleError(error: any) {
        // Check if it's an error from an HTTP response
        if (!(error instanceof HttpErrorResponse)) {
            error = error.rejection; // get the error object
        }
        this.zone.run(() => {
            MessageBox.information(new Message(null, { content: `Exception: ${error?.message}` }))
        });

        MessageBox.information(new Message(null, { content: `Exception: ${error?.message}` }));
        console.error('Error from global error handler', error);
    }
}
