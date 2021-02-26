import { Component, OnInit, Input,  OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';

import { PackingSlip } from '../../generated-types';

@Component({
  selector: 'vdr-packing-slip',
  templateUrl: './packing-slip.component.html',
  styleUrls: ['./packing-slip.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PackingSlipComponent implements OnChanges {

  @Input('packing_slip') packing_slip: PackingSlip;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    const changedProp = changes['packing_slip'];
    const to = JSON.stringify(changedProp.currentValue);
    const from = JSON.stringify(changedProp.previousValue);
    console.log(`prop changed from ${from} to ${to}`);
  }
}