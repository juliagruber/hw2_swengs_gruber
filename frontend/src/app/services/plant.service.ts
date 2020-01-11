import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  constructor(private http: HttpClient) { }

  getPlants() {
    return this.http.get('/api/plant/list');
  }

  getPlant(id) {
    return this.http.get('/api/plant/' + id + '/get');
  }
}
