import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionHelperService {

  private _storage: Storage;

  constructor() {
      this._storage = localStorage;
  }

  /*
  ** set value in session **
  */ 
  set(key: string, value: any) {
      this._storage.setItem(key, value);
  }

  /*
  ** get value from session **
  */ 
  get(key: string) {
      const item = this._storage.getItem(key);
      if (!item || item === 'undefined' || item === null) { return null };
      return (item);
  }  

  /*
  ** remove storage from session **
  */ 
  removeItem(key: string) {
    this._storage.removeItem(key);
  }
}
