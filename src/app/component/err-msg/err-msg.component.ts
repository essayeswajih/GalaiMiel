import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-err-msg',
  templateUrl: './err-msg.component.html',
  styleUrls: ['./err-msg.component.scss']
})
export class ErrMsgComponent {
  @Input() err: string | null = null;
}
