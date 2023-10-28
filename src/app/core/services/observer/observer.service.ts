import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root',
})
export class ObserverService {
  private _refresh$ = new Subject<void>();

  public get refresh$() {
    return this._refresh$;
  }
}
