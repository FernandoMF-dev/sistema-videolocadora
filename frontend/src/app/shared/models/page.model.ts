export class Page<T> {
	content: T[] = [];
	last: boolean;
	totalElements: number;
	totalPages: number;
	size: number;
	number: number;
	numberOfElements: number;
	sort: string;
	first: boolean;
	pageable: {
		offset: number;
		pageNumber: number;
		pageSize: number;
		paged: boolean;
		unpaged: boolean;
		sort: {
			sorted: boolean;
			unsorted: boolean;
		}
	};
}
