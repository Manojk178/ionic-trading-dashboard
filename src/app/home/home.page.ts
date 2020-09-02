import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private todo: FormGroup;
  constructor( private formBuilder: FormBuilder ) {
    this.todo = this.formBuilder.group({
      title: [''],
      comments: ['', Validators.required],
      track: ['', Validators.required],
      inbound: ['', Validators.required]
    });
  }

  logForm(){
    console.log(this.todo.value);
  }

}
