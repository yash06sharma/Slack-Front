import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-channel',
  templateUrl: './add-channel.component.html',
  styleUrls: ['./add-channel.component.css']
})
export class AddChannelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  typesOfShoes: string[] = ['Yash', 'Suresh', 'Diptesh', 'Max', 'Anand'];


}
