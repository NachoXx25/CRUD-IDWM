import { CreateEbook } from './../../_interfaces/create-ebook';
import { EbookService } from './../../_services/ebook.service';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-ebook',
  templateUrl: './create-ebook.component.html',
  styles: [
  ]
})
export class CreateEbookComponent implements OnInit{
  newEbookForm: FormGroup = new FormGroup({});
  errorMessage: string = '';


  constructor(private router: Router, private fb: FormBuilder, private EbookService: EbookService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this,this.newEbookForm = this.fb.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      format: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });
  }

  CreateEbook() {
    this.EbookService.createEbook(this.newEbookForm.value).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (result) => {
        if (typeof result.error === 'string') {
          this.errorMessage = result.error;
          console.log(this.errorMessage);
        } else {
          this.errorMessage = 'Intente nuevamente';
        }
      }
    });
    }
  }

