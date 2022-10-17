import { HttpParams } from '@angular/common/http';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { PageListEnum } from '../enums/page-list.enum';
import { PageChangeEvent } from '../models/events/page-change.event';

export class RequestUtil {

	public static getParamsWithPageAndSize(page?: number, size?: number): HttpParams {
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

	public static getParamsFromLazyLoadEvent(event?: LazyLoadEvent, pageable?: { sort: string }): HttpParams {
		if (!event) {
			return this.formatParams(new HttpParams(), event, pageable);
		}

		let params: HttpParams = this.getParamsWithPageAndSize(event.first / event.rows, event.rows);
		params = params.set('sort', this.formatSortField(event));

		return this.formatParams(params, event, pageable);
	}

	public static getParamsFromPageChangeEvent(event?: PageChangeEvent, pageable?: { sort: string }): HttpParams {
		if (!event) {
			return this.formatParams(new HttpParams(), null, pageable);
		}

		let params: HttpParams = this.getParamsWithPageAndSize(event.page, event.rows);
		params = params.set('sort', this.formatSortField());

		return this.formatParams(params, null, pageable);
	}

	private static formatParams(params: HttpParams, tableEvent?: Table | LazyLoadEvent, pageable?: { sort: string }): HttpParams {
		if (!tableEvent && !!pageable && !!pageable.sort) {
			params = params.append('sort', pageable.sort);
		}

		if (!tableEvent && !pageable) {
			params = RequestUtil.getParamsWithPageAndSize();
		}

		return params;
	}

	private static formatSortField(sorter?: Table | LazyLoadEvent): string {
		if (!sorter) {
			return '';
		}

		const direction = sorter.sortOrder === 1 ? 'ASC' : 'DESC';
		return !sorter.sortField ? '' : `${ sorter.sortField },${ direction }`;
	}

}
