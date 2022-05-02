import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError, filter, distinctUntilChanged, switchMap, take } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class DataService {
    apiUrl: string = 'http://localhost:3001/api/';
    public constructor(
        private http: HttpClient
    ) {
    }

    public login(data: any): Observable<any> {
        return this.http.post(this.apiUrl + 'auth/login', data);
        // return of({
        //     email: data.email,
        //     role: 'user',
        //     city: 'KANSASCITY'
        // });
    }

    public addUser(userData: any): Observable<any> {
        const url = this.apiUrl + `addUser`;
        return this.http.post(url, userData);
    }

    public fetchHospitalByCity(city: string) {
        const url = this.apiUrl + 'fetchHospitalByCity?city=' + city;
        return this.http.get(url);
        // let response = [...this.hospitals]
        // for (let index = 0; index < response.length; index++) {
        //     response[index].city = city || ''
        // }
        // return of(response)
    }

    public getPatientInfo(email: string): Observable<any> {
        const url = this.apiUrl + 'getPatientInfo?patientEmail=' + email;
        console.log("url", url);
        return this.http.get(url);
        // return of([this.patientInfo]);
    }

    public addCovidInfo(data: any): Observable<any> {
        const url = this.apiUrl + 'addCovidInfo';
        const body = {
            patientEmail: localStorage.getItem('email'),
            covid_info: {
                ...data
            }
        }
        return this.http.post(url, body);
    }

    // patientInfo = {
    //     "_id": "625cd80cd26db20bfeb1d987",
    //     "patientEmail": "rohith.vallabhaneni.3@gmail.com",
    //     "vaccinationHistory": {
    //         "vaccine_name": "Pfizer",
    //         "first_shot_on": "14/05/2021",
    //         "second_shot_on": "14/10/2021"
    //     },
    //     "covid_affected": true,
    //     "affected_on": "31/10/2021",
    //     "covid_recovered": true,
    //     "recovered_on": "30/11/2021",
    //     "qurantine_start_date": "03/11/2021",
    //     "qurantine_end_date": "21/11/2021",
    //     "undergoing_treatment": true,
    //     "doctor_details": [
    //         {
    //             "doctorEmail": "alex.watson@stlukes.com",
    //             "visits": [
    //                 {
    //                     "consultation_date": "18/04/2022",
    //                     "symptoms": [
    //                         "cold",
    //                         "fever",
    //                         "body pains"
    //                     ],
    //                     "oxygen_level": "98%",
    //                     "followup_date": "25/04/2022",
    //                     "medicines": [
    //                         {
    //                             "name": "dolo 650mg",
    //                             "timimgs": "morning-afternoon-evening",
    //                             "course_duration": "1 week"
    //                         },
    //                         {
    //                             "name": "crocin",
    //                             "timimgs": "morning-evening",
    //                             "course_duration": "1 week"
    //                         },
    //                         {
    //                             "name": "vitamin-B12",
    //                             "timimgs": "morning",
    //                             "course_duration": "1 week"
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "consultation_date": "11/04/2022",
    //                     "symptoms": [
    //                         "cold",
    //                         "fever"
    //                     ],
    //                     "oxygen_level": "99%",
    //                     "followup_date": "18/04/2022",
    //                     "medicines": [
    //                         {
    //                             "name": "dolo 650mg",
    //                             "timimgs": "morning-afternoon-evening",
    //                             "course_duration": "1 week"
    //                         },
    //                         {
    //                             "name": "vitamin-B12",
    //                             "timimgs": "morning",
    //                             "course_duration": "1 week"
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "consultation_date": "11/04/2022",
    //                     "symptoms": [
    //                         "cold",
    //                         "fever"
    //                     ],
    //                     "oxygen_level": "99%",
    //                     "followup_date": "18/04/2022",
    //                     "medicines": [
    //                         {
    //                             "name": "dolo 650mg",
    //                             "timimgs": "morning-afternoon-evening",
    //                             "course_duration": "1 week"
    //                         },
    //                         {
    //                             "name": "vitamin-B12",
    //                             "timimgs": "morning",
    //                             "course_duration": "1 week"
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "consultation_date": "11/04/2022",
    //                     "symptoms": [
    //                         "cold",
    //                         "fever"
    //                     ],
    //                     "oxygen_level": "99%",
    //                     "followup_date": "18/04/2022",
    //                     "medicines": [
    //                         {
    //                             "name": "dolo 650mg",
    //                             "timimgs": "morning-afternoon-evening",
    //                             "course_duration": "1 week"
    //                         },
    //                         {
    //                             "name": "vitamin-B12",
    //                             "timimgs": "morning",
    //                             "course_duration": "1 week"
    //                         }
    //                     ]
    //                 }
    //             ]
    //         },
    //         {
    //             "doctorEmail": "puneethramchandra@gmail.com",
    //             "visits": [
    //                 {
    //                     "consultation_date": "19/04/2022",
    //                     "symptoms": [
    //                         "headache",
    //                         "migrane"
    //                     ],
    //                     "oxygen_level": "99%",
    //                     "followup_date": "01/05/2022",
    //                     "medicines": [
    //                         {
    //                             "name": "naproxine 10mg",
    //                             "timimgs": "morning-evening",
    //                             "course_duration": "2 weeks"
    //                         }
    //                     ]
    //                 }
    //             ]
    //         }
    //     ]
    // }

    // hospitals = [
    //     {
    //         "hospitalName": "Saint Luke's Hospital of Kansas City",
    //         "phoneNumber": "(816) 932-2000",
    //         "address": "4401 Wornall Rd",
    //         "city": "KANSASCITY",
    //         "state": "MO"
    //     },
    //     {
    //         "hospitalName": "Saint Luke's Hospital of Newyork",
    //         "phoneNumber": "(816) 932-2000",
    //         "address": "4401 Wornall Rd",
    //         "city": "NEWYORK",
    //         "state": "NY"
    //     }
    // ]

}
