import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {GardenService} from '../services/garden.service';

@Injectable({
  providedIn: 'root'
})
export class GardenOptionsResolver implements Resolve<Observable<any>> {
  constructor(private gardenService: GardenService) {
  }

  resolve() {
    return this.gardenService.retrieveGardenOptions();
  }
}
