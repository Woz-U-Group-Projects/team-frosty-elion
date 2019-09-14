import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { Blog } from '../blog';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  blogs: Blog[];
  private blogRoute = 'http://localhost:3000/blogs';
  constructor(private blogService: BlogService, private router: Router,private  http:HttpClient) { }

  // getPost(): void{
  //   this.blogService.getPost().subscribe(b => (this.blogs = b));
  // }

  getBlogs(){
    this.http.get<Blog[]>(this.blogRoute).subscribe(blogs=>{
      this.blogs = blogs;
    });
  }


  ngOnInit() {
    this.getBlogs();
  }

}
