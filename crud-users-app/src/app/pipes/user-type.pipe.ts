import { Pipe, PipeTransform } from '@angular/core';
import { USER_TYPE } from '../enums/user-type.enum';

@Pipe({
  name: 'userType'
})
export class UserTypePipe implements PipeTransform {

  transform(value: unknown): string {
    switch (value) {
      case USER_TYPE.PLAINTIFF: 
        return 'Demandante';
      case USER_TYPE.EMPLOYEE:
        return 'Empleado';
      default:
        return 'No definido';
    }
  }

}
