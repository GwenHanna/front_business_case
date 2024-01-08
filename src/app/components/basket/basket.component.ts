import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormArray,
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
  stateForms: FormGroup[] = [];

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
          if (element.priceTotal) this.pricaTotal += element.priceTotal;
        });
        this.baskets = basketService.dataService(data);
        console.log('basket', this.baskets);
        this.initializeForm();
      },
      error: (err) => console.log('err', err),
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    // Initialize the main form
    this.stateForm = this.fb.group({
      item: this.fb.array([]),
    });

    // Add form controls for each basket
    this.baskets.forEach((basket) => {
      this.addItem(basket);
    });
  }

  addItem(basket: DataBasketInterface) {
    const itemFormGroup = this.fb.group({
      state: this.fb.control(''),
      ironing: this.fb.control(false),
    });

    (this.stateForm.get('item') as FormArray).push(itemFormGroup);
  }

  validOrder() {
    const formArray = this.stateForm.get('item') as FormArray;
    console.log(formArray.value);
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
