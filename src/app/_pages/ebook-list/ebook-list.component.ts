import { CreateEbook } from 'src/app/_interfaces/create-ebook';
import { EbookService } from './../../_services/ebook.service';
import { Component, OnInit } from '@angular/core';
import { Ebook } from 'src/app/_interfaces/ebook';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ebook-list',
  templateUrl: './ebook-list.component.html',
  styles: [
  ]
})
export class EbookListComponent implements OnInit {
  ebooks: Ebook[] = [];

  constructor(private EbookService: EbookService, private router: Router) { }

  ngOnInit(): void {
    this.getEbooks();
  }

  getEbooks() {
    this.EbookService.getEbooks().subscribe({
      next: (ebooks: any) => {
        this.ebooks = ebooks;
      },
      error: (result) => {
        console.log(result);
      }
    });
  }

  editEbook(id: number) {
    this.router.navigate(['/editEbook', id]);
  }

  deleteEbook(id: number) {
    this.EbookService.deleteEbook(id).subscribe({
      next: () => {
        this.getEbooks();
      },
      error: (result) => {
        console.log(result);
      }
    });
  }
}
