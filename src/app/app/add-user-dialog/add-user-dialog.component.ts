import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CustomSnackBarService, SnackBarMessage } from 'src/app/services/custom-snackbar.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent implements OnInit {

  form: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    community: new FormControl('', [Validators.required]),
    address_1: new FormControl('', [Validators.required]),
    address_2: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
  });
  displayConfirmPasswordError: boolean = false;
  displayLoader: boolean = false;
  submit() {
    if (this.form.valid) {
      this.router.navigateByUrl('/doctor')
    }
  }
  constructor(private router: Router,
    public dialog: MatDialog,
    private snackBarService: CustomSnackBarService,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.form.get('confirmPassword')?.valueChanges.subscribe(value => {
      this.displayConfirmPasswordError = this.form.getRawValue().password !== value;
    })
  }
  onAdd() {
    this.displayLoader = true
    this.dataService.addUser(this.form.getRawValue()).subscribe(response => {
      this.displayLoader = false;
      const snackBarMessage: SnackBarMessage = {
        message: 'User added sucessfully',
        panelClass: 'success'
      };
      this.snackBarService.add(snackBarMessage);
      this.dialog.closeAll();
    });
  }

}
