import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-repl',
  templateUrl: './repl.component.html',
  styleUrls: ['./repl.component.scss']
})
export class ReplComponent implements OnInit {
  content: any
  constructor() { }

  ngOnInit(): void {
    console.log(this.content)
  }
  handleChange(e){
    console.log(e)
  }
}
