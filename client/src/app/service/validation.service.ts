import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  // validateRegister(drone: {serialNumber: string, model: string, weightLimit: number, batteryCapacity: number}) {
  //   if(drone.serialNumber === ""||drone.model === ""||drone.weightLimit === 0||drone.batteryCapacity === 0) {
  //     console.log(this)
  //     return false;
  //   } else {
  //     return true;
  //   }  
  // }
}
