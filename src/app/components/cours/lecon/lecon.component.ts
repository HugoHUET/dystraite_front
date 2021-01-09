import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lesson } from 'src/app/models/lesson/lesson.model';
import { LessonService } from 'src/app/services/lesson/lesson.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-lecon',
  templateUrl: './lecon.component.html',
  styleUrls: ['./lecon.component.css']
})
export class LeconComponent implements OnInit {

  id: number;
  lesson: Lesson;
  safeVideoUrl;
  thumbnail: any;

  constructor(private route: ActivatedRoute, private lessonService: LessonService, private _sanitizer: DomSanitizer) {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
    });

  }

  ngOnInit() {
    this.lessonService.getLessonById(this.id).subscribe(lesson => {
      this.safeVideoUrl = this._sanitizer.bypassSecurityTrustResourceUrl(lesson.video);
      this.thumbnail = 'data:image/jpeg;base64,' + lesson.thumbnail;
      this.lesson = lesson;
    });
  }


}
