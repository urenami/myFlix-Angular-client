import { Component, OnInit, Input } from '@angular/core';

// This import is used to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Represents the UserRegistrationFormComponent, responsible for user registration.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
 * Creates a new UserRegistrationFormComponent instance.
 *
 * @param fetchApiData - Service for making user registration API calls.
 * @param dialogRef - Service for managing the dialog using MatDialogRef.
 * @param snackBar - Service for displaying notifications using Material Snack Bar.
 */
constructor(
  public fetchApiData: FetchApiDataService,
  public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
  public snackBar: MatSnackBar) { }

/**
 * Initializes the component after construction.
 */
ngOnInit(): void {
}


  /**
   * Registers a new user by sending the form inputs to the backend.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      // Logic for a successful user registration goes here! (To be implemented)
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open('User successfully registered', 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}
