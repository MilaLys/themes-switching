import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {LightThemeComponent} from './light-theme.component';


describe('FirstThemeComponent', () => {
  let component: LightThemeComponent;
  let fixture: ComponentFixture<LightThemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LightThemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LightThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
