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
  posts: IPost[] = [];

  titleNewPost: string = '';
  bodyNewPost: string = '';
  titleEditPost: string = '';
  bodyEditPost: string = '';

  showButton: boolean = true;
  flagNewPost: boolean = false;
  editFlag: boolean = false

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.getPosts()
  }
  getPosts() {
    this.postsService.getPosts(this.start, this.limit).subscribe((data: any) => {
      this.posts.push(...data)
    })
  }
  createNewPost() {
    this.flagNewPost = true;
  }
  addPost() {
    if (this.titleNewPost.trim() && this.bodyNewPost.trim()) {
      const newPost: IPost = {
        id: Date.now(),
        title: this.titleNewPost,
        body: this.bodyNewPost
      }

      this.posts.unshift(newPost);
      this.titleNewPost = '';
      this.bodyNewPost = '';
      this.flagNewPost = false;
    }

  }

  editPost(id: number) {
    this.editFlag = true;
    let editPost: IPost | any = this.posts.find(post => post.id === id);
    this.titleEditPost = editPost?.title
    this.bodyEditPost = editPost?.body
  }
  saveEditPost() {

  }

  deletePost(id: number) {
    this.posts = this.posts.filter(post => post.id !== id);
  }
  showMore() {
    this.start += this.limit;
    this.getPosts();
    if (this.start >= 81) {
      this.showButton = false
    }
  }

}
