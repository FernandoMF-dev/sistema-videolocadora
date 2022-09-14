import { HttpParams } from '@angular/common/http';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { PageListEnum } from '../enums/page-list.enum';

export class RequestUtil {

	public static mapFieldRequestParamFromObjectArray(tags: any[], param: string = 'ids', key: string = 'id'): string {
		return `${ param }=${ tags.map(element => element[key]).join() }`;
	}

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

	public static getParams(tableEvent?: Table | LazyLoadEvent, pageable?: { sort: string }) {
		if (tableEvent == null) {
			return this.formatParams(new HttpParams(), tableEvent, pageable);
		}

		if (tableEvent instanceof Table) {
			return this.getParamsFromTable(tableEvent, pageable);
		}

		return this.getParamsFromLazyLoadEvent(tableEvent, pageable);
	}

	public static getParamsFromTable(table?: Table, pageable?: { sort: string }): HttpParams {
		if (table == null) {
			return this.formatParams(new HttpParams(), table, pageable);
		}

		let params: HttpParams = new HttpParams();
		const direction = table.sortOrder === 1 ? 'ASC' : 'DESC';

		params = params.append('page', Math.round(table.first / table.rows).toString());
		params = params.append('size', table.rows == null ? PageListEnum.INITIAL_ROWS.toString() : table.rows.toString());
		params = params.append('sort', table.sortField == null ? '' : `${ table.sortField },${ direction }`);

		return this.formatParams(params, table, pageable);
	}

	public static getParamsFromLazyLoadEvent(event?: LazyLoadEvent, pageable?: { sort: string }): HttpParams {
		if (!event) {
			return this.formatParams(new HttpParams(), event, pageable);
		}

		let params: HttpParams = this.getParamsWithPageAndSize(event.first / event.rows, event.rows);
		params = params.set('sort', this.formatSortField(event));

		return this.formatParams(params, event, pageable);
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
