import { IStore } from "../../types/store.interface";

export interface IDataStore extends IStore {
	loadItems: () => Promise<void>;
}
