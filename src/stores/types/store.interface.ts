import { RootStore } from "../root.store";

export interface IStore {
	root: RootStore;
	init?: () => Promise<any>
}
