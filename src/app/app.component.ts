import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dynamicForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {
  }
  ngOnInit() {
    this.dynamicForm = this.formBuilder.group({
      numberOfTickets: ['', Validators.required],
      tickets: new FormArray([])
    })
  }
  get controls() {
    return this.dynamicForm.controls;
  }
  get ticketArray() {
    return this.controls.tickets as FormArray;
  }
  onChangeTickets(e) {
    const numberOfTickets = e.target.value || 0;
    if (this.ticketArray.length < numberOfTickets) {
      for (let i = this.ticketArray.length; i < numberOfTickets; i++) {
        this.ticketArray.push(this.formBuilder.group({
          name: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]]
        }));
      }
    } else {
      for (let i = this.ticketArray.length; i >= numberOfTickets; i--) {
        this.ticketArray.removeAt(i);
      }
    }
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.dynamicForm.invalid) {
      return;
    }
    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.dynamicForm.value, null, 4));
  }

  onReset() {
    // reset whole form back to initial state
    this.submitted = false;
    this.dynamicForm.reset();
    this.ticketArray.clear();
  }

  onClear() {
    // clear errors and reset ticket fields
    this.submitted = false;
    this.ticketArray.reset();
  }
}