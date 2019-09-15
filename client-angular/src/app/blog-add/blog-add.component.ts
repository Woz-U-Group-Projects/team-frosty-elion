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
  private blogRoute = 'http://localhost:3000/blogs';
  
  constructor(private blogService: BlogService, private router: Router,private http:HttpClient) { }

  newPost: Blog = new Blog();

  onSubmit(){
    this.http.post(this.blogRoute,this.newPost).subscribe((res: Response)=> {
      this.router.navigate(['list'])
    })
  }

  ngOnInit() {
    
  }

}
