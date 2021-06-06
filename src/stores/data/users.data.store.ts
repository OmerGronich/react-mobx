import { RootStore } from "../root.store";
import { IStore }    from "../types/store.interface";


export class UsersStore implements IStore {

	currentUser: { id: number };

	constructor(public root: RootStore) {
	}

	async init() {

	}
}
