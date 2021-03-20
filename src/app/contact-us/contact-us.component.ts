import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  contactForm: FormGroup;
  constructor() {
    this.contactForm = new FormGroup({

      "userName": new FormControl("", Validators.required),
      "userEmail": new FormControl("", [
        Validators.required,
        Validators.email
      ]),
      "userPhone": new FormControl("", Validators.pattern("(/^\(\d{3}\)\s\d{3}-\d{4}$/)"))
    });
  }

  ngOnInit(): void {
  }
  submit() { }

}
