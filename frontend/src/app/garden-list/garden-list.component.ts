import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TypeService} from '../services/type.service';
import {UserService} from '../services/user.service';
import {GardenService} from '../services/garden.service';

@Component({
  selector: 'app-garden-list',
  templateUrl: './garden-list.component.html',
  styleUrls: ['./garden-list.component.scss']
})
export class GardenListComponent implements OnInit {

  gardens: any[];

  displayedColumns = ['name', 'size', 'gardener_name', 'id'];

  constructor(private http: HttpClient, private gardenService: GardenService,
              public typeService: TypeService, public userService: UserService) { }

  ngOnInit() {
    this.gardenService.getGardens()
      .subscribe((response: any[]) => {
        this.gardens = response;
      });
    this.http.get('/api/garden/list')
      .subscribe((response: any[]) => {
        this.gardens = response;
      });
  }

  deleteGarden(garden: any) {
    this.http.delete('/api/garden/' + garden.id + '/delete')
      .subscribe(() => {
        this.ngOnInit();
      });
  }

}




