import { Component, OnInit } from '@angular/core';
import { IndividualResult } from './chart/chart.component';

@Component({
  selector: 'app-election',
  templateUrl: './election.component.html',
  styleUrls: ['./election.component.css']
})
export class ElectionComponent implements OnInit {
  candidates = ['Adam Małysz', 'Mariusz Pudzianowski', 'Tiger Bonzo'];
  config = {
    candidates: this.candidates,
    votedOn: null
  };
  results = [
    ['Adam Małysz', 345],
    ['Mariusz Pudzianowski', 997],
    ['Tiger Bonzo', 32]
  ];

  constructor() {}

  ngOnInit() {}
}
