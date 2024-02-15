import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { sectionInterface } from 'src/app/entities/sectionInterface';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css'],
})
export class ServiceListComponent implements OnInit, AfterViewChecked {

  @ViewChildren('item') item!: QueryList<ElementRef>;
  sections: sectionInterface[] = [];
  isLoading = false;
  totalSections: number = 0;  // Le nombre total de sections
  currentPage: number = 1;

  constructor(private sectionsService: SectionService) {}
  ngAfterViewChecked(): void {
    // if (this.item) {
    //   this.item.forEach((element: ElementRef<any>) => {
    //     console.log('element', element.nativeElement.clientWidth);
    //     // Utilisation d'un observateur de mutation pour détecter les changements de taille
    //     const observer = new MutationObserver(() => {
    //       console.log(
    //         "La taille de l'élément a changé:",
    //         element.nativeElement.clientWidth
    //       );
    //     });
    //     // Configuration de l'observateur pour surveiller les modifications de taille
    //     observer.observe(element.nativeElement, {
    //       attributes: true,
    //       childList: true,
    //       subtree: true,
    //     });
    //     this.test();
    //     // Assurez-vous de disconnecter l'observateur lorsque l'élément est détruit
    //     element.nativeElement['__mutationObserver'] = observer;
    //   });
    // }
  }

  onPageChange(event: any) {
    // Mettez à jour la page actuelle lorsque l'utilisateur change de page
    this.currentPage = event.page + 1;
  }

  getCurrentPageSections(): any[] {
    const sectionsPerPage = 1; // Nombre de sections par page (paramétrable)
    const startIndex = this.currentPage - 1 * sectionsPerPage;
    const endIndex = startIndex + sectionsPerPage;
  
    // Extraire les sections pour la page actuelle
    return this.sections.slice(startIndex, endIndex);
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.refreachService();
  }

  refreachService() {
    this.sectionsService.getSection();
    this.sectionsService.$section.subscribe({
      next: (data) => {
        console.log(data);
        data.forEach((element) =>
          console.log('element', element.serviceTypes?.length)
        );
        this.sections = data;
        this.isLoading = false;
      },
      error: (err) => console.log(err),
      complete: () => {},
    });
  }
  calculateContainer(container: HTMLElement) {
    // console.log('container height', container.clientHeight);
    // console.log('container width', container.clientWidth);
    return { height: container.clientHeight, width: container.clientWidth };
  }
  calculateItem(item: HTMLElement) {
    // console.log('item height', item.clientHeight);
    // console.log('item width', item.clientWidth);
    return { height: item.clientHeight, width: item.clientWidth };
  }

  testWhithDom(item: HTMLElement, container: HTMLElement) {}
}
