import { PostsService } from './../shared/posts.service';
import { Component, OnInit } from '@angular/core';
import { IPost, Post } from '../shared/posts';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {


  posts: IPost[] = [];

  titleNewPost: string = '';
  bodyNewPost: string = '';

  post: IPost = new Post(0,'','');

  showButton: boolean = true;
  flagNewPost: boolean = false;
  editFlag: boolean = false

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    // this.postsService.getPosts(0,10);
    this.getPosts()
  }
  getPosts() {
   this.posts =  this.postsService.getAllPosts()
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

     this.postsService.addPost(newPost)
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
    // this.start += this.limit;
    // this.getPosts();
    // if (this.start >= 81) {
    //   this.showButton = false
    // }
  }

}
