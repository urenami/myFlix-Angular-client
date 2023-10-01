import { Component, OnInit, Input } from '@angular/core';

// This import is used to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

import { formatDate } from '@angular/common';

/**
 * Represents the UserProfileComponent, responsible for user profile management.
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: any = {};
  favoriteMovies: any[] = [];

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
 * Creates a new UserProfileComponent instance.
 *
 * @param fetchApiData - Service for making user data API calls.
 * @param snackBar - Service for displaying notifications using Material Snack Bar.
 * @param router - Angular Router service for navigation.
 */
constructor(
  public fetchApiData: FetchApiDataService,
  public snackBar: MatSnackBar,
  private router: Router
) { }

/**
 * Initializes the component after construction and retrieves user data.
 */
ngOnInit(): void {
  this.getUser();
}


  /**
   * Fetches user data and favorite movies for the current user.
   */
  getUser(): void {
    this.user = this.fetchApiData.getOneUser();
    this.userData.Username = this.user.Username;
    this.userData.Email = this.user.Email;

    // Convert user's birthday to a readable format
    this.userData.Birthday = formatDate(this.user.Birthday, 'yyyy-MM-dd', 'en-US', 'UTC+0');

    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp.filter((m: { _id: any; }) => this.user.FavoriteMovies.indexOf(m._id) >= 0);
    });
  }

  /**
   * Updates user information.
   */
  editUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));

      this.snackBar.open('User successfully updated', 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

  /**
   * Deletes the user account and logs the user out.
   */
  deleteUser(): void {
    this.fetchApiData.deleteUser().subscribe((result) => {
      localStorage.clear();
      this.router.navigate(['welcome']);
      this.snackBar.open('User successfully deleted', 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}
