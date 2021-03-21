import { IPost } from './posts';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  posts: IPost[] = [];

  constructor(private http: HttpClient) { }

  getPostsFromApi(start: number, limit: number) {
    return this.http.get<IPost>(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`)
  }
  createPosts(postsList: IPost[]) {
    this.posts.push(...postsList);
  }
  getPostsAll() {
    return this.posts;
  }
  addPost(post: IPost) {
    this.posts.unshift(post)
  }
  deletePost(id: number) {
    this.posts = this.posts.filter(post => post.id !== id);
  }
}
