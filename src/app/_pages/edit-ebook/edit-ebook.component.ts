import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ebook } from 'src/app/_interfaces/ebook';
import { EbookService } from 'src/app/_services/ebook.service';

@Component({
  selector: 'app-edit-ebook',
  templateUrl: './edit-ebook.component.html'

})
export class EditEbookComponent implements OnInit {
  editForm: FormGroup;
  ebookId!: number;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private ebookService: EbookService,
    private router: Router
  ) {
    this.editForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      format: ['', [Validators.required]],
      price: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.ebookId = parseInt(this.route.snapshot.paramMap.get('id') ?? '');
    if (this.ebookId) {
      this.ebookService.getEbookById(this.ebookId).subscribe({
        next: (ebook) => {
          this.editForm.patchValue(ebook);
        },
        error: (err) => {
          err = 'Error al cargar el ebook';
          this.errorMessage = err;
        }
      });
    }
  }

  updateEbook() {
    if (this.editForm.valid) {
      this.ebookService.updateEbook(this.ebookId, this.editForm.value).subscribe({
        next: (res) => {
          console.log("Editado correctamente");
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err)
          this.errorMessage = err;
        }
      });
    }
  }
}
