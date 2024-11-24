import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingCoacheeComponent } from './landing-coachee.component';

describe('LandingCoacheeComponent', () => {
  let component: LandingCoacheeComponent;
  let fixture: ComponentFixture<LandingCoacheeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingCoacheeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingCoacheeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
