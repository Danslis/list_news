import { Injectable } from '@angular/core'
import { NewsInterface } from '../types/news.interface'
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';




@Injectable()
export class NewsService {
  constructor(private http: HttpClient) {}

  getNews(pageNum: number, limit: number): Observable<NewsInterface[]>{
    const fullUrl = `${environment.apiUrl}/news/${pageNum}/${limit}`
    return this.http.get<NewsInterface>(fullUrl).pipe(
      map((response: any) => {
        return response.news
      }))
  }

  getOneNews(newsUrl: string): Observable<NewsInterface>{
    const fullUrl = `${environment.apiUrl}/news/item/${newsUrl}`
    return this.http.get<NewsInterface>(fullUrl).pipe(
      map((response: any) => {
        return response
      }))
  }
}
