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
  filter_tags_selected = false;
  filter = '';
  filter_tags = {
    categorie: ["Grammaire", "Conjugaison", "Orthographe"],
    age: ["8-10", "11-13", "14-16", "+17"]
  };

  constructor(private titreService: TitreService, private bookService: BookService) { }

  ngOnInit() {
    this.titreService.updateTitle("Bibliotheque");

    this.bookService.getAllBooks().subscribe(books => {
      this.currentBook = books.shift();
      this.books = books
    });
  }

}
