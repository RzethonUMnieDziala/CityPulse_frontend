import { Component, OnInit, Input } from '@angular/core';

export interface IndividualResult {
  candidate: string;
  numberOfVotes: number;
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() results: Array<[string, number]>;

  constructor() {}

  ngOnInit() {}
}
