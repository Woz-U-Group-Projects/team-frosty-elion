import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { Blog } from '../blog';

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

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.getPost();
  }

}
