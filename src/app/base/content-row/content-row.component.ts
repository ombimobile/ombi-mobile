import { Component, Input, OnInit } from '@angular/core';
import { Content, Tag } from 'src/models/content';
import { TvShow } from 'src/models/content';

@Component({
  selector: 'app-content-row',
  templateUrl: './content-row.component.html',
  styleUrls: ['./content-row.component.scss'],
})
export class ContentRowComponent implements OnInit {

  @Input() title: string = '';
  @Input() posterUrl: string = '';
  @Input() tags: Array<Tag> = [];
  @Input() description: string = '';

  constructor() { }

  ngOnInit() {}
}