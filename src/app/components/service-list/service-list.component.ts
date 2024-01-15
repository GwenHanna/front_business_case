import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
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
