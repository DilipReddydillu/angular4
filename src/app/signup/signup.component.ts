import { Component } from '@angular/core';
import { DataService } from '../data.service';
import {Observable} from 'rxjs/Rx';
import { FormControl } from '@angular/forms';
import {Router} from '@angular/router';
//import { google } from 'google/googleMap';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent {
    categoryInfo = [{
            name: 'Clothing',
            id: '1'
        },
        {
            name: 'Furniture',
            id: '2'
        },
        {
            name: 'Fashion jewellery',
            id: '3'
        },
        {
            name: 'Valves',
            id: '4'
        },
        {
            name: 'Computer Hardware',
            id: '5'
        },
    ];
    registerInfo = [{
            name: 'PanCard',
            id: '1'
        },
        {
            name: 'Aadhar',
            id: '2'
        },
        {
            name: 'LabourId',
            id: '3'
        },
        {
            name: 'TIN',
            id: '4'
        },
        {
            name: 'RegId',
            id: '5'
        },
    ];
   public model={"companyName":"","ownerName":"","mobile":"","password":"","email":"","businessAddress":"","city":"","state":"","country":"","website":"","category":"","reg":""};
    submitted = false;
    showAddr = false;
    registrationFailed =false;
    latlng:any;
    mobileOTP:any;

    constructor(private _demoService: DataService, private router: Router) {}

    onSubmit() {
        this.registerUser(this.model);
        console.log(this.model)
    }
    update(value: string) {
        if (value != null)
            this.addressDetails(value)
    }

    locDeatils(data){
      if (data) {
        var addrDataArr= data.results[0].formatted_address.split(',');
          this.model['country'] = addrDataArr[addrDataArr.length - 1].trim();
          this.model['state'] = addrDataArr[addrDataArr.length - 2].trim();
          this.model['city'] = addrDataArr[addrDataArr.length - 3].trim();
          this.showAddr = true;
      }
    }

    registerUser(dataJson) {
          this.mobileOTP = dataJson.mobile;
        this._demoService.registerUser(dataJson).subscribe(
            data => {
                console.log("Data saved successfully!");
                  this.sendOtp(  this.mobileOTP )
                return true;
            },
            error => {
                console.error("Error saving data!");
                this.registrationFailed = true;
                return Observable.throw(error);
            }
        );
    }

    addressDetails(data) {
        let JsonData = {details: data};
        this._demoService.getLocationDetails(JsonData).subscribe(
            data => {
                console.log(data)
                this.locDeatils(data);
                return true;
            },
            error => {
                console.error("Error fetching data!");
                return Observable.throw(error);
            }
        );
    }

    sendOtp(mobileNum){
          this.router.navigate(['/', 'otpVerification']);
          this._demoService.sendOtp(mobileNum).subscribe(
             data => {
               this._demoService.changeMessage(mobileNum+'Regi')
             },
             error => {
             }
          );
    }

}
