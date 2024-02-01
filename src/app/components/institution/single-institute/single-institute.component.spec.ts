import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleInstituteComponent } from './single-institute.component';

describe('SingleInstituteComponent', () => {
  let component: SingleInstituteComponent;
  let fixture: ComponentFixture<SingleInstituteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleInstituteComponent]
    });
    fixture = TestBed.createComponent(SingleInstituteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
