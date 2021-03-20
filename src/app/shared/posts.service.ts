import { IPost } from './posts';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  start: number = 0;
  limit: number = 10;
  posts: IPost[] = [];

  constructor(private http: HttpClient) {  }

  

  getPosts(start: number, limit: number) {
    return this.http.get<IPost>(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`).subscribe((data: any) => {
      this.posts.push(...data)
    })
  }
  getAllPosts() {
    return this.posts ;
  }
  addPost(post: IPost) {
    this.posts.unshift(post)
  }



  getPhotos(start: number, limit: number) {
    return this.http.get<IPost>(`http://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=${limit}`)
  }
}
