import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquiposFavoritosComponent } from './equipos-favoritos.component';

describe('EquiposFavoritosComponent', () => {
  let component: EquiposFavoritosComponent;
  let fixture: ComponentFixture<EquiposFavoritosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquiposFavoritosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquiposFavoritosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
