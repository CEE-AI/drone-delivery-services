import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const API = `http://localhost:8701/drones`
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  load(drone: any, droneId:string){
    return this.http.patch<any>(`${API}/load/${droneId}`, drone)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  loadedMedications(droneId: string){
    return this.http.delete<any>(`${API}/loaded-medications/${droneId}`)
    .pipe(map((res:any)=>{
      return res
    }))
  }

  availableForLoading() {
    return this.http.get<any>(`${API}/drone-available`)
    .pipe(map((res:any)=>{
      return res
    }))
  }

  batteryCapacity(droneId: string) {
    return this.http.get<any>(`${API}/battery-level/${droneId}`)
    .pipe(map((res:any)=>{
      return res
    }))
  }

}
