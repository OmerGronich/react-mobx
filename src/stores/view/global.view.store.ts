import { IStore } from '../types/store.interface'
import { RootStore } from '../root.store'
import { makeAutoObservable, makeObservable, observable } from 'mobx'

export enum TodoFilterOptions {
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
}

export class GlobalViewStore implements IStore {
  loading: boolean
  currentFilter: TodoFilterOptions
  currentSearch: string = ''

  constructor(public root: RootStore) {
    this.init()
    makeAutoObservable(this)
  }

  init() {
    this.loading = false
    this.currentFilter = TodoFilterOptions.ALL
  }

  setCurrentFilter(filter: TodoFilterOptions) {
    this.currentFilter = filter
  }

  setCurrentSearch(search: string) {
    this.currentSearch = search
  }
}
