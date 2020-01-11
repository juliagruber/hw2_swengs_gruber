import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {TypeService} from '../services/type.service';
import {GardenService} from '../services/garden.service';
import {GardenerService} from '../services/gardener.service';
import {ColorEvent} from 'ngx-color';

@Component({
  selector: 'app-plant-form',
  templateUrl: './plant-form.component.html',
  styleUrls: ['./plant-form.component.scss']
})
export class PlantFormComponent implements OnInit {

  plantFormGroup;
  gardenOptions;
  gardenerOptions;


  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, public typeService: TypeService,
              private gardenService: GardenService, private gardenerService: GardenerService, private router: Router) {
  }

  ngOnInit() {
 //   const id = this.route.snapshot.paramMap.get('id');
    this.plantFormGroup = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      type: [null],
      seeded_at: [null, Validators.required],
      color: ['#f90'],
      quantity: [null],
      regional: [true],
      garden: [null],
      gardener: [[]],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get('/api/plant/' + id + '/get')
        .subscribe((response) => {
          this.plantFormGroup.patchValue(response);
        });
    }

    const data = this.route.snapshot.data;
    if (data.plant) {
      this.plantFormGroup.patchValue(data.plant);
    }
    this.gardenOptions = data.gardenOptions;
    this.gardenerOptions = data.gardenerOptions;


    this.plantFormGroup.controls.seeded_at.valueChanges.subscribe(() => {
      const seedDate = this.plantFormGroup.controls.seeded_at.value;
    });

    this.gardenService.retrieveGardenOptions().subscribe((result) => {
      this.gardenOptions = result;
    });

    this.gardenerService.retrieveGardenerOptions().subscribe((result) => {
      this.gardenerOptions = result;
    });
  }


  createPlant() {
    const plant = this.plantFormGroup.value;
    if (plant.id) {
      this.http.put('/api/plant/' + plant.id + '/update', plant)
        .subscribe(() => {
          this.router.navigate(['plant-list']);
        });
    } else {
      this.http.post('/api/plant/create', plant)
        .subscribe(() => {
         this.router.navigate(['plant-list']);
        });
    }
  }

  handleChange($event: ColorEvent) {

    this.plantFormGroup.get('color').patchValue($event.color.hex);
  }
}







