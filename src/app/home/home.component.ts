import { PhotosService } from './../shared/photos.service';
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
  posts: IPost[] = [];
  photos: IPhoto[] = [];
  constructor(private postsService: PostsService, private photosService: PhotosService) { }

  ngOnInit(): void {
    this.getPhotos();
    let allPosts = this.postsService.getPostsAll();
    if (allPosts.length === 0) {
      this.getPostsFromApi();
    }
    else {
      this.getChangePosts()
    }
  }

  getPostsFromApi() {
    this.postsService.getPostsFromApi(this.start, this.limit)
      .subscribe((data: any) => {
        this.posts.push(...data);
      })
  }

  getChangePosts() {
    this.posts = this.postsService.getPostsAll().slice(0, 10)
  }

  getPhotos() {
    this.photosService.getPhotosFromApi(this.start, this.limit)
      .subscribe((data: any) => {
        this.photos.push(...data);
      })
  }

}
