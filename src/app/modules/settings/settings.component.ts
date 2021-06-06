import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Errors } from 'src/app/core/models/errors.model';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  user: User = {} as User;
  settingsForm!: FormGroup;
  errors: Errors = {errors: {}};
  isSubmitting = false;

  constructor(private router: Router, private userService: UserService, private fb: FormBuilder) { 

    this.settingsForm = this.fb.group({ 
      username: '',
      email: '',
      password: ''
    });
  }

  ngOnInit(): void {

    Object.assign(this.user, this.userService.getCurrentUser());

    this.settingsForm.patchValue(this.user);
  }

  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

  submitForm() {
    this.isSubmitting = true;

    this.updateUser(this.settingsForm.value);

    this.userService.update(this.user).subscribe(updateUser => this.userService.purgeAuth(),
    error => {
      this.errors = error;
      this.isSubmitting = false;
    });

    this.router.navigateByUrl('/');
  }

  updateUser(values: Object) {
    Object.assign(this.user, values);
  }

}
