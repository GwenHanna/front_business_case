import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {
  // Sujets observables pour indiquer si l'appareil est un handset (téléphone) ou une tablette
  isHandsetSubject = new BehaviorSubject<boolean>(false);
  isTabletSubject = new BehaviorSubject<boolean>(false);
  isMediumSubject = new BehaviorSubject<boolean>(false);

  // Observables associés aux sujets pour permettre aux composants de s'abonner aux changements
  isHandset: Observable<boolean> = this.isHandsetSubject.asObservable();
  isTablet: Observable<boolean> = this.isTabletSubject.asObservable();
  isMedium: Observable<boolean> = this.isMediumSubject.asObservable();

  constructor(private responsive: BreakpointObserver) {
    // Appelle la méthode pour initialiser l'écoute des points de rupture
    this.getResponsive();
  }

  // Méthode pour observer les points de rupture et mettre à jour les sujets observables en conséquence
  getResponsive() {
    // Observer le point de rupture pour les Handsets (téléphones)
    this.responsive.observe(Breakpoints.Handset).subscribe({
      next: (data) => {
        // Mettre à jour le sujet observable associé avec l'état actuel du point de rupture
        this.isHandsetSubject.next(data.matches);
      },
    });

    // Observer les points de rupture pour les Tablettes (paysage et portrait)
    this.responsive
      .observe([
        Breakpoints.TabletLandscape,
        Breakpoints.TabletPortrait,
        Breakpoints.Small,
      ])
      .subscribe({
        next: (data) => {
          // Mettre à jour le sujet observable associé avec l'état actuel du point de rupture
          this.isTabletSubject.next(data.matches);
        },
      });

    this.responsive.observe(Breakpoints.Medium).subscribe({
      next: (data) => {
        // Mettre à jour le sujet observable associé avec l'état actuel du point de rupture
        this.isMediumSubject.next(data.matches);
      },
    });
  }
}
