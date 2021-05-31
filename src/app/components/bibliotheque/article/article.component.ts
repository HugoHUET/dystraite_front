import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book/book.model';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  id: number;
  book: Book;
  thumbnail: any;

  constructor(private route: ActivatedRoute, private bookService: BookService, private _sanitizer: DomSanitizer) {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));

    });
  }

  ngOnInit() {
    this.bookService.getBookById(this.id).subscribe(book => {
      this.thumbnail = 'data:image/jpeg;base64,' + book.thumbnail;
      this.book = book;
    });
  }

}
