import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.css']
})
export class StudentUpdateComponent implements OnInit {

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    console.log('student update url first child snapshot'+JSON.stringify(this.route.root.firstChild.snapshot.url));
    console.log('student update url snapshot'+JSON.stringify(this.route.snapshot.url));
    this.route.pathFromRoot.forEach(route=>console.log('path from route:'+route.snapshot.url.toString()));
  }

}
