import { Component, OnInit } from '@angular/core';
import { Tips } from 'src/app/models/tips/tips';
import { TipsService } from 'src/app/services/tips/tips.service';
import { TitreService } from 'src/app/services/titre/titre.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-conseil',
  templateUrl: './conseil.component.html',
  styleUrls: ['./conseil.component.css']
})
export class ConseilComponent implements OnInit {

  tipsList: Tips[];

  constructor(private titreService: TitreService, private tipsService: TipsService, private userService: UserService) { }

  ngOnInit() {
    this.tipsService.getAll().subscribe(tips => {
      this.tipsList = tips;
    });
    this.titreService.updateTitle("Conseil");
  }
  like(tip: Tips) {
    this.userService.like(tip);
  }

}
