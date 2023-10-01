import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MovieInfoComponent } from '../movie-info/movie-info.component';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Represents the MovieCardComponent, responsible for displaying movie cards and managing related actions.
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  movies: any[] = [];

  /**
   * Constructs an instance of MovieCardComponent.
   *
   * @param fetchApiData - The FetchApiDataService instance for fetching movie data.
   * @param snackBar - The MatSnackBar for displaying notifications.
   * @param dialog - The MatDialog for displaying movie details.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  /**
   * Initializes the component after construction.
   */
  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * Fetches all movies and assigns them to the `movies` property.
   *
   * @returns An array of movies.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log('Movies:', this.movies); // Added console.log statement
      return this.movies;
    });
  }

  /**
   * Opens a dialog to display movie genre information.
   *
   * @param name - The name of the genre.
   * @param description - The description of the genre.
   */
  openGenre(name: string, description: string): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        title: name,
        content: description,
      },
    });
  }

  /**
   * Opens a dialog to display movie director information.
   *
   * @param name - The name of the director.
   * @param bio - The bio of the director.
   */
  openDirector(name: string, bio: string): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        title: name,
        content: bio,
      },
    });
  }

  /**
   * Opens a dialog to display the movie synopsis.
   *
   * @param description - The movie's synopsis.
   */
  openSynopsis(description: string): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        title: 'Synopsis',
        content: description,
      },
    });
  }

  /**
   * Adds a movie to the user's favorites.
   *
   * @param id - The ID of the movie to add to favorites.
   */
  addFavorite(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
      this.snackBar.open('Movie added to favorites.', 'OK', {
        duration: 2000,
      });
      console.log('Movie added to favorites:', result); // Added console.log statement
    });
  }

  /**
   * Checks if a movie is in the user's favorites.
   *
   * @param id - The ID of the movie to check.
   * @returns `true` if the movie is a favorite, otherwise `false`.
   */
  isFavorite(id: string): boolean {
    return this.fetchApiData.isFavoriteMovie(id);
  }

  /**
   * Removes a movie from the user's favorites.
   *
   * @param id - The ID of the movie to remove from favorites.
   */
  removeFavorite(id: string): void {
    this.fetchApiData.deleteFavoriteMovie(id).subscribe((result) => {
      this.snackBar.open('Movie removed from favorites.', 'OK', {
        duration: 2000,
      });
      console.log('Movie removed from favorites:', result); // Added console.log statement
    });
  }
}
