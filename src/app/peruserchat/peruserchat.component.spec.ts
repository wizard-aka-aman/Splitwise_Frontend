import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeruserchatComponent } from './peruserchat.component';

describe('PeruserchatComponent', () => {
  let component: PeruserchatComponent;
  let fixture: ComponentFixture<PeruserchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeruserchatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeruserchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
