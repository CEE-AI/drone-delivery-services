import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'
import {RouterModule, Routes} from '@angular/router'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MedicationComponent } from './components/medication/medication.component';
import { BatteryLogComponent } from './components/battery-log/battery-log.component';

import { ValidationService } from './service/validation.service';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    MedicationComponent,
    BatteryLogComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BsDropdownModule,
    ModalModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule,
  ],
  providers: [ValidationService, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
