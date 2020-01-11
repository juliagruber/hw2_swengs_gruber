import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {GardenerService} from '../services/gardener.service';

@Injectable({
  providedIn: 'root'
})
export class GardenerOptionsResolver implements Resolve<Observable<any>> {
  constructor(private gardenerService: GardenerService) {
  }

  resolve() {
    return this.gardenerService.retrieveGardenerOptions();
  }
}
