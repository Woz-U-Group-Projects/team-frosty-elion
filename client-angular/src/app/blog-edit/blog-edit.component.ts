import { Component, OnInit } from '@angular/core';
import { Blog } from '../blog';
import { BlogService } from '../services/blog.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent implements OnInit {
  editBlog: Blog = new Blog();
  private blogRoute = 'http://localhost:3000/blogs';
  constructor(private blogService: BlogService, private router: Router,private  http:HttpClient) { }

  

  saveBlog() {
    this.blogService.editBlog(this.editBlog).subscribe(blogs => this.router.navigate(["list"]));
  }

 
 
  ngOnInit() {
  }

}
