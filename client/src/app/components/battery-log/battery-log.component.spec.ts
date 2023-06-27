import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatteryLogComponent } from './battery-log.component';

describe('BatteryLogComponent', () => {
  let component: BatteryLogComponent;
  let fixture: ComponentFixture<BatteryLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatteryLogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatteryLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
