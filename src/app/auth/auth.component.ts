import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Errors } from '../core/models/errors.model';
import { AlertService } from '../core/services/alert.service';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authType: String = '';
  title: String = '';
  submitted = false;
  authForm!: FormGroup;
  loading = false;
  placeHolder = 'Email or username';

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private fb: FormBuilder, private alertService: AlertService) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;

      // Set a title for the page accordingly
      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';

      // add form control for username if this is the register page
      if (this.authType === 'register') {
        this.authForm.addControl('email', new FormControl());
        this.placeHolder = 'Username';
      }
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.authForm.controls; }


  submitForm() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.authForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.attemptAuth(this.authType, this.authForm.value).pipe(first()).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigateByUrl(returnUrl);
      },
      error: error => {
        this.alertService.error(error);
        this.loading = true;
      }
    })
  }
}
