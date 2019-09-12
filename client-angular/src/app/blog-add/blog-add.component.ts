import { Component, OnInit } from '@angular/core';
import { Blog } from '../blog';
import { BlogService } from '../services/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.css']
})

export class BlogAddComponent implements OnInit {

  newPost: Blog = new Blog();

  addPost() {
    this.blogService.addPost(this.newPost).subscribe(
      b => this.router.navigate(["list"])
    );
  }

  constructor(private blogService: BlogService, private router: Router) { }

  ngOnInit() {
  }

}
