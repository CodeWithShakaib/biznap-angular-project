import { TestBed } from '@angular/core/testing';

import { MainComponenetsService } from './main-componenets.service';

describe('MainComponenetsService', () => {
  let service: MainComponenetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainComponenetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
