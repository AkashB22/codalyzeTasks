import { TestBed } from '@angular/core/testing';

import { ProductsDetailsService } from './products-details.service';

describe('ProductsDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductsDetailsService = TestBed.get(ProductsDetailsService);
    expect(service).toBeTruthy();
  });
});
