import { Component, OnInit } from '@angular/core';
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

  constructor(private route: ActivatedRoute, private bookService: BookService) {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));

    });

    this.bookService.getBookById(this.id).subscribe(book => {
      this.book = book;
    });
  }

  ngOnInit() {
  }

}
