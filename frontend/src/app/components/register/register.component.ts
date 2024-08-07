import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  fields = [
    {
      key: 'username',
      type: 'input',
      templateOptions: {
        label: 'Username',
        placeholder: 'Enter your username',
        required: true
      }
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        required: true
      }
    },
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        type: 'email',
        label: 'Email',
        placeholder: 'Enter your email',
        required: true
      }
    }
  ];

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) {
    this.registerForm = this.fb.group({});
  }

  async onRegister(): Promise<void> {
    if (this.registerForm.valid) {
      try {
        await this.userService.register(this.registerForm.value);
        this.router.navigate(['/login']);
      } catch (error) {
        console.error('Registration failed:', error);
      }
    }
  }
}
