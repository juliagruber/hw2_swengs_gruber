import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { PlantListComponent } from './plant-list/plant-list.component';
import {
  _MatMenuDirectivesModule, MatButtonModule,
  MatCardModule, MatCheckboxModule, MatDatepickerModule,
  MatFormFieldControl,
  MatFormFieldModule, MatInputModule,
  MatMenuModule, MatNativeDateModule, MatSelectModule, MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {JwtModule} from '@auth0/angular-jwt';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { PlantFormComponent } from './plant-form/plant-form.component';
import { DateComponent } from './date/date.component';
import { GardenListComponent } from './garden-list/garden-list.component';
import { GardenFormComponent } from './garden-form/garden-form.component';
import {ColorSketchModule} from 'ngx-color/sketch';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    PlantListComponent,
    LoginComponent,
    LogoutComponent,
    PlantFormComponent,
    DateComponent,
    GardenListComponent,
    GardenFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    _MatMenuDirectivesModule,
    MatMenuModule,
    MatToolbarModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:4200']
      }
    }),
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatButtonModule,
    ColorSketchModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
