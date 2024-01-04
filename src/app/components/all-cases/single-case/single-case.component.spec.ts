import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCaseComponent } from './single-case.component';

describe('SingleCaseComponent', () => {
  let component: SingleCaseComponent;
  let fixture: ComponentFixture<SingleCaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleCaseComponent]
    });
    fixture = TestBed.createComponent(SingleCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
