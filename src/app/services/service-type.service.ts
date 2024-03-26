import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import {
  BehaviorSubject,
  Observable,
  catchError,
  of,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';
import { serviceTypesInterface } from '../entities/service_types';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { selectServiceTypes } from '../store/selectors/service-type.selector';
import * as ServiceTypeActions from '../store/actions/service-types.actions';
@Injectable({
  providedIn: 'root',
})
export class ServiceTypeService {
  // Instance du service HttpClient qui permet les requêtes HTTP
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  // URL de l'API pour les types de service
  private apiUrl: string = environment.apiUrl + 'service_types';

  // URL de base pour les URI des services
  private apiUrlUri: string = environment.apiUrlUri;

  // Sujet BehaviorSubject pour émettre les services récupérés
  private subjectServices = new BehaviorSubject<serviceTypesInterface[]>([]);
  public services$ = this.subjectServices.asObservable();

  // Sujet BehaviorSubject pour émettre les détails d'un service par URI
  private subjectServicesTypeUri = new BehaviorSubject<any>(null);
  public servicesTypeUri$ = this.subjectServicesTypeUri.asObservable();

  // Fonction pour obtenir tous les type de service services
  getServices(): Observable<any> {
    return this.store.select(selectServiceTypes).pipe(
      // Utilisation de switchMap pour gérer les observables imbriqués
      switchMap((data) => {
        if (data !== undefined && data.length === 0) {
          // Si les données sont absentes ou vides, je fait une requête asynchrone pour les récupérer
          return this.fetchAllService().pipe(
            // Utilisation de tap pour effectuer une action sans affecter le flux principal
            tap((serviceTypes) =>
              this.store.dispatch(
                ServiceTypeActions.setServiceTypes({ serviceTypes })
              )
            )
          );
        } else {
          // Si les données sont déjà présentes, retournez-les directement
          return of(data);
        }
      }),
      // Utilisation de catchError pour gérer les erreurs éventuelles
      catchError((err) => {
        console.error('Erreur lors de la récupération des services', err);
        return err;
      })
    );
  }

  // Fonction pour obtenir les détails d'un service par son URI
  getServiceById(id: string): void {
    this.fetchById(id).subscribe({
      next: (data: any) => this.subjectServicesTypeUri.next(data),
      error: (err) => console.log('err', err),
    });
  }

  // Fonction pour effectuer la requête GET pour obtenir tous les services
  fetchAllService() {
    return this.http.get<serviceTypesInterface[]>(this.apiUrl);
  }

  // Fonction pour effectuer la requête GET pour obtenir un service par son ID
  fetchById(id: string) {
    return this.http.get<serviceTypesInterface>(`${this.apiUrl}/${id}`);
  }
  // Fonction pour effectuer la requête DELETE pour supprimer un service
  deleteService(idService: string) {
    return this.http.delete(`${this.apiUrl}/${idService}`);
  }
  // Fonction pour effectuer la requête POST pour ajouter un nouveau service
  addService(
    service: serviceTypesInterface
  ): Observable<serviceTypesInterface> {
    return this.http.post<serviceTypesInterface>(this.apiUrl, service);
  }
  // Fonction pour effectuer la requête PATCH pour mettre à jour un service
  upDateService(service: serviceTypesInterface, serviceId: number) {
    return this.http.patch<serviceTypesInterface>(
      `${this.apiUrl}/${serviceId}`,
      service
    );
  }
}
