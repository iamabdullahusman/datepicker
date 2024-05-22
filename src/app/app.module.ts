import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';

import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { CalenderComponent } from './calender/calender.component';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { DateRangePickerComponent } from './date-range-picker/date-range-picker.component';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    CalenderComponent,
    DateRangePickerComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,



    NzCalendarModule,
    AgGridModule,
    NzBadgeModule,
    NzDatePickerModule,
    AgGridAngular,
    ReactiveFormsModule,
    NzButtonModule,
    NzModalModule,
    NzInputModule,
    NzDatePickerModule
    
  ],
  providers: [
    provideClientHydration(),
    { provide: NZ_I18N, useValue: en_US },
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
