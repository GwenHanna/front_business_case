import { TestBed } from '@angular/core/testing';

import { ServiceTypeService } from './serviceArticle.service';

describe('ServiceTypeService', () => {
  let service: ServiceTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
