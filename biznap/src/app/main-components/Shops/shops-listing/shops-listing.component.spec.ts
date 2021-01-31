import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopsListingComponent } from './shops-listing.component';

describe('ShopsListingComponent', () => {
  let component: ShopsListingComponent;
  let fixture: ComponentFixture<ShopsListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShopsListingComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
