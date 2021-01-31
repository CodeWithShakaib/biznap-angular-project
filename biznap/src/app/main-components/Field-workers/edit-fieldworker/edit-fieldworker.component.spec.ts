import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFieldworkerComponent } from './edit-fieldworker.component';

describe('EditFieldworkerComponent', () => {
  let component: EditFieldworkerComponent;
  let fixture: ComponentFixture<EditFieldworkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditFieldworkerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFieldworkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
