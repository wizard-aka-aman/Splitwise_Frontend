import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalchatComponent } from './personalchat.component';

describe('PersonalchatComponent', () => {
  let component: PersonalchatComponent;
  let fixture: ComponentFixture<PersonalchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalchatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
