import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PlantListComponent} from './plant-list/plant-list.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth.guard';
import {PlantFormComponent} from './plant-form/plant-form.component';
import {GardenListComponent} from './garden-list/garden-list.component';
import {GardenFormComponent} from './garden-form/garden-form.component';
import {GardenerOptionsResolver} from './resolver/gardener-options.resolver';
import {GardenOptionsResolver} from './resolver/garden-options.resolver';
import {PlantResolver} from './resolver/plant.resolver';


const routes: Routes = [
  { path: 'plant-list', component: PlantListComponent, canActivate: [AuthGuard] },
  { path: 'garden-list', component: GardenListComponent, canActivate: [AuthGuard] },
  {path: 'login', component: LoginComponent},
  {path: 'plant-form', component: PlantFormComponent, canActivate: [AuthGuard],
    resolve: {
      gardenOptions: GardenOptionsResolver,
      gardenerOptions: GardenerOptionsResolver,
    }},
  {path: 'plant-form/:id', component: PlantFormComponent, canActivate: [AuthGuard],
    resolve: {
      gardenOptions: GardenOptionsResolver,
      gardenerOptions: GardenerOptionsResolver,
      plant: PlantResolver,
    }},
  {path: 'garden-form', component: GardenFormComponent, canActivate: [AuthGuard],
    resolve: {
      gardenOptions: GardenOptionsResolver,
      gardenerOptions: GardenerOptionsResolver,
    }},
  {path: 'garden-form/:id', component: GardenFormComponent, canActivate: [AuthGuard],
    resolve: {
      gardenOptions: GardenOptionsResolver,
      gardenerOptions: GardenerOptionsResolver,
    }},
  {path: '', redirectTo: 'plant-list', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
