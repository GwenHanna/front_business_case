import { Component, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/entities/userInterface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {


  public users : UserInterface[] = []
  constructor(private usersService: UserService){

  }
  ngOnInit(): void {
    this.getAllUsers()
  }
  getAllUsers(){
    this.usersService.getAllUsers()
    this.usersService.$usersAll.subscribe({
    next: (data) => {
    this.users = data
  },
  error: (err) => console.log(err)
  
})
  }

}
