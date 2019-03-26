import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
  @Input() showArrow = false;
  @Input() percentageMode = false;
  @Input() centerLabels = false;
  @Input() leftLabel = '';
  @Input() rightLabel = '';
  @Input() value = 0;
  @Input() maxValue = 0;

  constructor() {}

  // COMPONENT LIFECYCLE HOOKS -------------------------------------------------

  ngOnInit() {}

  // COMPONENT METHODS ---------------------------------------------------------

  // COMPONENT PRIVATE METHODS -------------------------------------------------
}
