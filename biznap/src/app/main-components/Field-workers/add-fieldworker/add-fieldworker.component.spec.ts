import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFieldworkerComponent } from './add-fieldworker.component';

describe('AddFieldworkerComponent', () => {
  let component: AddFieldworkerComponent;
  let fixture: ComponentFixture<AddFieldworkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddFieldworkerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFieldworkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
