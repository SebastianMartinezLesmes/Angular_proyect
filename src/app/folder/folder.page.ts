import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {

  info: any = [];

  constructor(
    private route:ActivatedRoute,
  ) { 
    this.info = this.route.snapshot.paramMap.get('data');
    console.log(this.info)
  }

  ngOnInit() { }

}
