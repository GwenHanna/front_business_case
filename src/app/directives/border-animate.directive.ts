import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appBorderAnimate]',
})
export class BorderAnimateDirective {
  // ElementRef selectionne l'élément Natif du DOM / Renderer2 permet d'appliquer du style
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  // Le décorateur @HostListener déclare un Evenement DOM à écouter et fournit une méthode de gestionnaire à exécuter
  @HostListener('mouseenter') onMouseEnter() {
    console.log('ok');

    this.addBorderAnimation();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.removeBorderAnimation();
  }

  private addBorderAnimation() {
    this.renderer.addClass(this.el.nativeElement, 'border-animate');
  }

  private removeBorderAnimation() {
    this.renderer.removeClass(this.el.nativeElement, 'border-animate');
  }
}
