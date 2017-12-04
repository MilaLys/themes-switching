import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstThemeComponent } from './first-theme.component';

describe('FirstThemeComponent', () => {
  let component: FirstThemeComponent;
  let fixture: ComponentFixture<FirstThemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstThemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
