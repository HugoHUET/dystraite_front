import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book/book.model';
import { Lesson } from 'src/app/models/lesson/lesson.model';
import { BookService } from 'src/app/services/book/book.service';
import { LessonService } from 'src/app/services/lesson/lesson.service';
import { TitreService } from 'src/app/services/titre/titre.service';

@Component({
  selector: 'app-actualite',
  templateUrl: './actualite.component.html',
  styleUrls: ['./actualite.component.css']
})

export class ActualiteComponent implements OnInit {

  lastLesson: Lesson;
  lastBook: Book;

  constructor(private lessonService: LessonService, private titreService: TitreService, private bookService: BookService) { }

  ngOnInit() {
    this.lessonService.getLast(1).subscribe(lessons => {
      this.lastLesson = lessons[0];
    })
    this.bookService.getLast(1).subscribe(books => {
      this.lastBook = books[0];
    })
    this.titreService.updateTitle('Accueil');

  }
}
