import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GardenerService {

  constructor(private http: HttpClient) { }

  retrieveGardenerOptions() {
    return this.http.get <any[]>('/api/gardener/options');
  }
}

