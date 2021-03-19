import { IPost } from './posts';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http:HttpClient) { }

  getPosts(start: number, limit: number) {
    return this.http.get<IPost>(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`)
  }
  getPhotos(start: number, limit: number){
    return this.http.get<IPost>(`http://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=${limit}`)
  }
}
