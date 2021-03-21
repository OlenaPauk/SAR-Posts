import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPhoto } from './posts';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  photos: IPhoto[] = [];

  constructor(private http: HttpClient) { }

  getPhotosFromApi(start: number, limit: number) {
    return this.http.get<IPhoto>(`https://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=${limit}`);
  }

  createPhotos(photosList: IPhoto[]) {
    this.photos.push(...photosList);
  }
  
  getPhotosAll() {
    return this.photos;
  }
}
