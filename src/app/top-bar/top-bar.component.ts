import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Represents the TopBarComponent, responsible for displaying the top navigation bar.
 */
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent {
  /**
   * Constructs an instance of TopBarComponent.
   *
   * @param router - The Angular Router service for navigation.
   */
  constructor(private router: Router) {}

  /**
   * Initializes the component upon construction.
   */
  ngOnInit(): void {}

  /**
   * Navigate to the movies page.
   */
  toMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Navigate to the user profile page.
   */
  toProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * Log out the user by navigating to the welcome page and clearing local storage.
   */
  logOut(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }
}
