import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { prestationInterface } from '../entities/prestationsInterface';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject } from 'rxjs';
import { serviceTypesInterface } from '../entities/service_types';

@Injectable({
  providedIn: 'root',
})
export class ServiceTypeService {
  constructor(private http: HttpClient) {}

  // url = 'http://vps206.tyrolium.fr:2022/api';
  private apiUrl: string = environment.apiUrl + 'service_types';
  private apiUrlUri: string = environment.apiUrlUri;
  private subjectServices = new BehaviorSubject<serviceTypesInterface[]>([]);
  private subjectServicesTypeUri = new BehaviorSubject<any>(null);
  public $servicesTypeUri = this.subjectServicesTypeUri.asObservable();
  public $services = this.subjectServices.asObservable();

  getByUri(uri: string): void {
    this.fetchByUri(uri).subscribe({
      next: (data: any) => this.subjectServicesTypeUri.next(data),
      error: (err) => console.log('err', err),
    });
  }
  fetchByUri(uri: string) {
    return this.http.get(`${this.apiUrlUri}${uri}`);
  }

  getServices() {
    this.fetchAllService().subscribe({
      next: (data) => this.subjectServices.next(data),
    });
  }

  fetchAllService() {
    return this.http.get<serviceTypesInterface[]>(this.apiUrl);
  }

  fetchById(id: string) {
    return this.http.get<serviceTypesInterface>(`${this.apiUrl}/${id}`);
  }

  deleteService(idService: string) {
    return this.http.delete(`${this.apiUrl}/${idService}`);
  }
  addService(service: serviceTypesInterface) {
    console.log('service' + service);

    return this.http.post<serviceTypesInterface>(this.apiUrl, service);
  }
  upDateService(service: serviceTypesInterface, serviceId: number) {
    console.log(serviceId);
    
    return this.http.patch<serviceTypesInterface>(`${this.apiUrl}/12`, service);
  }
}
