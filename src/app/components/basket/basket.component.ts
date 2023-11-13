import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { prestationInterface } from 'src/app/entities/prestationsInterface';
import { selection } from 'src/app/models/selection';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasketComponent implements OnInit {
  @Input() basket: selection[] = [];

  ngOnInit(): void {
    console.log(this.basket);
  }
}
