import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  submit() {
    if (this.form.valid) {
      this.router.navigateByUrl('/doctor')
    }
  }
  constructor(private router: Router,
    private dataService: DataService) { }

  ngOnInit(): void {
  }
  onLoginClick() {
    this.dataService.login(this.form.getRawValue()).subscribe(respone => {
      localStorage.setItem('email', respone.email);
      localStorage.setItem('city', respone.city);
      localStorage.setItem('role', respone.role);
      if (respone.role === 'user') {
        this.router.navigateByUrl('patient')
      } else {
        this.router.navigateByUrl('doctor')
      }
    });
  }

}
