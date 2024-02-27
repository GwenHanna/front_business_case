import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/entities/userInterface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-management-employee',
  templateUrl: './management-employee.component.html',
  styleUrls: ['./management-employee.component.css'],
  animations: [

    trigger('openClose', [
      state('close', style({height: '37px'})),
      state('open', style({ height: '700px' })),
      transition('open <=> close', [animate('900ms ease')]),
    ]),
  ]
})
export class ManagementEmployeeComponent implements OnInit {

  ngOnInit(): void {
    
  }

  selectService: string = ''
  isToggle : boolean =false

  onSelect(target: string){
    if(target === 'update'){
    }
    
    this.selectService = target
   this.isToggle = !this.isToggle
  }



}
