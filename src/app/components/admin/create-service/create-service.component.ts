import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SectionService } from 'src/app/services/section.service';
import { ServiceTypeService } from 'src/app/services/service-type.service';
import { serviceTypesInterface } from 'src/app/entities/service_types';
import { sectionInterface } from 'src/app/entities/sectionInterface';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { selectServiceTypes } from 'src/app/store/selectors/service-type.selector';

import * as  ServiceTypeActions from 'src/app/store/actions/service-types.actions'
import * as  SectionActions from 'src/app/store/actions/section.actions'


@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.css'],
})

// CREATE SERVICE TYPES
export class CreateServiceComponent implements OnInit {
  constructor(
    // Injection du service ServiceTypeService
    private serviceTypesService: ServiceTypeService,
    private sectionService: SectionService,
    // Injection du FormBuilder pour la gestion des formulaires réactifs
    private fb: FormBuilder,
    private store: Store<AppState>
  ) { }

  // Formulaire reactive form
  public form!: FormGroup;
  public formUpdate: any;

  // Données statiques
  public servicesTypes: serviceTypesInterface[] = [];
  public categorySection: sectionInterface[] = [];

  // Messages et états
  public messageSuccess: string = '';
  public displayAddService: boolean = false;
  public pathSectionUri = 'api/sections/';

  // Édition de service
  public isEditor: boolean = false;

  ngOnInit(): void {
    // Initialisation du formulaire réactif
    this.form = this.formBuilder();
    // Chargement des services
    this.getService();
    const selectedTypes = this.store.select(selectServiceTypes).subscribe({
      next: (data) => console.log(data)
    });

  }


  // C R U D           

  // Fonction pour obtenir les services
  getService() {

    // Appel de la méthode getServices() du service ServiceTypeService
    this.serviceTypesService.getServices().subscribe({
      // Fonction appelée lorsqu'une nouvelle valeur est émise par l'observable
      next: (data) => {
        this.servicesTypes = data
      },
      // Fonction appelée en cas d'erreur pendant la récupération des services
      error: (err) => console.log(err),
    });
  }

  // Fonction pour supprimer un service
  deleteService(servicesId: number | undefined) {
    const id: string = '' + servicesId;
    if (servicesId)
      this.serviceTypesService.deleteService(id).subscribe({
        next: (service) => { this.store.dispatch(ServiceTypeActions.deleteServiceType({ serviceTypeId: servicesId })) },
        error: (err) => console.log(err),
        complete: () => {
          this.messageSuccess = 'Service supprimer';
        },
      });

  }
  // Fonction pour ajouter un service
  addService() {

    // Vérification de la validité du formulaire
    if (this.form.valid) {

      // Récupération de l'ID de la section sélectionnée dans le formulaire
      const sectionId = this.form.get('section')?.value;

      // Extraction des noms de fichiers à partir des chemins complets du formulaire
      const pathPicture = this.form
        .get('picture')
        ?.value.split('C:\\fakepath\\')[1];
      const pathIcon = this.form.get('icon')?.value.split('C:\\fakepath\\')[1];

      // Création d'un objet contenant les données du formulaire
      const formData = {
        ...this.form.value,
        section: this.pathSectionUri + sectionId,
        picture: pathPicture,
        icon: pathIcon,
      };

      // Appel du service pour ajouter le service avec les données du formulaire
      this.serviceTypesService.addService(formData).subscribe({
        next: (data) => {
          console.log(data);

          // Fonction appelée en cas de succès de la requête
          this.messageSuccess = 'Service ajouté avec succès';
          this.store.dispatch(ServiceTypeActions.addServiceType({ serviceType: data }))
          if (data.section)
            this.store.dispatch(SectionActions.updateSections({ section: data.section }))
        },
        error: (err) => {
          console.error(err);
        },
        // Fonction appelée lorsque la requête est complètement traitée
        complete: () => {

          // Masquage du formulaire d'ajout
          this.displayAddService = false;
          // Réinitialisation du formulaire
          this.form.reset();
        },
      });
    }
  }
  // Fonction pour mettre à jour un service
  upDateService(article: any) {
    if (this.form.valid) {
      const sectionId = this.form.get('section')?.value;
      const serviceId = this.formUpdate.id;

      const pathPicture = this.form
        .get('picture')
        ?.value.split('C:\\fakepath\\')[1];
      const pathIcon = this.form.get('icon')?.value.split('C:\\fakepath\\')[1];
      const formData = {
        ...this.form.value,
        section: this.pathSectionUri + sectionId,
        picture: pathPicture,
        icon: pathIcon,
      };
      console.log(formData);

      this.serviceTypesService.upDateService(formData, serviceId).subscribe({
        next: (data) => {
          console.log('data', data);
          this.store.dispatch(ServiceTypeActions.updateServiceType({ serviceType: data }))
        },
        error: (err) => console.log('err', err),
        complete: () => {
          this.isEditor = !this.isEditor;
          this.messageSuccess = 'Article modifier avec succès';
          this.form.reset();
        },
      });
    }
  }


  // Fonction pour obtenir les catégories de section
  getCategoriesSection() {
    this.sectionService.getSection().subscribe({
      next: (categories) => {
        this.categorySection = categories;
        console.log('cat', categories);

      },
      error: (err) => console.log(err),
    });
  }

  // Fonction pour initialiser le FormBuilder
  formBuilder() {
    // Utilisation du FormBuilder pour créer un groupe de contrôles avec des validations
    return this.fb.group({
      // Champ 'name' avec validation requise
      name: ['', Validators.required],
      description: ['', Validators.required],
      picture: ['', Validators.required],
      section: ['', Validators.required],
      icon: ['', Validators.required],
    });
  }
  // Fonction pour charger les données dans le formulaire lors de la mise à jour
  loadFormBuilder(articleId: number) {
    const id: string = '' + articleId;
    const pathUri = '/api/services/';
    let serviceUri: string[] = [];

    this.serviceTypesService.fetchById(id).subscribe({
      next: (data) => {
        console.log(data);
        this.formUpdate = {
          id: data.id,
          name: data.name,
          description: data.description,
          section: data.section,
          picture: [''],
          icon: [''],
        };
        this.form.patchValue(this.formUpdate);
      },
      error: (err) => console.log(err),
    });
  }


  // Fonction pour basculer l'affichage du formulaire d'ajout de service
  toggleAddService() {
    this.displayAddService = !this.displayAddService;
    this.getCategoriesSection();
    this.form = this.formBuilder();

  }
  // Fonction pour afficher le formulaire de mise à jour
  showUpDate(servicesId: number | undefined) {
    this.isEditor = true;
    if (servicesId) {
      this.loadFormBuilder(servicesId);
      this.getCategoriesSection();
    }
  }
  // Fonction pour fermer le formulaire de mise à jour
  closeUpDate() {
    this.isEditor = false;
  }

  // Fonction pour basculer la sélection d'un service
  toggleServiceChecked(serviceId: number | undefined): boolean | void {
    const selectService = this.form.get('articles') as FormArray;
    const pathService = '/api/articles/';
    const id: string = '' + serviceId;

    if (serviceId !== undefined) {
      if (selectService.value.includes(id)) {
        const index = selectService.value.indexOf(id);
        selectService.removeAt(index);
      } else {
        console.log(pathService + this.fb.control(id));

        selectService.push(this.fb.control(id));
      }
    }
  }
  // Fonction pour vérifier si un service est sélectionné
  isSelectedService(serviceId: number | undefined): boolean {
    const selectedServices = this.form.get('articles');
    return !!selectedServices && selectedServices.value.includes(serviceId);
  }
  // Fonction pour gérer la sélection de fichiers
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    // this.form.patchValue({
    //   file,
    // });
    if (file) {
      const formData = new FormData();
      formData.append('picture', file);
    }
  }

  getServiceUri() {
    //   this.articleService.$articles.subscribe({
    //     next: (articles) => (this.articles = articles),
    //     error: (err) => console.log(err),
    //   });
  }
}
