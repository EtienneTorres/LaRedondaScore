import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaPlayerComponent } from './ficha-player.component';

describe('FichaPlayerComponent', () => {
  let component: FichaPlayerComponent;
  let fixture: ComponentFixture<FichaPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FichaPlayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
