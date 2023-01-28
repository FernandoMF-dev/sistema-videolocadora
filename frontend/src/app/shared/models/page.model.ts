export class Page<T> {
	content: T[] = [];
	last: boolean;
	totalElements: number;
	totalPages: number;
	size: number;
	number: number;
	numberOfElements: number;
	first: boolean;
	pageable: PagePageable;
	sort: PageSort;
}

class PagePageable {
	offset: number;
	pageNumber: number;
	pageSize: number;
	paged: boolean;
	unpaged: boolean;
	sort: PageSort;
}

class PageSort {
	empty: boolean;
	sorted: boolean;
	unsorted: boolean;
}
