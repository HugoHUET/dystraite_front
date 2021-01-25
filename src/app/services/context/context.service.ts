import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  loggedUser: User;

  constructor() { }

}
