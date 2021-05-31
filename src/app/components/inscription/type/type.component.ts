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
    firstname: new FormControl(null, Validators.required),
    lastname: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
    city: new FormControl(null),
    birthdate: new FormControl(null),
    username: new FormControl(null)
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
