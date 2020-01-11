import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {PlantService} from '../services/plant.service';

@Injectable({
  providedIn: 'root'
})
export class PlantResolver implements Resolve<Observable<any>> {
  constructor(private plantService: PlantService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.plantService.getPlant(route.paramMap.get('id'));
  }
}
