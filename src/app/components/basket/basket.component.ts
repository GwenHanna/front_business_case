import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BasketInterface } from 'src/app/entities/basket-interface';
import { DataBasketInterface } from 'src/app/entities/dataBasketInterface';
import { selectionInterface } from 'src/app/entities/selectionInterface';
import { BasketService } from 'src/app/services/basket.service';
import { ModaleService } from 'src/app/services/modale.service';
import { ServiceTypeService } from 'src/app/services/service-type.service';
import { ArticleService } from 'src/app/services/serviceArticle.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasketComponent implements OnInit {
  baskets: DataBasketInterface[] = [];
  pricaTotal = 0;
  stateForm!: FormGroup;

  constructor(
    private basketService: BasketService,
    private serviceTypeService: ServiceTypeService,
    private modaleService: ModaleService,
    private fb: FormBuilder
  ) {
    this.basketService.basket$.subscribe({
      next: (data) => {
        console.log('data', data);
        data.forEach((element) => {
          this.pricaTotal += element.priceTotal;
        });
        this.baskets = basketService.dataService(data);
        console.log('basket', this.baskets);
      },
      error: (err) => console.log('err', err),
    });
  }

  ngOnInit(): void {
    console.log(this.baskets);

    this.stateForm = this.fb.group({
      state: ['', Validators.required],
      ironing: [false],
    });
  }

  validOrder() {
    // if (this.stateForm.valid) {
    //   console.log('state.value', this.stateForm.value);
    //   this.baskets.forEach((el) => {
    //     el.state = this.stateForm.value;
    //   });
    // }
    console.log(this.stateForm.value);
  }

  openModalNote(basket: DataBasketInterface) {
    const modalRef = this.modaleService.openModalNote(basket);
    modalRef.onClose.subscribe({
      next: (result) => {
        if (result !== undefined) {
          this.baskets.forEach((el) => {
            if (el.id === result.basket.id) el.note = result.note.note;
            console.log('el', el);
          });
        }
        console.log('result', result);

        console.log(this.baskets);
      },
    });
  }
}
