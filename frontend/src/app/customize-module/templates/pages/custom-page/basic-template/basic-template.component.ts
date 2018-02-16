import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../../services/theme.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'basic-template',
  templateUrl: './basic-template.component.html',
  styleUrls: ['./basic-template.component.css']
})
export class BasicTemplateComponent implements OnInit {
  currentPage;
  pageContent;

  constructor(private themeService: ThemeService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(page => this.currentPage = page);
    this.pageContent = this.themeService.currentConfig.pages[this.currentPage.link];
  }
}
