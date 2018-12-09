import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Component, ChangeDetectorRef } from '@angular/core';
import { modulesConfig } from './../services/data.service';
import { keys, pickBy } from 'ramda';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  modulesAdded = keys(pickBy((val, key) => val, modulesConfig));
  modulesNotAdded = keys(pickBy((val, key) => !val, modulesConfig));

  candidates: Array<FormControl> = [new FormControl('')];
  poolOptions: Array<FormControl> = [new FormControl('')];
  poolQuestion: FormControl = new FormControl();
  message: FormControl = new FormControl();

  constructor(private changeDetector: ChangeDetectorRef) {}

  addModule(name: string) {
    modulesConfig[name] = true;
    this.modulesAdded = keys(pickBy((val, key) => val, modulesConfig));
    this.modulesNotAdded = keys(pickBy((val, key) => !val, modulesConfig));
    this.changeDetector.detectChanges();
  }

  removeModule(name: string) {
    modulesConfig[name] = false;
    this.modulesAdded = keys(pickBy((val, key) => val, modulesConfig));
    this.modulesNotAdded = keys(pickBy((val, key) => !val, modulesConfig));
    this.changeDetector.detectChanges();
  }

  addCandidate() {
    this.candidates.push(new FormControl(''));
  }

  addPoolOption() {
    this.poolOptions.push(new FormControl(''));
  }

  createElection() {}

  createPool() {}

  sendMessage() {}
}
