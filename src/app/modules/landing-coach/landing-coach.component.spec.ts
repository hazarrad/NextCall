import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingCoachComponent } from './landing-coach.component';

describe('LandingCoachComponent', () => {
  let component: LandingCoachComponent;
  let fixture: ComponentFixture<LandingCoachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingCoachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
