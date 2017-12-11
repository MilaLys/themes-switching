import { TestBed, inject } from '@angular/core/testing';

import { AppThemeService } from './app-theme.service';

describe('AppThemeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppThemeService]
    });
  });

  it('should be created', inject([AppThemeService], (service: AppThemeService) => {
    expect(service).toBeTruthy();
  }));
});
