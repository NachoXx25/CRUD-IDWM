import { CreateEbook } from './../_interfaces/create-ebook';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment.development';
import { Observable, map } from 'rxjs';
import { Ebook } from '../_interfaces/ebook';

@Injectable({
  providedIn: 'root',
})
export class EbookService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createEbook(ebook: any){
    return this.http.post<CreateEbook>(`${this.baseUrl}/api/ebook`, ebook).pipe(
      map((ebooks: CreateEbook) => {
        if (ebooks) {
          return ebooks;
        }else {
          throw new Error('error!');
        }
      })
    );
  }

  getEbooks(): Observable<Ebook[]> {
    return this.http.get<Ebook[]>(`${this.baseUrl}/api/ebook`);
  }

  deleteEbook(id: number){
    return this.http.delete<Ebook>(`${this.baseUrl}/api/ebook/${id}`);
  }

  updateEbook(id: number, ebook: any){
    return this.http.put<Ebook>(`${this.baseUrl}/api/ebook/${id}`, ebook);
  }
  getEbookById(id: number){
    return this.http.get<Ebook>(`${this.baseUrl}/api/ebook/${id}`);
  }
}
