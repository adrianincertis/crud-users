import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { USER_TYPE } from '../../enums/user-type.enum';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  selectedFilter: string | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.getAllUsers();
    this.filterUsers();
  }

  getAllUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  filterUsers() {
    if (!this.selectedFilter) {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = this.users.filter(user => user.type.toString() === this.selectedFilter);
    }
  }

  createUser() {
    this.router.navigate(['/users/new']);
  }

  editUser(id: number) {
    this.router.navigate([`/users/edit/${id}`]);
  }

  viewUser(id: number) {
    this.router.navigate([`/users/${id}`]);
  }

  deleteUser(user: User) {
    if (confirm(`¿Está seguro de que desea borrar al usuario ${user.personalData.name} ${user.personalData.firstName}?`)) {
      this.userService.deleteUser(user.id!);
      this.getAllUsers();
      this.filterUsers();
    }
  }

  get USER_TYPE() {
    return USER_TYPE;
  }
}
