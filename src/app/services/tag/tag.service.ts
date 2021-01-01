import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tag } from 'src/app/models/tag/tag.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private REST_API_SERVER = environment.apiUrl + "/tags/";

  constructor(private httpService: HttpClient) { }

  getAllTags(): Observable<Tag[]> {
    return this.httpService.get(this.REST_API_SERVER).pipe(
      map((res: Tag[]) => res));
  }

  createTag(tag: Tag): Observable<Tag> {
    return this.httpService.post<Tag>(this.REST_API_SERVER, tag);
  }

  updateTag(id: number, value: Tag) {
    return this.httpService.put(this.REST_API_SERVER + id, value);
  }

  deleteTag(id: number): Observable<Tag> {
    return this.httpService.delete<Tag>(this.REST_API_SERVER + id);
  }

  getTagById(id: number): Observable<Tag> {
    return this.httpService.get(this.REST_API_SERVER + "?id=" + id).pipe(
      map((res: Tag) => res));
  }
  // Need backend implementation

  /*
  getTagByTitle(title: string): Observable<Tag> {
      return this.httpService.get(this.REST_API_SERVER + "?title=" + title).pipe(
          map((res: Tag) => res));
  }
  
  getTagByDescription(description: string): Observable<Tag> {
      return this.httpService.get(this.REST_API_SERVER + "?description=" + description).pipe(
          map((res: Tag) => res));
  }
  
  getTagByColor(color: string): Observable<Tag> {
      return this.httpService.get(this.REST_API_SERVER + "?color=" + color).pipe(
          map((res: Tag) => res));
  }
  
  getTagByLessons(lessons: string): Observable<Tag> {
      return this.httpService.get(this.REST_API_SERVER + "?lessons=" + lessons).pipe(
          map((res: Tag) => res));
  }
  
  getTagByBooks(books: string): Observable<Tag> {
      return this.httpService.get(this.REST_API_SERVER + "?books=" + books).pipe(
          map((res: Tag) => res));
  }*/
}
