import { Filter, FilterFreeForm } from './filter';
import { Expand } from './expand';
import { Utils } from '../utils/utils';
import { Select } from './select';
import { Orderby } from './orderby';

export class QueryOptions {
  private _select: Select;
  private _filter: Filter;
  private _expand: Expand;
  private _orderby: Orderby;
  private _skip: number;
  private _top: number;
  private _count: boolean;
  private _search: string;

  select(select: Select): QueryOptions {
    Utils.requireNullOrUndefined(this._select, 'select');
    Utils.requireNotNullNorUndefined(select, 'select');
    Utils.requireNotEmpty(select, 'select');
    this._select = select;
    return this;
  }

  filter(filter: Filter | FilterFreeForm): QueryOptions {
    Utils.requireNullOrUndefined(this._filter, 'filter');
    Utils.requireNotNullNorUndefined(filter, 'filter');
    Utils.requireNotEmpty(filter, 'filter');
    this._filter = filter;
    return this;
  }

  expand(expand: Expand): QueryOptions {
    Utils.requireNullOrUndefined(this._expand, 'expand');
    Utils.requireNotNullNorUndefined(expand, 'expand');
    Utils.requireNotEmpty(expand, 'expand');
    this._expand = expand;
    return this;
  }

  orderby(orderby: Orderby): QueryOptions {
    Utils.requireNullOrUndefined(this._orderby, 'orderby');
    Utils.requireNotNullNorUndefined(orderby, 'orderby');
    Utils.requireNotEmpty(orderby, 'orderby');
    this._orderby = orderby;
    return this;
  }

  skip(skip: number): QueryOptions {
    Utils.requireNullOrUndefined(this._skip, 'skip');
    Utils.requireNotNullNorUndefined(skip, 'skip');
    Utils.requireNotNegative(skip, 'skip');
    this._skip = skip;
    return this;
  }

  top(top: number): QueryOptions {
    Utils.requireNullOrUndefined(this._top, 'top');
    Utils.requireNotNullNorUndefined(top, 'top');
    Utils.requireNotNegative(top, 'top');
    this._top = top;
    return this;
  }

  count(count: boolean): QueryOptions {
    Utils.requireNullOrUndefined(this._count, 'count');
    Utils.requireNotNullNorUndefined(count, 'count');
    this._count = count;
    return this;
  }

  search(search: string): QueryOptions {
    Utils.requireNullOrUndefined(this._search, 'search');
    Utils.requireNotUndefined(search, 'search');
    this._search = search;
    return this;
  }

  toString(): string {
    // query options
    let queryOptions = '';

    // add select
    if (!Utils.isNullOrUndefined(this._select)) {
      queryOptions += '$select=' + this._select;
    }

    // add filter
    if (!Utils.isNullOrUndefined(this._filter)) {
      if (queryOptions.length) {
        queryOptions += '&';
      }
      queryOptions += '$filter=' + this._filter;
    }

    // add expand
    if (!Utils.isNullOrUndefined(this._expand)) {
      if (queryOptions.length) {
        queryOptions += '&';
      }
      queryOptions += '$expand=' + this._expand;
    }

    // add orderby
    if (!Utils.isNullOrUndefined(this._orderby)) {
      if (queryOptions.length) {
        queryOptions += '&';
      }
      queryOptions += '$orderby=' + this._orderby;
    }

    // add skip
    if (!Utils.isNullOrUndefined(this._skip)) {
      if (queryOptions.length) {
        queryOptions += '&';
      }
      queryOptions += '$skip=' + this._skip;
    }

    // add top
    if (!Utils.isNullOrUndefined(this._top)) {
      if (queryOptions.length) {
        queryOptions += '&';
      }
      queryOptions += '$top=' + this._top;
    }

    // add count
    if (!Utils.isNullOrUndefined(this._count)) {
      if (queryOptions.length) {
        queryOptions += '&';
      }
      queryOptions += '$count=' + this._count;
    }

    // add search
    if (!Utils.isNullOrUndefined(this._search)) {
      if (queryOptions.length) {
        queryOptions += '&';
      }
      queryOptions += '$search=' + this._search;
    }

    return encodeURIComponent(queryOptions);
  }
}
