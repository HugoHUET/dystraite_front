import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  visible = false;
  progress_orthographe = '50%';
  progress_conjugaison = '100%';
  progress_grammaire = '50%';
  progress_vocabulaire = '75%';

  constructor() { }

  ngOnInit() {
    this.visible = true;
  }

}
