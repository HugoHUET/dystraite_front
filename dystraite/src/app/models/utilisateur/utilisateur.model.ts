import { logging } from 'protractor';

export class Utilisateur {
    email: string;
    nom: string;
    prenom: string;
    date_naissance: Date;
    latitude: number;
    longitude: number;
    ville: string;
    code_postal: number;
    role: string;
    photo: File;
}
