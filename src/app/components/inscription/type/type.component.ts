import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {

  ortho: boolean = false;
  registerForm = new FormGroup({

  });

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      if (params.get('type') === 'ortho') {
        this.ortho = true;
      }
    });
  }

  ngOnInit() {
  }
  register() {

  }

}
