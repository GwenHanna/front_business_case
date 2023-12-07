import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { prestationInterface } from 'src/app/entities/prestationsInterface';
import { selection } from 'src/app/models/selection';
import { PrestationService } from 'src/app/services/prestation.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

import { BasketDialogueComponent } from '../basket-dialogue/basket-dialogue.component';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasketComponent implements OnInit {
  @Input() basket: selection[] = [];
  prestationData: any;

  constructor() {}

  ngOnInit(): void {}
}
