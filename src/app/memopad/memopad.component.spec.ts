import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemopadComponent } from './memopad.component';

describe('MemopadComponent', () => {
  let component: MemopadComponent;
  let fixture: ComponentFixture<MemopadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemopadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemopadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
