import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lesson } from 'src/app/models/lesson/lesson.model';
import { LessonService } from 'src/app/services/lesson/lesson.service';

@Component({
  selector: 'app-lecon',
  templateUrl: './lecon.component.html',
  styleUrls: ['./lecon.component.css']
})
export class LeconComponent implements OnInit {

  id: number;
  lesson: Lesson;

  constructor(private route: ActivatedRoute, private lessonService: LessonService) {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));

    });
    this.lessonService.getLessonById(this.id).subscribe(lesson => {
      this.lesson = lesson;
    });
  }

  ngOnInit() {
  }

}
