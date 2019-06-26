import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent implements OnInit {

  profileForm2 = new FormGroup(
    {
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      address: new FormGroup(
        {
          street: new FormControl(''),
          city: new FormControl(''),
          state: new FormControl(''),
          zip: new FormControl('')
        }
      )
    }
  );

  profileForm = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: this._formBuilder.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    }),
    aliases: this._formBuilder.array([
      this._formBuilder.control('')
    ])
  })

  names = false;

  constructor(private _formBuilder : FormBuilder) { }

  ngOnInit() {
  }

  onSubmit() {
    console.warn(this.profileForm.value);
    this.names = false;
    this.profileForm.reset();
  }

  checkInvalid() {
    //console.log(this.names);
    if (this.profileForm.value.firstName == null || this.profileForm.value.lastName == null || this.profileForm.value.firstName == "" || this.profileForm.value.lastName == "" ) {
      this.names = false;
      return false;
    } else {
      this.names = true;
      return true;
    }
  }

  updateProfile() {
    // Patch value changes the values in the field provided while leaving the other fields untouched
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: 'Blk 878',
        zip: '123'
      }
    });
  }

  //'get' is to make the return into a property which can then be accessed using this.<property>
  get aliases() {
    //console.log(this.profileForm.get('aliases') as FormArray);
    return this.profileForm.get('aliases') as FormArray;
  }

  addAlias() {
    this.aliases.push(this._formBuilder.control(''));
  }
}
