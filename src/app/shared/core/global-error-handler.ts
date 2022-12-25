import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MessageBox } from '../components/message-box/message-box.component';
import { Message } from '../models/message/message';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private zone: NgZone
  ) { }

  handleError(error: any) {
    // Check if it's an error from an HTTP response
    // if (!(error instanceof HttpErrorResponse)) {
    //     error = error.rejection; // get the error object
    // }
    if (error) {
      if (!environment.production) {
        this.zone.run(() => {
          MessageBox.information(new Message(null, { content: `[YÊU CẦU DEV SỬA NGAY]: ${error?.message}` }))
        });
      }

      console.error('Error from global error handler', error);
    }
  }
}
