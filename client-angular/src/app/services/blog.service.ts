import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Blog } from '../blog';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  // base url of the express back end
url: string = "http://localhost:3000/blogs";

getPost(): Observable<Blog[]> {
  return this.http.get<Blog[]>(this.url);
}

addPost(blog : Blog) : Observable<Blog>{
  return this.http.post<Blog>(this.url, blog);
}
  
constructor(private http: HttpClient) { }

  
}
