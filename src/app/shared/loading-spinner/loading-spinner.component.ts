import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading-spinner[isLoading][message]',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {
  @Input() public isLoading: boolean = false;
  @Input() public message: string | null = null;

  constructor() { }

  ngOnInit(): void { }
}
