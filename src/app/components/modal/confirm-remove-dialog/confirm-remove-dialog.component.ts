import { Component, Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-confirm-remove-dialog',
  templateUrl: './confirm-remove-dialog.component.html',
  styleUrls: ['./confirm-remove-dialog.component.css'],
})
export class ConfirmRemoveDialogComponent {
  constructor(private confirmationService: ConfirmationService) {}
  test: boolean = false;

  showConfirmationDialog() {
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment effectuer cette action?', // Le message de confirmation
      header: 'Confirmation', // L'en-tête de la boîte de dialogue
      icon: 'pi pi-exclamation-triangle', // Icône de la boîte de dialogue
      accept: () => {
        // Logique à exécuter si l'utilisateur accepte
        this.test = true;

        return this.test;
      },
      reject: () => {
        // Logique à exécuter si l'utilisateur refuse
        this.test = false;
        return this.test;
        console.log('Action refusée');
      },
    });
  }
}
