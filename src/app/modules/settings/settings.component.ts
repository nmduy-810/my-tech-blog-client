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
    // create form group using the form builder
    this.settingsForm = this.fb.group({ 
      username: '',
      bio: '',
      email: '',
      password: ''
    });
  }

  ngOnInit(): void {
    //Copy of the current user object to place in editable form fields
    console.log(this.userService.getCurrentUser());

    Object.assign(this.user, this.userService.getCurrentUser());
    
    //Pass value of user to form field
    this.settingsForm.patchValue(this.user);
  }

  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

  submitForm() {
    this.isSubmitting = true;

    this.updateUser(this.settingsForm.value);

    this.userService.update(this.user).subscribe(updateUser => this.router.navigateByUrl('/home' + updateUser.username),
    error => {
      this.errors = error;
      this.isSubmitting = false;
    });
  }

  updateUser(values: Object) {
    Object.assign(this.user, values);
  }

}
