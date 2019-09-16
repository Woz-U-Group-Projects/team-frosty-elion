import { Component, OnInit, Input } from '@angular/core';
import { Blog } from '../blog';
import { BlogService } from '../services/blog.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.css']
})

export class BlogAddComponent implements OnInit {
  
  constructor(private blogService: BlogService, private router: Router,private http:HttpClient) { }

  newPost: Blog = new Blog();

  addBlog(): void{
    this.blogService.addBlog(this.newPost).subscribe(()=> {
      this.router.navigate(['list']);
    })
  }

  ngOnInit() {
    
  }

}
