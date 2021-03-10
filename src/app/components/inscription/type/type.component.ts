import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {

  ortho: boolean = false;
  isLoading = false;
  registerForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    birthdate: new FormControl(null, Validators.required)
  });

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {
    this.route.paramMap.subscribe(params => {
      if (params.get('type') === 'ortho') {
        this.ortho = true;
      }
    });
  }

  ngOnInit() {
  }
  register() {
    this.isLoading = true;
    this.userService.register(this.registerForm.value).subscribe(response => {
      this.router.navigate(['/inscription/user/bravo']);
    },
      error => {
        this.isLoading = false;
        this.registerForm.get('email').setErrors({
          used: true,
        })
      });
  }

}
