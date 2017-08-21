import { Utils } from './utils';
import { QuotedString } from '../odata-query/quoted-string';

describe('Utils', () => {
  const fieldName = 'fieldName';

  it('test requireNullOrUndefined', () => {
    let fieldValue: any;
    Utils.requireNullOrUndefined(fieldValue, fieldName);
    fieldValue = null;
    Utils.requireNullOrUndefined(fieldValue, fieldName);
    fieldValue = {};
    expect(() => Utils.requireNullOrUndefined(fieldValue, fieldName)).toThrowError(fieldName + ' is not null nor undefined');
  });

  it('test requireNotEmpty', () => {
    let fieldValue: any;
    expect(() => Utils.requireNotEmpty(fieldValue, fieldName)).toThrowError(fieldName + ' is empty');
    fieldValue = null;
    expect(() => Utils.requireNotEmpty(fieldValue, fieldName)).toThrowError(fieldName + ' is empty');
    fieldValue = '';
    expect(() => Utils.requireNotEmpty(fieldValue, fieldName)).toThrowError(fieldName + ' is empty');
    fieldValue = { isEmpty(): boolean { return true; } };
    expect(() => Utils.requireNotEmpty(fieldValue, fieldName)).toThrowError(fieldName + ' is empty');
    fieldValue = { isEmpty(): boolean { return; } };
    Utils.requireNotEmpty(fieldValue, fieldName);
    fieldValue = { isEmpty(): boolean { return null; } };
    Utils.requireNotEmpty(fieldValue, fieldName);
    fieldValue = {};
    Utils.requireNotEmpty(fieldValue, fieldName);
  });

  it('test appendSegment', () => {
    let path: string;
    let segment: string;
    expect(() => Utils.appendSegment(path, segment)).toThrowError('path is undefined');
    path = '';
    expect(() => Utils.appendSegment(path, segment)).toThrowError('segment is undefined');
    path = null;
    expect(() => Utils.appendSegment(path, segment)).toThrowError('path is null');
    path = '';
    segment = null;
    expect(() => Utils.appendSegment(path, segment)).toThrowError('segment is null');
    path = '';
    segment = '';
    expect(Utils.appendSegment(path, segment)).toEqual('/');
    path = 'p';
    segment = 's';
    expect(Utils.appendSegment(path, segment)).toEqual('p/s');
    path = 'p/';
    segment = 's';
    expect(Utils.appendSegment(path, segment)).toEqual('p/s');
    path = 'p/';
    segment = '/s';
    expect(Utils.appendSegment(path, segment)).toEqual('p//s');
  });

  it('test removeEndingSeparator', () => {
    let value: string;
    expect(() => Utils.removeEndingSeparator(value)).toThrowError('value is undefined');
    value = null;
    expect(() => Utils.removeEndingSeparator(value)).toThrowError('value is null');
    value = '';
    expect(Utils.removeEndingSeparator(value)).toEqual('');
    value = 'v';
    expect(Utils.removeEndingSeparator(value)).toEqual('v');
    value = '/';
    expect(Utils.removeEndingSeparator(value)).toEqual('');
    value = 'v/';
    expect(Utils.removeEndingSeparator(value)).toEqual('v');
  });

  it('test getValueURI', () => {
    let value: any;
    let encodeURI: any;
    expect(() => Utils.getValueURI(value, encodeURI)).toThrowError('value is undefined');
    expect(() => Utils.getValueURI('value', encodeURI)).toThrowError('encodeURI is undefined');
    value = null;
    encodeURI = null;
    expect(() => Utils.getValueURI(value, encodeURI)).toThrowError('value is null');
    expect(() => Utils.getValueURI('value', encodeURI)).toThrowError('encodeURI is null');
    value = true;
    expect(Utils.getValueURI(value, true)).toEqual(true);
    expect(Utils.getValueURI(value, false)).toEqual(true);
    value = 10;
    expect(Utils.getValueURI(value, true)).toEqual(10);
    expect(Utils.getValueURI(value, false)).toEqual(10);
    value = 'v';
    expect(Utils.getValueURI(value, true)).toEqual('v');
    expect(Utils.getValueURI(value, false)).toEqual('v');
    value = new Date();
    expect(Utils.getValueURI(value.toISOString(), true)).toEqual(encodeURIComponent(value.toISOString()));
    expect(Utils.getValueURI(value.toISOString(), false)).toEqual(value.toISOString());
    expect(Utils.getValueURI(value.toLocaleString(), true)).toEqual(encodeURIComponent(value.toLocaleString()));
    expect(Utils.getValueURI(value.toLocaleString(), false)).toEqual(value.toLocaleString());
    value = new QuotedString('O\'Reilly/');
    expect(Utils.getValueURI(value, true)).toEqual('\'O\'\'Reilly%2F\'');
    expect(Utils.getValueURI(value, false)).toEqual('\'O\'\'Reilly/\'');
    value = '2017-01-01';
    expect(Utils.getValueURI(value, true)).toEqual('2017-01-01');
    expect(Utils.getValueURI(value, false)).toEqual('2017-01-01');
    value = '2017/01/01';
    expect(Utils.getValueURI(value, true)).toEqual('2017%2F01%2F01');
    expect(Utils.getValueURI(value, false)).toEqual('2017/01/01');
  });
});
