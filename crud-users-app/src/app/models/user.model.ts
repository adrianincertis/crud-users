export interface User {
  id?: number;
  type: number;
  personalData: {
    nif: string;
    name: string;
    firstName: string;
    secondName?: string;
    gender?: string;
    birthDate?: string;
  };
  address: {
    street: string;
    number: string;
    door?: string;
    postalCode: string;
    city: string;
  };
  education?: { institution: string; degree: string; date: string }[];
  workExperience?: { company: string; jobTitle: string; date: string }[];
}