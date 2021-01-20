import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book/book.model';
import { BookService } from 'src/app/services/book/book.service';
import { TitreService } from 'src/app/services/titre/titre.service';

@Component({
  selector: 'app-bibliotheque',
  templateUrl: './bibliotheque.component.html',
  styleUrls: ['./bibliotheque.component.css']
})
export class BibliothequeComponent implements OnInit {

  books: Book[];
  currentBook: Book;


  constructor(private titreService: TitreService, private bookService: BookService) { }

  ngOnInit() {
    this.titreService.updateTitle("Bibliotheque");


    this.bookService.getLast(1).subscribe(books => {
      this.currentBook = books[0];
    })

    this.bookService.getAllBooks().subscribe(books => {
      this.books = books;
    });
  }

}
