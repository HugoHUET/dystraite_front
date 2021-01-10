import { Component, OnInit } from '@angular/core';
import { Lesson } from 'src/app/models/lesson/lesson.model';
import { LessonService } from 'src/app/services/lesson/lesson.service';
import { TitreService } from 'src/app/services/titre/titre.service';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {
  lessons: Lesson[];
  currentLesson: Lesson;

  constructor(private titreService: TitreService, private lessonService: LessonService) { }

  ngOnInit() {
    this.titreService.updateTitle('Cours');

    this.lessonService.getLast(1).subscribe(lessons => {
      this.currentLesson = lessons[0];
    })
    this.lessonService.getAllLessons().subscribe(lessons => {
      this.lessons = lessons;
      this.lessons = this.lessons.filter(lesson => lesson.id !== this.currentLesson.id);
    });
  }

}
