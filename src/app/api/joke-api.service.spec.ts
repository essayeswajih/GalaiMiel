import { TestBed } from '@angular/core/testing';

import { JokeApiService } from './joke-api.service';

describe('JokeApiService', () => {
  let service: JokeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JokeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
