import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from 'src/app/shared/posts.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  photoId: number;
  constructor(private route: Router, public postsService: PostsService, private activateRoute: ActivatedRoute) {
    this.photoId = activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
  }
  back() {
    this.route.navigate(['/gallery'])
  }

}
