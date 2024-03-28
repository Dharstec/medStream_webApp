import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleExpertComponent } from './single-expert.component';

describe('SingleExpertComponent', () => {
  let component: SingleExpertComponent;
  let fixture: ComponentFixture<SingleExpertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleExpertComponent]
    });
    fixture = TestBed.createComponent(SingleExpertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
