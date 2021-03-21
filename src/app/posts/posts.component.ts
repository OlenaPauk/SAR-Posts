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
  counter: number = 0;
  posts: IPost[] = [];

  titleNewPost: string = '';
  bodyNewPost: string = '';

  post: IPost = new Post(0, '', '');

  showButton: boolean = true;
  flagNewPost: boolean = false;
  editFlag: boolean = false

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    let existingPosts = this.postsService.getPostsAll();
    if (existingPosts.length == 0) {
      this.getPosts();
    }
    else {
      this.posts.push(...existingPosts);
    }
  }
  getPosts() {
    this.postsService.getPostsFromApi(this.start, this.limit)
      .subscribe((data: any) => {
        this.posts.push(...data);
        this.postsService.createPosts(data)
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
      console.log(newPost)
      this.posts.unshift(newPost)
      this.postsService.addPost(newPost)
      this.titleNewPost = '';
      this.bodyNewPost = '';
      this.flagNewPost = false;
      this.counter--;
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
    this.counter++;
    this.postsService.deletePost(id);
    this.posts = this.postsService.getPostsAll().slice(0)
  }

  showMore() {
    this.start = this.posts.length + this.counter;
    this.getPosts();
    if (this.start >= 81) {
      this.showButton = false
    }
  }
}
