import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, ValidatorFn, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {GardenService} from '../services/garden.service';
import {GardenerService} from '../services/gardener.service';

@Component({
  selector: 'app-garden-form',
  templateUrl: './garden-form.component.html',
  styleUrls: ['./garden-form.component.scss']
})
export class GardenFormComponent implements OnInit {

  gardenFormGroup;
  gardenerOptions;

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute,
              private gardenService: GardenService, private gardenerService: GardenerService, private router: Router) { }

  ngOnInit() {
    //   const id = this.route.snapshot.paramMap.get('id');
    this.gardenFormGroup = this.fb.group({
      id: [null],
      name: ['', [Validators.required, this.gardenNameValidator()]],
      size: [null],
      location: [null],
      gardener_name: [null],
      inUse: [true]
  });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get('/api/garden/' + id + '/get')
        .subscribe((response) => {
          this.gardenFormGroup.patchValue(response);
        });
    }
/*
    const data = this.route.snapshot.data;
    if (data.plant) {
      this.gardenFormGroup.patchValue(data.plant);
    }
    this.gardenerOptions = data.gardenerOptions;
*/
    const data = this.route.snapshot.data;
    if (data.garden) {
      this.gardenFormGroup.patchValue(data.garden);
    }
    this.gardenerOptions = data.gardenerOptions;

    this.gardenerService.retrieveGardenerOptions().subscribe((result) => {
      this.gardenerOptions = result;
    });
  }

  gardenNameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = /[0-9]/.test(control.value);
      return forbidden ? {'nameError': {value: control.value}} : null;
    };
  }

    createGarden() {
    const garden = this.gardenFormGroup.value;
    if (garden.id) {
      this.http.put('/api/garden/' + garden.id + '/update', garden)
        .subscribe(() => {
          this.router.navigate(['garden-list']);
        });
    } else {
      this.http.post('/api/garden/create', garden)
        .subscribe(() => {
          this.router.navigate(['garden-list']);
        });
    }
}
}





