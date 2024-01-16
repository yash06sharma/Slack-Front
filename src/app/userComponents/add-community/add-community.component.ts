import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-community',
  templateUrl: './add-community.component.html',
  styleUrls: ['./add-community.component.css']
})
export class AddCommunityComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  selectedValue: string = '';

  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  typesOfShoes: string[] = ['Yash', 'Suresh', 'Diptesh', 'Max', 'Anand'];

}
