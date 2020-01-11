import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PlantService} from '../services/plant.service';
import {TypeService} from '../services/type.service';
import {UserService} from '../services/user.service';


@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.scss']
})
export class PlantListComponent implements OnInit {

  plants: any[];

  displayedColumns = ['name', 'type',
    'garden_name'
    , 'id'];

  constructor(private http: HttpClient, private plantService: PlantService,
              public typeService: TypeService, public userService: UserService) { }

  ngOnInit() {
    this.plantService.getPlants()
      .subscribe((response: any[]) => {
        this.plants = response;
      });
    this.http.get('/api/plant/list')
      .subscribe((response: any[]) => {
        this.plants = response;
      });
  }

  deletePlant(plant: any) {
    this.http.delete('/api/plant/' + plant.id + '/delete')
      .subscribe(() => {
        this.ngOnInit();
      });
  }

}


