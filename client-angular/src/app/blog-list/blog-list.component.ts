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
  constructor(private blogService: BlogService, private router: Router,private  http:HttpClient) { }


  ngOnInit() {
    this.blogService.getPost().subscribe(blogs => this.blogs = blogs);
  }

}
