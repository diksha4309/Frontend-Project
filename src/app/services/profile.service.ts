import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from 'selenium-webdriver/firefox';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private apiService:ApiService) { }

  get(username:string):Observable<Profile>{
    return this.apiService.get('/profiles/'+ username)
    .pipe(map((data : {profile:Profile}) => data.profile));
  }
}
