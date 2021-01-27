import { Component, OnInit } from '@angular/core';
import { Tips } from 'src/app/models/tips/tips';
import { ContextService } from 'src/app/services/context/context.service';
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

  constructor(private titreService: TitreService, private tipsService: TipsService, public userService: UserService, private context: ContextService) { }

  ngOnInit() {
    this.tipsService.getAll().subscribe(tips => {
      this.tipsList = tips;
    });
    this.titreService.updateTitle("Conseil");
  }
  like(tip: Tips) {
    if (this.isLiked(tip)) {
      tip.nbLikes--;
      this.context.loggedUser.likedTips.splice(this.context.loggedUser.likedTips.indexOf(tip), 1);
    } else {
      tip.nbLikes++;
      this.context.loggedUser.likedTips.push(tip);
    }
    this.userService.like(tip).subscribe(newtip => {
      console.log(tip);
    });
  }
  isLiked(tip) {
    return this.context.loggedUser.likedTips.includes(tip);
  }
}
