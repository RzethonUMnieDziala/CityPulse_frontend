import { Operation } from './../../auth/broadcast.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BroadcastService } from 'src/app/auth/broadcast.service';
import { AuthService } from 'src/app/auth/auth.service';
import { first, tap, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ResultModalComponent } from './result-modal.component';

export interface PoolConfig {
  candidates: Array<string>;
  votedOn: string | null;
}

@Component({
  selector: 'app-pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.css']
})
export class PoolComponent implements OnInit {
  @Input() config: PoolConfig;
  isSending = false;

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private broadcastService: BroadcastService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  onSubmit() {
    this.isSending = true;
    const operation: Operation = [
      'custom_json',
      {
        id: 'city_pulse',
        required_auths: [],
        json: JSON.stringify([
          'vote',
          {
            electionId: 1,
            voteOn: this.form.value.voteOn
          }
        ])
      }
    ];
    this.authService.authState
      .pipe(
        first(),
        tap(user => {
          operation[1].required_posting_auths = [user.uid];
        }),
        switchMap(() =>
          this.broadcastService.broadcastOperations([operation]).pipe(
            tap(res => {
              this.isSending = false;
              this.dialog.open(ResultModalComponent, {
                width: '400px',
                data: res
              });
            }),
            catchError(err => {
              this.isSending = false;
              console.log(err);
              return of(err);
            })
          )
        )
      )
      .subscribe();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      voteOn: this.formBuilder.control({
        value: this.config.votedOn
      })
    });
  }
}
