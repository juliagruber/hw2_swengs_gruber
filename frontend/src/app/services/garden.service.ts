import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GardenService {

  constructor(private http: HttpClient) { }

  retrieveGardenOptions() {
    return this.http.get <any[]>('/api/garden/options');
  }

  getGardens() {
    return this.http.get('/api/garden/list');
  }
}







