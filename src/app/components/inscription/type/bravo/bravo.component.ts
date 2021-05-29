import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { ResponsiveService } from 'src/app/services/responsive/responsive.service';

@Component({
  selector: 'app-bravo',
  templateUrl: './bravo.component.html',
  styleUrls: ['./../../inscription.component.css', './bravo.component.css']
})
export class BravoComponent implements OnInit {

  type: string;

  constructor(private route: ActivatedRoute, public userService: UserService, public responsiveService: ResponsiveService) {
    this.route.paramMap.subscribe(params => {
      this.type = params.get('type');
    });
  }

  ngOnInit() {
  }

}
