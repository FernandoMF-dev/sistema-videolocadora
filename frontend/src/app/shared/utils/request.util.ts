import { HttpParams } from '@angular/common/http';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { PageListEnum } from '../enums/page-list.enum';
import { PageChangeEvent } from '../models/events/page-change.event';

export class RequestUtil {

	public static getParamsFromObject(obj: object, ignoreNull: boolean = false, ignoreUndefined: boolean = true): HttpParams {
		let params: HttpParams = new HttpParams();

		for (const key in obj) {
			if (obj.hasOwnProperty(key)) {
				const value: any = obj[key];

				if (typeof value === 'object' && value != null) {
					params = params.set(key, value.toString());
				} else if ((value !== null || !ignoreNull) && (value !== undefined || !ignoreUndefined)) {
					params = params.set(key, `${ value }`);
				}
			}
		}

		return params;
	}

	public static getPageableWithPageAndSize(page?: number, size?: number): HttpParams {
		let params: HttpParams = new HttpParams();

		if (!page) {
			page = PageListEnum.INITIAL_PAGE;
		}
		if (!size) {
			size = PageListEnum.INITIAL_ROWS;
		}

		params = params.append('page', String(page));
		params = params.append('size', String(size));
		params = params.append('sort', '');

		return params;
	}

	public static getPageableFromLazyLoadEvent(event?: LazyLoadEvent, pageable?: { sort: string }): HttpParams {
		if (!event) {
			return this.formatPageableParams(new HttpParams(), event, pageable);
		}

		let params: HttpParams = this.getPageableWithPageAndSize(event.first / event.rows, event.rows);
		params = params.set('sort', this.formatPageableSortField(event));

		return this.formatPageableParams(params, event, pageable);
	}

	public static getPageableFromPageChangeEvent(event?: PageChangeEvent, pageable?: { sort: string }): HttpParams {
		if (!event) {
			return this.formatPageableParams(new HttpParams(), null, pageable);
		}

		let params: HttpParams = this.getPageableWithPageAndSize(event.page, event.rows);
		params = params.set('sort', this.formatPageableSortField());

		return this.formatPageableParams(params, null, pageable);
	}

	private static formatPageableParams(params: HttpParams, tableEvent?: Table | LazyLoadEvent, pageable?: { sort: string }): HttpParams {
		if (!tableEvent && !!pageable && !!pageable.sort) {
			params = params.append('sort', pageable.sort);
		}

		if (!tableEvent && !pageable) {
			params = RequestUtil.getPageableWithPageAndSize();
		}

		return params;
	}

	private static formatPageableSortField(sorter?: Table | LazyLoadEvent): string {
		if (!sorter) {
			return '';
		}

		const direction = sorter.sortOrder === 1 ? 'ASC' : 'DESC';
		return !sorter.sortField ? '' : `${ sorter.sortField },${ direction }`;
	}

}
