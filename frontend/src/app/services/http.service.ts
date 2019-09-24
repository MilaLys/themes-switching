import { Injectable } from '@angular/core';
import { RequestOptions, Http, XHRBackend, RequestOptionsArgs, Response, Headers, Request } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpService extends Http {
  constructor(backend: XHRBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    if (typeof url === 'string') {
      if (!options) {
        options = {headers: new Headers()};
      }
      this.setHeaders(options);
    } else {
      this.setHeaders(url);
    }
    return super.request(url, options);
  }

  private catchErrors() {
  }

  private setHeaders(objectToSetHeadersTo: Request | RequestOptionsArgs) {
    objectToSetHeadersTo.headers.set('Header', '');
  }
}
