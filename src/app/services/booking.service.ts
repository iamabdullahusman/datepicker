import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BookingService {


  private bookingsUrl = 'https://localhost:7196/api/Bookings';
  private apiUrl = 'https://localhost:7196/api/bookings/range';

  constructor(private http: HttpClient) {}

  getBookingsByDateRange(startDate: string, endDate: string): Observable<any[]> {
    const url = `${this.apiUrl}?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`;
    return this.http.get<any[]>(url);
}
saveBooking(booking: any): Observable<any> {
  return this.http.post(this.bookingsUrl, booking);
}
}