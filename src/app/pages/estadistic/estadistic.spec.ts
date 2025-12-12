import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Estadistic } from './estadistic';

describe('Estadistic', () => {
  let component: Estadistic;
  let fixture: ComponentFixture<Estadistic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Estadistic]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Estadistic);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
