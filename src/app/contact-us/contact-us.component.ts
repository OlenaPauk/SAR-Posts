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
      "userPhone": new FormControl("", [Validators.required, Validators.pattern(/^(?:\+3)?8?(0\d{9})$/)])
    });
  }

  ngOnInit(): void {
  }
  submit() { 
    this.contactForm.reset()
  }

}
