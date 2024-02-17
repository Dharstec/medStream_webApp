import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpOtpComponent } from './sign-up-otp.component';

describe('SignUpOtpComponent', () => {
  let component: SignUpOtpComponent;
  let fixture: ComponentFixture<SignUpOtpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpOtpComponent]
    });
    fixture = TestBed.createComponent(SignUpOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
