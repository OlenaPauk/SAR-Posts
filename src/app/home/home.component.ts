import { PostsService } from './../shared/posts.service';
import { Component, OnInit } from '@angular/core';
import { IPhoto, IPost } from '../shared/posts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  start: number = 0;
  limit: number = 10;
  posts: IPost[]= [];
  photos: IPhoto[]= [];
  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.getPosts();
    this.getPhotos() 
  }
  getPosts() {
    this.postsService.getPosts(this.start, this.limit).subscribe((data:any)=>{
      this.posts.push(...data)
    })
  }
  getPhotos() {
    this.postsService.getPhotos(this.start, this.limit).subscribe((data:any)=>{
      this.photos.push(...data)
    })
  }

}
