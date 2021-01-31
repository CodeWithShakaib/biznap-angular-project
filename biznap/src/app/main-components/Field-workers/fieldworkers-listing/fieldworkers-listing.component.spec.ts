import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldworkersListingComponent } from './fieldworkers-listing.component';

describe('FieldworkersListingComponent', () => {
  let component: FieldworkersListingComponent;
  let fixture: ComponentFixture<FieldworkersListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FieldworkersListingComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldworkersListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
