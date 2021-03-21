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

  postEdit: IPost = new Post(0, '', '');
  postNew: IPost = new Post(0, '', '');

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
    this.postNew = new Post(Date.now(), '', '');
    this.flagNewPost = true;
  }

  createPost() {
    if (this.postNew.title.trim() && this.postNew.body.trim()) {
      this.posts.unshift(this.postNew)
      this.postsService.addPost(this.postNew)

      this.flagNewPost = false;
      this.counter--;
    }
  }

  showDialogueEditPost(id: number) {
    this.editFlag = true;
    this.postEdit = Object.assign({}, this.posts.find(u => u.id === id) || new Post(0, '', ''));
    document.body.style.overflow = "hidden";
  }

  saveEditPost() {
    let savePost = this.posts.find(post => post.id === this.postEdit.id) || new Post(0, '', '');
    savePost.title = this.postEdit.title;
    savePost.body = this.postEdit.body;

    this.editFlag = false;
    document.body.style.overflow = "";
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
