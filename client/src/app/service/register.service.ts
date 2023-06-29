import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

export const API = 'http://localhost:8701/drones/'

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private drone: any

  constructor(private http: HttpClient) { }

  registerDrone(drone: any){
    let headers = new HttpHeaders()
    headers.set('content-type', 'application/json');
    return this.http.post(API + 'register', {
      serialNumber: drone.serialNumber,
      model: drone.model,
      weightLimit: drone.weightLimit,
      batteryCapacity: drone.batteryCapacity
    }, {withCredentials: true})
    .pipe(map((res: any)=>res))
  }
}
