import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// This import is used to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Represents the UserLoginFormComponent, responsible for handling user login functionality.
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  @Input() loginData = { Username: '', Password: '' };

  /**
 * Creates a new UserLoginFormComponent instance.
 *
 * @param fetchApiData - Service for making user authentication API calls.
 * @param dialogRef - Reference to the Material Dialog for managing the dialog.
 * @param snackBar - Service for displaying notifications using Material Snack Bar.
 * @param router - Angular Router service for navigation.
 */
constructor(
  public fetchApiData: FetchApiDataService,
  public dialogRef: MatDialogRef<UserLoginFormComponent>,
  public snackBar: MatSnackBar,
  private router: Router
) { }

/**
 * Initializes the component after construction.
 */
ngOnInit(): void {
}


  /**
   * This function is responsible for sending the user login form inputs to the backend for authentication.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.loginData).subscribe((result) => {
      // Logic for a successful user login goes here! (To be implemented)

      // Store user information and token in local storage
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('token', result.token);

      // Close the modal on successful login
      this.dialogRef.close();

      // Navigate to the movies page
      this.router.navigate(['movies']);

      // Display a success notification
      this.snackBar.open('Logged in', 'OK', {
        duration: 2000
      });
    }, (result) => {
      // Display an error notification in case of login failure
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}
