import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../../services/theme.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'contacts-template',
  templateUrl: './contacts-template.component.html',
  styleUrls: ['./contacts-template.component.css']
})
export class ContactsTemplateComponent implements OnInit {
  currentPage;
  pageContent;

  constructor(private themeService: ThemeService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(page => this.currentPage = page);
    this.pageContent = this.themeService.currentConfig.pages[this.currentPage.link];
  }
}
