import { TestBed } from '@angular/core/testing';

import { PokelistService } from './pokelist.service';

describe('PokelistService', () => {
  let service: PokelistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokelistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
