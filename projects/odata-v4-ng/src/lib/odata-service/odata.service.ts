
import {map} from 'rxjs/operators';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ODataQuery } from '../odata-query/odata-query';
import { ODataQueryAbstract } from '../odata-query/odata-query-abstract';
import { ODataResponse } from '../odata-response/odata-response';
import { Utils } from '../utils/utils';
import { HttpOptions, HttpOptionsI } from './http-options';

@Injectable({
  providedIn: 'root'
})
export class ODataService {
  private static readonly IF_MATCH_HEADER = 'If-Match';

  constructor(private http: HttpClient) { }

  get(odataQuery: ODataQuery, httpOptions?: HttpOptionsI): Observable<ODataResponse> {
    const url: string = odataQuery.toString();
    const options: HttpOptions = this.createHttpOptions(httpOptions);
    return this.http.get(url, options).pipe(
      map(response => new ODataResponse(response)));
  }

  post(odataQuery: ODataQueryAbstract, body: any, httpOptions?: HttpOptionsI): Observable<ODataResponse> {
    const url: string = odataQuery.toString();
    const options: HttpOptions = this.createHttpOptions(httpOptions);
    return this.http.post(url, body, options).pipe(
      map(response => new ODataResponse(response)));
  }

  patch(odataQuery: ODataQuery, body: any, etag?: string, httpOptions?: HttpOptionsI): Observable<ODataResponse> {
    const url: string = odataQuery.toString();
    let options: HttpOptions = this.createHttpOptions(httpOptions);
    options = this.mergeETag(options, etag);
    return this.http.patch(url, body, options).pipe(
      map(response => new ODataResponse(response)));
  }

  put(odataQuery: ODataQuery, body: any, etag?: string, httpOptions?: HttpOptionsI): Observable<ODataResponse> {
    const url: string = odataQuery.toString();
    let options: HttpOptions = this.createHttpOptions(httpOptions);
    options = this.mergeETag(options, etag);
    return this.http.put(url, body, options).pipe(
      map(response => new ODataResponse(response)));
  }

  delete(odataQuery: ODataQuery, etag?: string, httpOptions?: HttpOptionsI): Observable<ODataResponse> {
    const url: string = odataQuery.toString();
    let options: HttpOptions = this.createHttpOptions(httpOptions);
    options = this.mergeETag(options, etag);
    return this.http.delete(url, options).pipe(
      map(response => new ODataResponse(response)));
  }

  protected createHttpOptions(httpOptions: HttpOptionsI): HttpOptions {
    if (httpOptions instanceof HttpOptions) {
      return httpOptions;
    }
    return Object.assign(new HttpOptions(), httpOptions);
  }

  protected mergeETag(httpOptions: HttpOptions, etag: string): HttpOptions {
    if (Utils.isNullOrUndefined(etag)) {
      return httpOptions;
    }
    if (Utils.isNullOrUndefined(httpOptions)) {
      httpOptions = new HttpOptions();
    }
    if (Utils.isNullOrUndefined(httpOptions.headers)) {
      httpOptions.headers = new HttpHeaders();
    }

    httpOptions.headers[ODataService.IF_MATCH_HEADER] = etag;

    return httpOptions;
  }
}
