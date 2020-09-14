import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SistemaCirculatorioPage } from './sistema-circulatorio.page';

describe('SistemaCirculatorioPage', () => {
  let component: SistemaCirculatorioPage;
  let fixture: ComponentFixture<SistemaCirculatorioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SistemaCirculatorioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SistemaCirculatorioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
