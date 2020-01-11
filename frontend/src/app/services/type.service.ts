import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor() { }

  typeNames = {
    ve: 'Vegetable',
    fr: 'Fruit',
    fl: 'Flower',
  };

}
