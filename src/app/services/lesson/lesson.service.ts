import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Lesson } from 'src/app/models/lesson/lesson.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private REST_API_SERVER = environment.apiUrl + "/lesson/";

  constructor(private httpService: HttpClient) { }

  getAllLessons(): Observable<Lesson[]> {
    return this.httpService.get(this.REST_API_SERVER).pipe(
      map((res: Lesson[]) => res));
  }

  createLesson(lesson: Lesson): Observable<Lesson> {
    return this.httpService.post<Lesson>(this.REST_API_SERVER, lesson);
  }

  updateLesson(id: number, value: Lesson) {
    return this.httpService.put(this.REST_API_SERVER + id, value);
  }

  deleteLesson(id: number): Observable<Lesson> {
    return this.httpService.delete<Lesson>(this.REST_API_SERVER + id);
  }

  getLessonById(id: number): Observable<Lesson> {
    return this.httpService.get(this.REST_API_SERVER + "?id=" + id).pipe(
      map((res: Lesson) => res));
  }
  // Need backend implementation

  /*
  getLessonByTitle(title: string): Observable<Lesson> {
      return this.httpService.get(this.REST_API_SERVER + "?title=" + title).pipe(
          map((res: Lesson) => res));
  }
  
  getLessonByDescription(description: string): Observable<Lesson> {
      return this.httpService.get(this.REST_API_SERVER + "?description=" + description).pipe(
          map((res: Lesson) => res));
  }
  
  getLessonByContent(content: string): Observable<Lesson> {
      return this.httpService.get(this.REST_API_SERVER + "?content=" + content).pipe(
          map((res: Lesson) => res));
  }
  
  getLessonByThumbnail(thumbnail: string): Observable<Lesson> {
      return this.httpService.get(this.REST_API_SERVER + "?thumbnail=" + thumbnail).pipe(
          map((res: Lesson) => res));
  }
  
  getLessonByVideo(video: string): Observable<Lesson> {
      return this.httpService.get(this.REST_API_SERVER + "?video=" + video).pipe(
          map((res: Lesson) => res));
  }
  
  getLessonByCreatedat(createdat: string): Observable<Lesson> {
      return this.httpService.get(this.REST_API_SERVER + "?createdat=" + createdat).pipe(
          map((res: Lesson) => res));
  }
  
  getLessonByTags(tags: string): Observable<Lesson> {
      return this.httpService.get(this.REST_API_SERVER + "?tags=" + tags).pipe(
          map((res: Lesson) => res));
  }*/
}
