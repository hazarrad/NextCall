import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramDescriptionComponent } from './program-description.component';

describe('ProgramDescriptionComponent', () => {
  let component: ProgramDescriptionComponent;
  let fixture: ComponentFixture<ProgramDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
