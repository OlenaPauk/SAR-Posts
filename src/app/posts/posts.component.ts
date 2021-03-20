import { PostsService } from './../shared/posts.service';
import { Component, OnInit } from '@angular/core';
import { IPost, Post } from '../shared/posts';


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

  post: IPost = new Post(0,'','');

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
  showDialogueNewPost() {
    this.flagNewPost = true;
  }
  createPost() {
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

  showDialogueEditPost(id: number) {
    this.editFlag = true;    
    this.post = this.posts.find(u => u.id === id) || new Post(0,'','');
  }
  saveEditPost() {
    let savePost = this.posts.find(u => u.id === this.post.id) || new Post(0,'','');
    savePost = this.post;
    this.editFlag = false;
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
