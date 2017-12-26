import {Component, OnInit, Input} from '@angular/core';
import {ThemeService} from '../../services/theme.service';

@Component({
  selector: 'app-first-theme',
  templateUrl: './first-theme.component.html',
  styleUrls: ['./first-theme.component.css']
})
export class FirstThemeComponent implements OnInit {
  constructor(private themeService: ThemeService) {
  }

  themes: any;
  theme: any;

  // getTheme() {
  //   this.themeService.getTheme().subscribe(data => {
  //     this.themes = Object.assign({}, ...data);
  //   });
  // }

  // getOneTheme(id) {
  //     this.themeService.getOneTheme(id).subscribe(data => {
  //       this.themes = data;
  //     });
  //   }

  ngOnInit() {
    this.themeService.changeTheme.subscribe(evt => {
      console.log(this.themes = evt);
    });
    // this.getTheme();
    // this.getOneTheme(id);
  }
}
