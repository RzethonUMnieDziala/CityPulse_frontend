import { BroadcastResult } from './../../auth/broadcast.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-result-modal',
  template: `
    <h4>Zagłosowałeś!</h4>
    <p>
      Twoja transakcja została zawarta w bloku numer <b>{{ data.block_num }}</b>
    </p>
    <p><a mat-button [href]="getSteemdUrl()">Sprawdź na SteemD</a></p>
  `
})
export class ResultModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: BroadcastResult) {}

  getSteemdUrl() {
    return `https://steemd.com/b/${this.data.block_num}`;
  }
}
