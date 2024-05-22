import { Component, EventEmitter, Output , OnInit } from '@angular/core';
import { getISOWeek } from 'date-fns';
import { BookingService } from '../services/booking.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrl: './date-range-picker.component.css'
})
export class DateRangePickerComponent implements OnInit {
  defaultColDef: ColDef = {
    filter:true,
    floatingFilter:true
  }
 
  colDefs: ColDef[] = [
    { field: "id" },
    { field: "startDate" },
    { field: "endDate" },
    { field: "description" }
  ];

  date = null;
  userList : any[] = [];
  isVisible = false;
  value?: string;
  startValue: Date | null = null;
  endValue: Date | null = null;
  endDatePicker: any;
  
  constructor (private bookingService:BookingService , private http:HttpClient) {}
  ngOnInit(): void {
    this.getUser();
  }
  getUser()
  {
    this.http.get('https://localhost:7196/api/Bookings/range?startDate=2024-05-20T13%3A08%3A06.998Z&endDate=2024-05-27T13%3A08%3A06.998Z').subscribe((res:any)=>{
      this.userList = res;
    })
  }
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log(this.startValue);
    console.log(this.endValue);
    console.log(this.value);
    if (!this.startValue || !this.endValue || !this.value) {
      console.error('Please fill in all fields');
      return;
    }
    const booking = {
      startDate: this.startValue.toISOString(),
      endDate: this.endValue.toISOString(),
      description: this.value,
    };
  
    this.bookingService.saveBooking(booking).subscribe(
      () => {
        console.log('Booking saved successfully!');
        this.isVisible = false; // Close modal after saving
        // Optionally, clear form fields after successful save
      },
      (error) => {
        console.error('Error saving booking:', error);
      }
    );
  }
  
  

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  };
  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endDatePicker.open();
    }
    console.log('handleStartOpenChange', open);
  }

  handleEndOpenChange(open: boolean): void {
    console.log('handleEndOpenChange', open);
  }
  

  onChange(result: Date[]): void {
    console.log('onChange: ', result);
    // Assuming result is an array [startDate, endDate]
    const startDate = result[0].toISOString();
    const endDate = result[1].toISOString();
    this.getBookings(startDate, endDate);
  }

  getWeek(result: Date[]): void {
    console.log('week: ', result.map(getISOWeek));
  }
  private getBookings(startDate: string, endDate: string): void {
    this.bookingService.getBookingsByDateRange(startDate, endDate)
      .subscribe(bookings => {
        console.log('Bookings:', bookings);
      }, error => {
        console.error('Error fetching bookings:', error);
      });
  }
}
