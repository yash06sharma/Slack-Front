import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-selected-community',
  templateUrl: './selected-community.component.html',
  styleUrls: ['./selected-community.component.css']
})
export class SelectedCommunityComponent implements OnInit {
queryData:any = [];
  // constructor(private route:ActivatedRoute) {
  //   this.route.queryParamMap.subscribe((param:any)=>{
  //     // console.log(param['params']);
  //     this.queryData = param['params'];
  //     this.queryData.forEach(element => {
  //       console.log(element);
  //     });
  //   });

  //  }

  constructor(private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe((param: any) => {
      const dataParam = param['params'];
      // console.log(this.queryData);
      // const dataParam = param.get('data');
      // if (dataParam) {
      //   this.queryData = JSON.parse(dataParam);

      // }
    });
  }

  ngOnInit(): void {

// console.log(this.queryData['Name']);
// console.log(this.queryData['Description']);



  }

}


// // Assuming your variable is of type any[], and you expect an object with 'data' property
// const yourVariable: any[] = /* some data */;

// // Check if it's an array and has elements
// if (Array.isArray(yourVariable) && yourVariable.length > 0) {
//   // Access the first element (assuming it's an object)
//   const firstElement = yourVariable[0];

//   // Check if the first element has a 'data' property
//   if (firstElement && typeof firstElement === 'object' && 'data' in firstElement) {
//     // Access the 'data' property
//     const data = firstElement.data;

//     // Now you can work with the 'data' property
//     console.log('Extracted Data:', data);
//   }
// }
