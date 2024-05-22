import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalenderComponent } from './calender/calender.component';
import { DateRangePickerComponent } from './date-range-picker/date-range-picker.component';



const routes: Routes = [
  {path:'calender',component:CalenderComponent},
  {path:'date-range-picker',component:DateRangePickerComponent},

  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
