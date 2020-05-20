import {TestBed} from '@angular/core/testing'
import {MethodsDataService} from './methods-data.service'

describe('MethodsDataService', () => {
  let service: MethodsDataService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(MethodsDataService)
  })

  it('should be created', () => {
    expect(service.getMethodsList()).toMatchSnapshot()
  })
})
