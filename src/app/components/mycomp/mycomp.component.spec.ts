/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MycompComponent } from './mycomp.component';

describe('MycompComponent', () => {
  let component: MycompComponent;
  let fixture: ComponentFixture<MycompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MycompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MycompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
