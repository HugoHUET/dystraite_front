import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tips } from 'src/app/models/tips/tips';
import { TipsService } from 'src/app/services/tips/tips.service';
import { TitreService } from 'src/app/services/titre/titre.service';
import { UserService } from 'src/app/services/user/user.service';
import { ResponsiveService } from 'src/app/services/responsive/responsive.service';

@Component({
  selector: 'app-conseil',
  templateUrl: './conseil.component.html',
  styleUrls: ['./conseil.component.css']
})
export class ConseilComponent implements OnInit {

  allTips: Tips[];
  tipsList: Tips[];
  isLoading = false;
  addTipTab = false;
  tags = [];
  tipForm = new FormGroup({
    content: new FormControl('', Validators.required),
    tags: new FormControl([]),
  });

  constructor(private titreService: TitreService, private tipsService: TipsService, public userService: UserService, private route: Router, private toastr: ToastrService, public responsiveService: ResponsiveService) { }

  ngOnInit() {
    this.tipsService.getAll().subscribe(tips => {
      this.tipsList = tips;
      this.allTips = tips;
    });
    this.titreService.updateTitle("Conseil");
  }
  like(tip: Tips) {
    if (!this.userService.isConnected()) {
      this.route.navigate(['/profil']);
      return;
    }
    if (this.isLiked(tip)) {
      tip.nbLikes--;
      this.userService.loggedUser?.likedTips.splice(this.userService.loggedUser.likedTips.indexOf(tip), 1);
    } else {
      tip.nbLikes++;
      this.userService.loggedUser?.likedTips.push(tip);
    }
    this.tipsService.like(tip).subscribe(newtip => {
    });
  }
  isMyTip(tip) {
    return this.userService.loggedUser?.tips?.filter(t => t.id === tip.id).length > 0;
  }
  isLiked(tip) {
    return this.userService.loggedUser?.likedTips?.filter(t => t.id === tip.id).length > 0;
  }
  switchTab(tab: string) {
    this.tipsList = null;
    let all = document.getElementById('all');
    let liked = document.getElementById('liked');
    let mine = document.getElementById('mine');
    all.className = 'button rose'
    liked.className = 'button rose'
    mine.className = 'button rose'
    document.getElementById(tab).className = "button bg-rose";

    switch (tab) {
      case 'all':
        if (!this.allTips) {
          this.tipsService.getAll().subscribe(tips => {
            this.tipsList = tips;
            this.allTips = tips;
          });
        } else {
          this.tipsList = this.allTips;
        }
        break;
      case 'liked':
        this.tipsList = this.userService.loggedUser.likedTips;
        break;
      case 'mine':
        this.tipsList = this.userService.loggedUser.tips;
        break;
      default:
        break;
    }
  }
  delete(tip) {
    this.tipsService.delete(tip.id).subscribe(tip => {
      this.tipsList = this.tipsList.filter(t => t.id != tip.id);
      this.allTips = this.allTips.filter(t => t.id != tip.id);
      this.tipsList = this.tipsList.filter(t => t.id != tip.id);
      this.userService.loggedUser.tips = this.userService.loggedUser.tips.filter(t => t.id != tip.id);
    });
  }
  toggleTipTab() {
    if (!this.userService.isConnected()) {
      this.toastr.error('Vous devez être connecté pour ajouter un conseil', 'Veuillez vous connecter', {
        closeButton: true,
      });
      this.route.navigate(['/profil']);
      return;
    }
    this.addTipTab = !this.addTipTab;
    document.getElementById('add-tip-tab').classList.toggle("open");

    document.getElementById('footer').hidden = !document.getElementById('footer').hidden
  }
  toggleTag(tagName: string, color: string) {
    if (document.getElementById(tagName).classList.contains("activated")) {
      this.tags = this.tags.filter(item => item !== tagName);
    } else {
      this.tags.push(tagName);
    }
    document.getElementById(tagName).classList.toggle("bg-" + color);
    document.getElementById(tagName).classList.toggle(color);
    document.getElementById(tagName).classList.toggle("activated");
  }
  getBackgroundColor(tip: Tips) {
    switch (tip.tags[0]) {
      case 'grammaire':
        return 'bg-jaune';
      case 'orthographe':
        return 'bg-rose';
      case 'conjugaison':
        return 'bg-vert';
      case 'vocabulaire':
        return 'bg-bleu';
      default:
        return 'bg-rose';
    }
  }
  sendTip() {
    this.isLoading = true;
    this.tipForm.value.tags = this.tags;
    this.tipsService.create(this.tipForm.value).subscribe(tip => {
      if (this.tipsList != this.userService.loggedUser.likedTips && this.tipsList != this.userService.loggedUser.tips) {
        this.tipsList.unshift(tip);
      } else {
        this.allTips.unshift(tip);
      }
      this.userService.loggedUser.tips.unshift(tip);
      this.resetForm();
      this.toggleTipTab();
      this.isLoading = false;
    },
      error => {
        this.isLoading = false;
      })
  }
  resetForm() {
    this.tipForm.reset();
    this.tags = [];
    document.getElementById('grammaire').classList.remove("bg-jaune");
    document.getElementById('grammaire').classList.add("jaune");
    document.getElementById('orthographe').classList.remove("bg-rose");
    document.getElementById('orthographe').classList.add("rose");
    document.getElementById('conjugaison').classList.remove("bg-vert");
    document.getElementById('conjugaison').classList.add("vert");
    document.getElementById('vocabulaire').classList.remove("bg-bleu");
    document.getElementById('vocabulaire').classList.add("bleu");
  }
}
