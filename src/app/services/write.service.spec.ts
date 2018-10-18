import { TestBed, inject } from '@angular/core/testing';

import { WriteService } from './write.service';

describe('WriteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WriteService]
    });
  });

  it('should be created', inject([WriteService], (service: WriteService) => {
    expect(service).toBeTruthy();
  }));
});
