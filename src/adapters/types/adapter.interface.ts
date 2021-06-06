export interface IAdapter {

	getItems<T>(): Promise<T>;
}
