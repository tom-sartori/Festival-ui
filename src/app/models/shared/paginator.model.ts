export class Paginator {

	constructor(
		public data: any[],
		public page: number,
		public countPerPage: number,
		public prePage: number | null,
		public nextPage: number | null,
		public total: number,
		public totalPages: number
	) { }

	public reset(): void {
		this.data = [];
		this.page = 1;
		this.prePage = null;
		this.nextPage = 2;
		this.total = 0;
		this.totalPages = 0;
	}
}
