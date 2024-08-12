import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleDarkmodeComponent } from './toggle-darkmode.component';

describe('ToggleDarkmodeComponent', () => {
  let component: ToggleDarkmodeComponent;
  let fixture: ComponentFixture<ToggleDarkmodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToggleDarkmodeComponent]
    });
    fixture = TestBed.createComponent(ToggleDarkmodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
