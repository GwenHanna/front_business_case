import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serviceInterface } from '../entities/serviceInterface';
import { prestationInterface } from '../entities/prestationsInterface';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient) {}

  // url = 'http://vps206.tyrolium.fr:2022/api';
  private apiUrl: string = environment.apiUrl + 'services';
  private subjectServices = new BehaviorSubject<serviceInterface[]>([]);
  public $services = this.subjectServices.asObservable();

  getServices() {
    this.fetchAllService().subscribe({
      next: (data) => this.subjectServices.next(data),
    });
  }

  fetchAllService() {
    return this.http.get<serviceInterface[]>(this.apiUrl);
  }

  fetchById(id: string) {
    return this.http.get<prestationInterface>(`${this.apiUrl}/${id}`);
  }

  deleteService(idService: string) {
    return this.http.delete(`${this.apiUrl}/${idService}`);
  }
  addService(service: serviceInterface) {
    console.log('service' + service);

    return this.http.post<serviceInterface>(this.apiUrl, service);
  }
  upDateService(service: serviceInterface) {
    return this.http.patch<serviceInterface>(this.apiUrl, service);
  }
}
