import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CustomSnackBarService, SnackBarMessage } from 'src/app/services/custom-snackbar.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  vaccineForm: FormGroup = new FormGroup({
    vaccinationHistory: new FormGroup({
      vaccine_name: new FormControl('', [Validators.required]),
      first_shot_on: new FormControl('', [Validators.required]),
      second_shot_on: new FormControl('', [Validators.required]),
    }),
    covid_affected: new FormControl(''),
    affected_on: new FormControl(''),
    covid_recovered: new FormControl(''),
    recovered_on: new FormControl(''),
  });
  citySearch: string = localStorage.getItem('email') || '';
  hospitalsList: MatTableDataSource<any> = new MatTableDataSource();
  hospitalColumns: string[] = ['hospitalName', 'phoneNumber', 'address', 'city', 'state'];

  consultationList: MatTableDataSource<any> = new MatTableDataSource();
  consultationListColumns: string[] = ['consultation_date', 'doctorEmail', 'symptoms', 'oxygen_level', 'followup_date','medicines'];

  constructor(private router: Router,
    private dataService: DataService,
    private snackBarService: CustomSnackBarService) { }

  ngOnInit(): void {
    this.citySearch = localStorage.getItem('city') || '';
    this.getHospitalsByCity();
    this.dataService.getPatientInfo(localStorage.getItem('email') || '').subscribe(response => {
      this.vaccineForm.patchValue(response[0]);
      const list: any[] = [];
      (response[0].doctor_details || []).forEach(doctor => {
        (doctor.visits || []).forEach(visit => {
          list.push({
            doctorEmail: doctor.doctorEmail, ...visit,
            symptoms: (visit.symptoms || []).join(', '),
            medicines: (visit.medicines || []).map(med => {
              return `${med.name}: ${med.timimgs}: ${med.course_duration}`
            }).join(', ')
          })
        })
      });
      console.log(list);
      this.consultationList = new MatTableDataSource(list)
    });
  }
  onAddCovidInfo() {
    this.dataService.addCovidInfo(this.vaccineForm.getRawValue()).subscribe(response => {

      const snackBarMessage: SnackBarMessage = {
        message: 'Covid info added sucessfully',
        panelClass: 'success'
      };
      this.snackBarService.add(snackBarMessage);
    })
  }

  getHospitalsByCity() {
    this.dataService.fetchHospitalByCity(this.citySearch).subscribe((response: any) => {
      this.hospitalsList.data = response
    });
  }

}
