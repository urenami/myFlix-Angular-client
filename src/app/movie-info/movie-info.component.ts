import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Represents the MovieInfoComponent, responsible for displaying movie information in a dialog.
 */
@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.scss'],
})
export class MovieInfoComponent implements OnInit {
  /**
   * Constructs an instance of MovieInfoComponent.
   *
   * @param data - The data object containing movie information to display.
   *               It includes a title and content.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      content: string;
    }
  ) {}

  /**
   * Initializes the component upon construction.
   */
  ngOnInit(): void {}
}
