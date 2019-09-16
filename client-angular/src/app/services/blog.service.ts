import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Blog } from '../blog';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private router: Router, private http: HttpClient) { }

  // base url of the express back end
  url: string = "http://localhost:3000/blogs";

  getPost(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.url);
  }

  grabBlog(id:number) : Observable<Blog> {
    return this.http.get<Blog>(this.url + "" + id);
  }

  addBlog(blog : Blog) : Observable<Blog>{
    return this.http.post<Blog>(this.url + "/", blog);
  }

  deleteBlog(id:number) : Observable<Blog>{
    return this.http.delete<Blog>(this.url + "/" + id);
  }
    
  editBlog(blog : Blog) : Observable<Blog>{
    return this.http.put<Blog>(this.url + "" + blog.id, blog);
  }

}
