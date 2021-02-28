import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book/book.model';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  private REST_API_SERVER = environment.apiUrl + '/books/';

  constructor(private httpService: HttpClient) { }

  getAllBooks(): Observable<Book[]> {
    return this.httpService.get(this.REST_API_SERVER).pipe(
      map((res: Book[]) => res));
  }

  createBook(book: Book): Observable<Book> {
    return this.httpService.post<Book>(this.REST_API_SERVER, book);
  }

  updateBook(id: number, value: Book) {
    return this.httpService.put(this.REST_API_SERVER + id, value);
  }

  deleteBook(id: number): Observable<Book> {
    return this.httpService.delete<Book>(this.REST_API_SERVER + id);
  }

  getBookById(id: number): Observable<Book> {
    return this.httpService.get(this.REST_API_SERVER + id).pipe(
      map((res: Book) => res));
  }
  getLast(limit: number): Observable<Book[]> {
    return this.httpService.get(this.REST_API_SERVER + "getLast/" + limit).pipe(
      map((res: Book[]) => res));
  }

  // Need backend implementation

  /*getBookByTitle(title: string): Observable<Book> {
    return this.httpService.get(this.REST_API_SERVER + "?title=" + title).pipe(
      map((res: Book) => res));
  }

  getBookByDescription(description: string): Observable<Book> {
    return this.httpService.get(this.REST_API_SERVER + "?description=" + description).pipe(
      map((res: Book) => res));
  }

  getBookByLink(link: string): Observable<Book> {
    return this.httpService.get(this.REST_API_SERVER + "?link=" + link).pipe(
      map((res: Book) => res));
  }

  getBookByThumbnail(thumbnail: string): Observable<Book> {
    return this.httpService.get(this.REST_API_SERVER + "?thumbnail=" + thumbnail).pipe(
      map((res: Book) => res));
  }

  getBookByCreatedat(createdat: string): Observable<Book> {
    return this.httpService.get(this.REST_API_SERVER + "?createdat=" + createdat).pipe(
      map((res: Book) => res));
  }

  getBookByTags(tags: any): Observable<Book> {
    return this.httpService.get(this.REST_API_SERVER + "?tags=" + tags).pipe(
      map((res: Book) => res));
  }*/
}
