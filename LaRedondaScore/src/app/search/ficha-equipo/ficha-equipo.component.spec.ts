import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaEquipoComponent } from './ficha-equipo.component';

describe('FichaEquipoComponent', () => {
  let component: FichaEquipoComponent;
  let fixture: ComponentFixture<FichaEquipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FichaEquipoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
