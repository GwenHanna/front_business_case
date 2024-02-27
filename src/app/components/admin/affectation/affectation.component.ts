import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { articleInterface } from 'src/app/entities/articleInterface';
import { OrdersInterface } from 'src/app/entities/orders-interface';
import { UserInterface } from 'src/app/entities/userInterface';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-affectation',
  templateUrl: './affectation.component.html',
  styleUrls: ['./affectation.component.css'],
})
export class AffectationComponent implements OnInit {
  isLoading = false;
  orders: OrdersInterface[] = [];
  articles: any[] = [];
  users: UserInterface[] = [];
  form!: FormGroup
  

  constructor(
    private orderService: OrderService, 
    private articlesService: ArticleService,
     private userService: UserService,
     private fb: FormBuilder
     ) {

      
     }

  ngOnInit(): void {
    this.isLoading = true;
    this.refreachOrder();
    this.getArticles()
    this.getUser();

    // this.form = this.fb.group({
    //   orders: this.fb.array([]),
    // });

    // // Ajouter les contrôles pour chaque commande dans le tableau 'orders'
    // this.orders.forEach((order, index) => {
    //   const orderFormGroup = this.fb.group({
    //     id: order.id,
    //     user: '', // Initialiser avec null
    //   });
    //   (this.form.get('orders') as FormArray).push(orderFormGroup);
    // });
  }

  onSubmit() {
    // Créez un nouvel objet pour la soumission
    const updatedOrders: any[] = [];
  
    // Itérez sur les contrôles du FormArray
    (this.form.get('orders') as FormArray).controls.forEach((orderControl) => {
      // Extrayez les données pertinentes
      const id = orderControl.value.id;
      const user = orderControl.value.user;
  
      // Ajoutez les données à l'objet de soumission
      updatedOrders.push({
        id,
        status: 'En cours',
        user: { id: user },
      });
    });
  
    // Envoyez la requête HTTP
    this.orderService.patchOrder(updatedOrders).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => console.log(err),
    });
  }

  getUser(){
    this.userService.getAllUsers();
    this.userService.$usersAll.subscribe({
      next : (data) => this.users = data,
      error: (err) => console.log(err)
      
    })
  }

  getArticles(){
    this.articlesService.getArticles()
    this.articlesService.articles$.subscribe({
      next: (data) => {
        this.articles = data
        console.log(data);
        
      },
      error: (err) => console.log(err)
      
    })
  }
  createOrderFormGroup(order: OrdersInterface): FormGroup {
    return this.fb.group({
      id: order.id,
      user: '',
    });
  }

  refreachOrder() {
    this.orderService.getAllOrder().subscribe({
      next: (order) => {
        this.orders = order;
        this.form = this.fb.group({
          orders: this.fb.array(this.orders.map(order => this.createOrderFormGroup(order))),
        });
        this.isLoading = false;
      },
    });
  }
}
