import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitiesListingComponent } from './cities-listing.component';

describe('CitiesListingComponent', () => {
  let component: CitiesListingComponent;
  let fixture: ComponentFixture<CitiesListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CitiesListingComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitiesListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
