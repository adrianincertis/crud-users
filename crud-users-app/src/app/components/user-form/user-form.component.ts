import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user.model';
import { USER_FORM_SECTIONS } from '../../enums/user-form-sections.enum';
import { USER_TYPE } from '../../enums/user-type.enum';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isEditMode = false;
  userId: number | null = null;
  userType: number = USER_TYPE.PLAINTIFF;
  sections: { value: number, label: string }[] = [
    { value: USER_FORM_SECTIONS.PERSONAL_DATA, label: 'Datos Personales' },
    { value: USER_FORM_SECTIONS.ADDRESS, label: 'Dirección' }
  ];
  currentSection: number = this.sections[0].value;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      type: ['', Validators.required],
      personalData: this.fb.group({
        nif: ['', Validators.required],
        name: ['', Validators.required],
        firstName: ['', Validators.required],
        secondName: [''],
        gender: [''],
        birthDate: ['']
      }),
      address: this.fb.group({
        street: ['', Validators.required],
        number: ['', Validators.required],
        door: [''],
        postalCode: ['', Validators.required],
        city: ['', Validators.required]
      }),
      education: this.fb.array([]),
      workExperience: this.fb.array([])
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.userId = parseInt(id, 10);
        this.userService.getUser(this.userId).subscribe((user: User) => {
          this.userForm.patchValue(user);
          this.userType = user.type;
          this.setFormArrays(user);
          this.changeSections();
        });
      }
    });
  }

  changeSections() {
    this.sections = [
      { value: USER_FORM_SECTIONS.PERSONAL_DATA, label: 'Datos Personales' },
      { value: USER_FORM_SECTIONS.ADDRESS, label: 'Dirección' }
    ];
    switch (this.userType) {
      case USER_TYPE.PLAINTIFF:
        console.log('si')
        this.sections.push({ value: USER_FORM_SECTIONS.STUDIES, label: 'Estudios' });
        break;
      case USER_TYPE.EMPLOYEE:
        console.log('si')
        this.sections.push({ value: USER_FORM_SECTIONS.WORK_EXPERIENCE, label: 'Experiencia Laboral' });
        break;
    }
  }

  setFormArrays(user: User) {
    if (user.education) {
      user.education.forEach(edu => this.addEducation(edu));
    }
    if (user.workExperience) {
      user.workExperience.forEach(work => this.addWorkExperience(work));
    }
  }

  get currentSectionLabel(): string | undefined {
    return this.sections.find(section => section.value === this.currentSection)?.label
  }

  get education(): FormArray {
    return this.userForm.get('education') as FormArray;
  }

  get workExperience(): FormArray {
    return this.userForm.get('workExperience') as FormArray;
  }

  addEducation(education = { institution: '', degree: '', date: '' }) {
    this.education.push(this.fb.group(education));
  }

  removeEducation(index: number) {
    this.education.removeAt(index);
  }

  addWorkExperience(work = { company: '', jobTitle: '', date: '' }) {
    this.workExperience.push(this.fb.group(work));
  }

  removeWorkExperience(index: number) {
    this.workExperience.removeAt(index);
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }
    let user: User = {
      type: Number(this.userForm.get('type')!.value),
      personalData: this.userForm.get('personalData')!.value,
      address: this.userForm.get('address')!.value,
      education: this.userType === USER_TYPE.PLAINTIFF ? this.userForm.get('education')!.value : [],
      workExperience: this.userType === USER_TYPE.EMPLOYEE ? this.userForm.get('workExperience')!.value : []
    };

    if (this.isEditMode) {
      user.id = this.userId as number;
      this.userService.updateUser(user);
    } else {
      this.userService.addUser(user);
    }
    this.router.navigate(['/users']);
  }

  setCurrentSection(sectionValue: number) {
    this.currentSection = sectionValue;
  }

  get USER_FORM_SECTIONS() {
    return USER_FORM_SECTIONS;
  }

  get USER_TYPE() {
    return USER_TYPE;
  }

  get Number() {
    return Number;
  }
}
