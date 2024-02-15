import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { articleInterface } from 'src/app/entities/articleInterface';
import { categoryInterface } from 'src/app/entities/categoryInterface';
import { serviceInterface } from 'src/app/entities/serviceInterface';
import { ArticleService } from 'src/app/services/serviceArticle.service';
import { CategoryService } from 'src/app/services/category.service';
import { ServiceTypeService } from 'src/app/services/service-type.service';
import { map } from 'rxjs';
import { sectionInterface } from 'src/app/entities/sectionInterface';
import { SectionService } from 'src/app/services/section.service';
import { serviceTypesInterface } from 'src/app/entities/service_types';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css'],
})
export class CreateArticleComponent implements OnInit {
  // DATA
  serviceTypes: serviceTypesInterface[] = [];
  services: serviceInterface[] = [];

  // Formulaire
  formAddArticle!: FormGroup;
  formUpdate: any

  // Path
  pathPicture = '../../../../assets/articles/';
  pathUriServices = '/api/service_types/';

  //Utils
  messageSuccess = '';
  displayAddArticle: boolean = false;
  isEditor: boolean = false;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private servicesService: ServiceTypeService,
    private sectionService: SectionService
  ) { }
  ngOnInit(): void {
    this.getServices();
    this.getServiceType();
    this.formAddArticle = this.buildFormBuilder();

  }

  getServiceType() {
    this.servicesService.getServices();
    this.servicesService.services$.subscribe({
      next: (data) => {
        this.serviceTypes = data
      },
      error: (err) => console.log(err)

    })
  }

  // CRUD
  upDateArticle(article: articleInterface) {


    const articleId = this.formUpdate.id
    const serviceTypeId = this.formAddArticle.get('serviceType')?.value;

    const pathPicture = this.formAddArticle.get('picture')?.value.split('C:\\fakepath\\')[1];

    const formData = {
      ...this.formAddArticle.value,
      serviceType: this.pathUriServices + serviceTypeId,
      picture: pathPicture,
    };
    console.log(articleId);
    console.log(formData);

    this.articleService.upDateArticle(formData, articleId).subscribe({
      next: (data) => {
        this.messageSuccess = 'Modification effectuer avec succès'
        console.log(data);

      },
      error: (err) => console.log(err),
      complete: () => {
        this.getServiceType();
        this.getServices()
        this.isEditor = !this.isEditor
      }
    });
  }

  addArticle() {
    if (this.formAddArticle.valid) {

      const selectService = this.formAddArticle.value.serviceType;

      // const sectionId = this.formAddArticle.get('section')?.value;
      // const uriSection = `/api/sections/${sectionId}`;
      const pathPicture = this.formAddArticle.get('picture')?.value.split('C:\\fakepath\\')[1];

      const formData = {
        ...this.formAddArticle.value,
        picture: pathPicture,
        // section: uriSection,
        serviceType: `${this.pathUriServices}${selectService}`,
      };
      console.log(formData);


      this.articleService.addArticle(formData).subscribe({
        next: (data) => {
          this.getServices()
        },
        error: (err) => console.log(err),
        complete: () => {
          this.displayAddArticle = false;
          this.messageSuccess = 'Article ajouter avec succès';
          this.formAddArticle.reset()
        },
      });
    }
  }

  deleteArticle(articleId: number | undefined) {
    const id: string = '' + articleId;
    this.articleService.deleteArticle(id).subscribe({
      error: (err) => console.log(err),
      next: () => {
        this.messageSuccess = 'Article suprimmer avec succès !';
        this.getServices();
      },
    });
  }

  // UTILS
  toggleAddArticle() {
    this.displayAddArticle = !this.displayAddArticle;
    this.formAddArticle = this.buildFormBuilder();
  }
  showUpDate(idArticle: number | undefined) {
    console.log(idArticle);
    this.isEditor = true;

    if (idArticle)
      this.loadFormBuilder(idArticle);
  }
  closeUpDate() {
    this.isEditor = false;
    console.log(this.isEditor);
  }


  getServices() {
    this.articleService.getServices();
    this.articleService.$articles.subscribe({
      next: (articles) => {
        this.services = articles;
        console.log(this.services);


      },
      error: (err) => console.log(err),
    });
  }
  toggleServiceChecked(serviceId: number | undefined): void {
    const selectService = this.formAddArticle.get('serviceType'); // Assurez-vous que 'serviceType' est déclaré dans le FormGroup

    if (serviceId !== undefined) {
      // Mettez à jour la valeur du FormControl avec l'ID du service sélectionné
      if (selectService)
        selectService.setValue(serviceId);
    }
  }

  isSelectedService(serviceId: number | undefined): boolean {
    const selectedService = this.formAddArticle.get('serviceType')?.value;
    return selectedService === serviceId;
  }

  // INIT formulaire
  buildFormBuilder() {
    return this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      // section: [''],
      picture: ['', Validators.required],
      serviceType: [null, Validators.required],
    });
  }
  loadFormBuilder(articleId: number) {
    const id: string = '' + articleId;
    const pathUri = '/api/service_types/';
    let serviceUri: string[] = [];

    this.articleService.fetchById(id).subscribe({
      next: (data) => {
        console.log(data.serviceType);
        this.formUpdate = {
          id: data.id,
          name: data.name,
          price: data.price,
          picture: [''],
          serviceType: data.serviceType,
        }
        this.formAddArticle.patchValue(this.formUpdate)
      },
    });
  }

  // Upload File
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.formAddArticle.patchValue({
      file,
    });
    if (file) {
      const formData = new FormData();
      formData.append('picture', file);
    }
    console.log(this.formAddArticle);
  }
}
