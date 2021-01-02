import { Component, OnInit } from '@angular/core';
import { Lesson } from 'src/app/models/lesson/lesson.model';
import { LessonService } from 'src/app/services/lesson/lesson.service';
import { TitreService } from 'src/app/services/titre/titre.service';

@Component({
  selector: 'app-actualite',
  templateUrl: './actualite.component.html',
  styleUrls: ['./actualite.component.css']
})

export class ActualiteComponent implements OnInit {

  lastLesson: Lesson;

  constructor(private lessonService: LessonService, private titreService: TitreService) { }

  ngOnInit() {
    this.lessonService.getAllLessons().subscribe(lessons => {
      this.lastLesson = lessons[0];
    })
    this.titreService.updateTitle('Accueil');

  }
}
