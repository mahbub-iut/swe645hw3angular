
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PipeTransform, Pipe } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Form Validation Tutorial';
  readonly ROOT_URL = "https://jsonplaceholder.typicode.com";
  posts: Observable<any[]> | undefined;
  angForm: FormGroup;
  websiteList: any = [
    { id: 1, name: 'Students' },
    { id: 2, name: 'Location' },
    { id: 3, name: 'Campus' },
    { id: 4, name: 'Dorm' },
    { id: 5, name: 'Atmsosphere' },
    { id: 6, name: 'Campus' },
  ];

  likes: any = ['Very likely', 'Likely', 'Unlikely'];


  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.createForm();
  }
  createForm() {
    this.angForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      tel_num: ['', Validators.required],
      email: ['', Validators.required],
      dos: ['', Validators.required],
      likings: this.fb.array([], [Validators.required]),
      likelihood: new FormControl('', Validators.required),
      interested: new FormControl('', Validators.required)
    });
  }
  get f() {
    return this.angForm.controls;
  }
  onCheckboxChange(e) {
    const likes: FormArray = this.angForm.get('likings') as FormArray;

    if (e.target.checked) {
      likes.push(new FormControl(e.target.value));
    } else {
      const index = likes.controls.findIndex(x => x.value === e.target.value);
      likes.removeAt(index);
    }
  }


  getPosts() {
    this.posts = this.http.get<any[]>(this.ROOT_URL + '/posts');
    // this.http.get(this.ROOT_URL + '/posts')
    //   .subscribe((posts: any[]) => {
    //     this.angForm = this.fb.group({
    //       capabilities: this.fb.array(posts.map(datum => this.generateDatumFormGroup(datum)))
    //     });
    //   });
  }
  



  submitForm() {

    // console.log(this.angForm.value);
    if (this.angForm.valid) {
      this.http.post(this.ROOT_URL + '/posts', this.angForm.value).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      )
    }


  }

  resetForm() {
    this.angForm.reset();
  }





}