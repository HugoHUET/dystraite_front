import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./../inscription.component.css', './type.component.css']
})
export class TypeComponent implements OnInit {

  ortho: boolean = false;

  constructor(private route: ActivatedRoute) { 
    this.route.paramMap.subscribe(params => {
			if (params.get('type') === 'ortho') {
				this.ortho = true;
			}
    });
  }

  ngOnInit() {
  }

}
