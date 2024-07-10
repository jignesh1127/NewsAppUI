import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Story } from '../models/Story';

@Injectable({
  providedIn: 'root'
})
export class NewsfeedService {

  public apiUrl = 'https://newsfeeder.azurewebsites.net/api/NewsFeed';

  constructor(private http: HttpClient) {}

  getStories(page: number, pageSize: number): Observable<Story[]> {
    return this.http.get<Story[]>(`${this.apiUrl}/latestnews?page=${page}&pageSize=${pageSize}`);
  }

  searchStories(query: string): Observable<Story[]> {
    return this.http.get<Story[]>(`${this.apiUrl}/search?query=${query}`);
  }
}
