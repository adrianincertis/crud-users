import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model'
import { USER_TYPE } from '../enums/user-type.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    {
      id: 1,
      type: USER_TYPE.PLAINTIFF,
      personalData: {
        nif: '12345678A',
        name: 'Juan',
        firstName: 'Pérez',
        secondName: 'Gómez',
        birthDate: '1990-01-01'
      },
      address: {
        street: 'Calle Hola',
        number: '123',
        door: '1A',
        postalCode: '08001',
        city: 'Barcelona'
      },
      education: [
        { institution: 'Universidad Barcelona', degree: 'Licenciatura', date: '2012-06-30' }
      ],
      workExperience: [
        { company: 'Empresa Hola', jobTitle: 'Desarrollador', date: '2014-03-01' }
      ]
    },
    {
      id: 2,
      type: USER_TYPE.EMPLOYEE,
      personalData: {
        nif: '87654321B',
        name: 'María',
        firstName: 'García',
        secondName: 'López',
        birthDate: '1985-05-15'
      },
      address: {
        street: 'Avenida Hola',
        number: '742',
        door: '2B',
        postalCode: '28002',
        city: 'Madrid'
      },
      education: [
        { institution: 'Universidad Complutense', degree: 'Licenciatura', date: '2022-07-30' }
      ],
      workExperience: [
        { company: 'Empresa Ejemplo', jobTitle: 'Desarrolladora', date: '2015-03-01' }
      ]
    }
  ];

  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  getUser(id: number): Observable<User> {
    const user = this.users.find(userItem => userItem.id === id);
    return of(user as User);
  }

  addUser(user: User): void {
    this.users.push(user);
  }

  updateUser(user: User): void {
    const index = this.users.findIndex(userItem => userItem.id === user.id);
    if (index !== -1) {
      this.users[index] = user;
    }
  }

  deleteUser(id: number): void {
    this.users = this.users.filter(userItem => userItem.id !== id);
  }
}
