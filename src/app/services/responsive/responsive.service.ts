import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  isMobile: boolean;

  constructor() {
    this.isMobile = window.innerWidth < 1025;
  }
}
