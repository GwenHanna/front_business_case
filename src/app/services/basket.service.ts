import { Injectable } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { BasketDialogueComponent } from '../components/basket-dialogue/basket-dialogue.component';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  constructor(private dialoguService: DialogService) {}

  openModal(prestationData: any) {
    const ref = this.dialoguService.open(BasketDialogueComponent, {
      header: 'Mon panier',
      width: '70%',
      data: { prestation: prestationData },
      appendTo: 'body',
    });
    ref.onClose.subscribe({
      next: (result) => {
        console.log('Modal fermé');
      },
    });
  }
}
