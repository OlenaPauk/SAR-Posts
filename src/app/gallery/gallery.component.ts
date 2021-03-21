import { IPhoto } from './../shared/posts';
import { PhotosService } from './../shared/photos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  start: number = 0;
  limit: number = 20;
  photos: IPhoto[] = [];

  constructor(private photosService: PhotosService) { }

  ngOnInit(): void {
    let existingPhotos = this.photosService.getPhotosAll();
    if (existingPhotos.length == 0) {
      this.getPhotos();
    }
    else {
      this.photos.push(...existingPhotos);
    }
  }

  getPhotos() {
    this.photosService.getPhotosFromApi(this.start, this.limit)
      .subscribe((data: any) => {
        this.photos.push(...data);
        this.photosService.createPhotos(data)
      })
  }

  showMore() {
    this.start = this.photos.length;
    this.getPhotos();
  }
}
