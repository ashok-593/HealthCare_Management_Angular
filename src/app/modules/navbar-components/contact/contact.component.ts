import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Corrected import

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'] // Corrected property name
})

export class ContactComponent implements OnInit {
  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Initialization logic here
  }

  submitForm() {
    alert("Mail sent Successfully");
    this.cdr.detectChanges();
    this.router.navigate(['home']);
  }
}
