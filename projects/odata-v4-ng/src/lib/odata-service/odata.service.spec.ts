import type { Mock } from "vitest";
import { HttpClient, HttpHeaders, HttpResponse, provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { ODataQuery } from '../odata-query/odata-query';
import { ODataResponse } from '../odata-response/odata-response';
import { HttpOptions, HttpOptionsI } from './http-options';
import { ODataService } from './odata.service';
import { provideHttpClientTesting } from "@angular/common/http/testing";


describe('OdataService', () => {
    let odataService: ODataService;
    let httpClient: HttpClient;
    let odataQuery: ODataQuery;
    let spy: Mock;

    const body: any = { test: 'test' };
    const etag = 'etag';
    const SERVICE_ROOT = 'serviceRoot';
    const HTTP_OPTIONS_I: HttpOptionsI = { headers: new HttpHeaders({ header: 'value' }) };
    const HTTP_OPTIONS_I_RES: HttpOptions = new HttpOptions(new HttpHeaders({ header: 'value' }), 'response', undefined, undefined, undefined, 'text', undefined);
    const HTTP_OPTIONS_I_RES_ETAG: HttpOptions = new HttpOptions(new HttpHeaders({ header: 'value', etag: 'etag' }), 'response', undefined, undefined, undefined, 'text', undefined);
    const HTTP_OPTIONS: HttpOptions = new HttpOptions(undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    const HTTP_OPTIONS_ETAG: HttpOptions = new HttpOptions(new HttpHeaders({ etag: 'etag' }), undefined, undefined, undefined, undefined, undefined, undefined);
    const odataResponse: Observable<ODataResponse> = of(new ODataResponse(new HttpResponse()));

    function expectEquals(httpOptions1: HttpOptions, httpOptions2: HttpOptions): void {
        // both httpOptions are undefined
        if (!httpOptions1 || !httpOptions2) {
            expect(httpOptions1).toEqual(httpOptions2);
            return;
        }

        // check same keys
        expect(Object.keys(httpOptions1)).toEqual(Object.keys(httpOptions2));

        // check same headers
        if (!httpOptions1.headers || !httpOptions2.headers) {
            expect(httpOptions1).toEqual(httpOptions2);
        }
        else {
            expect(httpOptions1.headers.get('header')).toEqual(httpOptions2.headers.get('header'));
        }

        // check other keys
        expect(httpOptions1.observe).toEqual(httpOptions2.observe);
        expect(httpOptions1.params).toEqual(httpOptions2.params);
        expect(httpOptions1.reportProgress).toEqual(httpOptions2.reportProgress);
        expect(httpOptions1.responseType).toEqual(httpOptions2.responseType);
        expect(httpOptions1.withCredentials).toEqual(httpOptions2.withCredentials);
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [ODataService, provideHttpClient(withXhr(), withInterceptorsFromDi()), provideHttpClientTesting()]
        });

        odataService = TestBed.inject(ODataService);
        httpClient = TestBed.inject(HttpClient);
        odataQuery = new ODataQuery(odataService, SERVICE_ROOT);
    });

    it('should be created', () => {
        expect(odataService).toBeTruthy();
    });

    it('test get', () => {
        spy = vi.spyOn(httpClient, 'get').mockReturnValue(odataResponse);

        odataService.get(odataQuery);
        expect(vi.mocked(spy).mock.lastCall[0]).toEqual(SERVICE_ROOT);
        expectEquals(vi.mocked(spy).mock.lastCall[1], new HttpOptions());

        odataService.get(odataQuery, HTTP_OPTIONS_I);
        expect(vi.mocked(spy).mock.lastCall[0]).toEqual(SERVICE_ROOT);
        expectEquals(vi.mocked(spy).mock.lastCall[1], HTTP_OPTIONS_I_RES);

        odataService.get(odataQuery, HTTP_OPTIONS);
        expect(vi.mocked(spy).mock.lastCall[0]).toEqual(SERVICE_ROOT);
        expectEquals(vi.mocked(spy).mock.lastCall[1], HTTP_OPTIONS);
    });

    it('test post', () => {
        spy = vi.spyOn(httpClient, 'post').mockReturnValue(odataResponse);

        odataService.post(odataQuery, body);
        expect(vi.mocked(spy).mock.lastCall[0]).toEqual(SERVICE_ROOT);
        expect(vi.mocked(spy).mock.lastCall[1]).toEqual(body);
        expectEquals(vi.mocked(spy).mock.lastCall[2], new HttpOptions());

        odataService.post(odataQuery, body, HTTP_OPTIONS_I);
        expect(vi.mocked(spy).mock.lastCall[0]).toEqual(SERVICE_ROOT);
        expect(vi.mocked(spy).mock.lastCall[1]).toEqual(body);
        expectEquals(vi.mocked(spy).mock.lastCall[2], HTTP_OPTIONS_I_RES);

        odataService.post(odataQuery, body, HTTP_OPTIONS);
        expect(vi.mocked(spy).mock.lastCall[0]).toEqual(SERVICE_ROOT);
        expect(vi.mocked(spy).mock.lastCall[1]).toEqual(body);
        expectEquals(vi.mocked(spy).mock.lastCall[2], HTTP_OPTIONS);
    });

    it('test patch', () => {
        spy = vi.spyOn(httpClient, 'patch').mockReturnValue(odataResponse);

        odataService.patch(odataQuery, body);
        expect(vi.mocked(spy).mock.lastCall[0]).toEqual(SERVICE_ROOT);
        expect(vi.mocked(spy).mock.lastCall[1]).toEqual(body);
        expectEquals(vi.mocked(spy).mock.lastCall[2], new HttpOptions());

        odataService.patch(odataQuery, body, etag);
        expect(vi.mocked(spy).mock.lastCall[0]).toEqual(SERVICE_ROOT);
        expect(vi.mocked(spy).mock.lastCall[1]).toEqual(body);
        expectEquals(vi.mocked(spy).mock.lastCall[2], HTTP_OPTIONS_ETAG);

        odataService.patch(odataQuery, body, etag, HTTP_OPTIONS_I);
        expect(vi.mocked(spy).mock.lastCall[0]).toEqual(SERVICE_ROOT);
        expect(vi.mocked(spy).mock.lastCall[1]).toEqual(body);
        expectEquals(vi.mocked(spy).mock.lastCall[2], HTTP_OPTIONS_I_RES_ETAG);

        odataService.patch(odataQuery, body, etag, HTTP_OPTIONS);
        expect(vi.mocked(spy).mock.lastCall[0]).toEqual(SERVICE_ROOT);
        expect(vi.mocked(spy).mock.lastCall[1]).toEqual(body);
        expectEquals(vi.mocked(spy).mock.lastCall[2], HTTP_OPTIONS_ETAG);
    });

    it('test put', () => {
        spy = vi.spyOn(httpClient, 'put').mockReturnValue(odataResponse);

        odataService.put(odataQuery, body);
        expect(vi.mocked(spy).mock.lastCall[0]).toEqual(SERVICE_ROOT);
        expect(vi.mocked(spy).mock.lastCall[1]).toEqual(body);
        expectEquals(vi.mocked(spy).mock.lastCall[2], new HttpOptions());

        odataService.put(odataQuery, body, etag);
        expect(vi.mocked(spy).mock.lastCall[0]).toEqual(SERVICE_ROOT);
        expect(vi.mocked(spy).mock.lastCall[1]).toEqual(body);
        expectEquals(vi.mocked(spy).mock.lastCall[2], HTTP_OPTIONS_ETAG);

        odataService.put(odataQuery, body, etag, HTTP_OPTIONS_I);
        expect(vi.mocked(spy).mock.lastCall[0]).toEqual(SERVICE_ROOT);
        expect(vi.mocked(spy).mock.lastCall[1]).toEqual(body);
        expectEquals(vi.mocked(spy).mock.lastCall[2], HTTP_OPTIONS_I_RES_ETAG);

        odataService.put(odataQuery, body, etag, HTTP_OPTIONS);
        expect(vi.mocked(spy).mock.lastCall[0]).toEqual(SERVICE_ROOT);
        expect(vi.mocked(spy).mock.lastCall[1]).toEqual(body);
        expectEquals(vi.mocked(spy).mock.lastCall[2], HTTP_OPTIONS_ETAG);
    });

    it('test delete', () => {
        spy = vi.spyOn(httpClient, 'delete').mockReturnValue(odataResponse);

        odataService.delete(odataQuery);
        expect(vi.mocked(spy).mock.lastCall[0]).toEqual(SERVICE_ROOT);
        expectEquals(vi.mocked(spy).mock.lastCall[1], new HttpOptions());

        odataService.delete(odataQuery, etag);
        expect(vi.mocked(spy).mock.lastCall[0]).toEqual(SERVICE_ROOT);
        expectEquals(vi.mocked(spy).mock.lastCall[1], HTTP_OPTIONS_ETAG);

        odataService.delete(odataQuery, etag, HTTP_OPTIONS_I);
        expect(vi.mocked(spy).mock.lastCall[0]).toEqual(SERVICE_ROOT);
        expectEquals(vi.mocked(spy).mock.lastCall[1], HTTP_OPTIONS_I_RES_ETAG);

        odataService.delete(odataQuery, etag, HTTP_OPTIONS);
        expect(vi.mocked(spy).mock.lastCall[0]).toEqual(SERVICE_ROOT);
        expectEquals(vi.mocked(spy).mock.lastCall[1], HTTP_OPTIONS_ETAG);
    });
});
