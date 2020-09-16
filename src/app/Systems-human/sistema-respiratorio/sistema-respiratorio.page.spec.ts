import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SistemaRespiratorioPage } from './sistema-respiratorio.page';

describe('SistemaRespiratorioPage', () => {
  let component: SistemaRespiratorioPage;
  let fixture: ComponentFixture<SistemaRespiratorioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SistemaRespiratorioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SistemaRespiratorioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
