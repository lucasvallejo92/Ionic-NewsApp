import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { INewResponse } from '../interfaces/INewResponse.interface';
import { Observable } from 'rxjs';

const apiKey = environment.apiKey;
const newsUrl = environment.newsUrl;
const headers = new HttpHeaders({ 'X-Api-key': apiKey });

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  url: string;
  page: number;
  category: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = ``;
    this.page = 0;
  }

  private executeQuery<T>(query: string): Observable<T> {
    query = newsUrl + query;
    return this._http.get<T>(query, { headers });
  }

  topHeadlines(): Observable<INewResponse> {
    this.page++;
    return this.executeQuery<INewResponse>(`/top-headlines?country=us&page=${this.page}`);
  }

  byCategory(category: string): Observable<INewResponse> {
    this.page = category === this.category ? this.page + 1 : 0;
    this.category = category;
    return this.executeQuery<INewResponse>(`/top-headlines?country=us&page=${this.page}&category=${category}`);
  }

}
