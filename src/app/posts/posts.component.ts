import { PostsService } from './../shared/posts.service';
import { Component, OnInit } from '@angular/core';
import { IPost } from '../shared/posts';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  start: number = 0;
  limit: number = 10;
  posts: IPost[]= [];
  showButton: boolean = true;
  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this. getPosts()
  }
  getPosts() {
    this.postsService.getPosts(this.start, this.limit).subscribe((data:any)=>{
      this.posts.push(...data)
    })
  }
  showMore() {
    this.start += this.limit;
    this.getPosts();
    if(this.start>=81){
      this.showButton=false
    }
  }

}
