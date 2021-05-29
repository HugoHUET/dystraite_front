import { Component, OnInit } from '@angular/core';
import { Lesson } from 'src/app/models/lesson/lesson.model';
import { LessonService } from 'src/app/services/lesson/lesson.service';
import { TitreService } from 'src/app/services/titre/titre.service';
import { ResponsiveService } from 'src/app/services/responsive/responsive.service';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {
  lessons: Lesson[];
  currentLesson: Lesson;
  filter_tags_selected = false;
  filter = '';
  filter_tags = {
    categorie: ["Grammaire", "Conjugaison", "Orthographe"],
    age: ["8-10", "11-13", "14-16", "+17"]
  };

  constructor(private titreService: TitreService, private lessonService: LessonService, public responsiveService: ResponsiveService) { }

  ngOnInit() {
    this.titreService.updateTitle('Cours');

    this.lessonService.getAllLessons().subscribe(lessons => {
      this.currentLesson = lessons.shift();
      this.lessons = lessons;
    });
  }

}
