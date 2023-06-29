import { Component } from '@angular/core';
import {Router} from '@angular/router'
import Swal from 'sweetalert2'
import { RegisterService } from 'src/app/service/register.service';
import { ValidationService } from 'src/app/service/validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  serialNumber: string = '';
  model: string = '';
  weightLimit: number = 0;
  batteryCapacity: number = 0;
  state: string = 'IDLE';
  loadMedications: any = [];



  constructor(
    private validateService: ValidationService,
    private registerService: RegisterService,
    private router: Router,
  ) {}

  registerDroneForm(){
    const drone = {
      serialNumber: this.serialNumber,
      model: this.model,
      weightLimit: this.weightLimit,
      batteryCapacity: this.batteryCapacity,
      state: this.state,
      loadMedications: this.loadMedications
    }

    //validating fields
    // if(!this.validateService.validateRegister(drone)){
    //   Swal.fire(`Error`, `please fill in all fields`, `error`);
    //   return false
    // }

    //Registration
    this.registerService.registerDrone(drone).subscribe(
      (data) => {
        if(data) {
          Swal.fire('Success', 'Registration successful', 'success')
        }else{
          Swal.fire('Error', 'Registration failed', 'error')
        }
      },
      (error) => {
        Swal.fire('Error', 'Registration failed', 'error')
      }
    )
    return undefined
  }

}
