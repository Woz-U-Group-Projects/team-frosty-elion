import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { Blog } from '../blog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  blogs: Blog[];

  getPost(): void{
    this.blogService.getPost().subscribe(b => (this.blogs = b));
  }

  constructor(private blogService: BlogService, private router: Router) { }

  ngOnInit() {
    this.getPost();
  }

}
