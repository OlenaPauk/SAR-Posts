import { Component, OnInit } from '@angular/core';
import { IPhoto } from '../shared/posts';
import { PostsService } from '../shared/posts.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  start: number = 0;
  limit: number = 10;
  photos: IPhoto[]= [];
  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.getPhotos() 
  }
  getPhotos() {
    this.postsService.getPhotos(this.start, this.limit).subscribe((data:any)=>{
      this.photos.push(...data)
    })
  }

}
