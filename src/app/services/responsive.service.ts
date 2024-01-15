import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {
  isHandsetSubject = new BehaviorSubject<boolean>(false);
  isTabletSubject = new BehaviorSubject<boolean>(false);

  isHandset: Observable<boolean> = this.isHandsetSubject.asObservable();
  isTablet: Observable<boolean> = this.isTabletSubject.asObservable();
  constructor(private responsive: BreakpointObserver) {
    this.getTest();
  }

  getTest() {
    this.responsive.observe(Breakpoints.Handset).subscribe({
      next: (data) => {
        this.isHandsetSubject.next(data.matches);
      },
    });

    this.responsive
      .observe([Breakpoints.TabletLandscape, Breakpoints.TabletPortrait])
      .subscribe({
        next: (data) => {
          this.isTabletSubject.next(data.matches);
        },
      });
  }
}
