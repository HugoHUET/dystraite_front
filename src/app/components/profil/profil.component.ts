import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TitreService } from 'src/app/services/titre/titre.service';
import { UserService } from 'src/app/services/user/user.service';
import { ResponsiveService } from 'src/app/services/responsive/responsive.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  nom = 'ALYSSA BERTRAND';
  score = 3476;

  constructor(private titreService: TitreService, public userService: UserService, private router: Router, private toastr: ToastrService, public responsiveService: ResponsiveService) {

  }

  ngOnInit() {
    this.titreService.updateTitle('Profil');
  }
  logout() {
    this.userService.logout();
    this.router.navigate([''],);

  }
  public calculateAge() {
    if (this.userService.loggedUser.birthdate) {
      var timeDiff = Math.abs(Date.now() - new Date(this.userService.loggedUser.birthdate).getTime());
      return Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    }
    return null;
  }
  editProfilePicture(event) {
    const file = event.target.files[0];
    if (file.size > 2097152) {
      this.toastr.error('La taille maximale autorisé est de 2MB', 'Votre photo de profil est trop volumineuse', {
        closeButton: true,
        timeOut: 10000
      });
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.userService.loggedUser.profilePicture = reader.result as string;
      this.userService.updateUser(this.userService.loggedUser).subscribe(updatedUser => {
        console.log(updatedUser);
        this.userService.loggedUser = updatedUser;
      });
    };
  }
}
