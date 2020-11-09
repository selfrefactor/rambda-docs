import {TestBed} from '@angular/core/testing'
import {MethodsDataService} from './methods-data.service'

describe('MethodsDataService', () => {
  let service: MethodsDataService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(MethodsDataService)
  })

  it('should be created', () => {
    expect(service.getAllKeys()).toBeDefined()
  })
  describe('search', () => {
    [
      'rus',
      'ini',
      'flitn',
      'filr',
      'flitr',
      'fli',
      'flit',
      'foe',
      'for',
      'fora',
    ].forEach(searchInput => {
      it(`input - ${searchInput}`, () => {
        expect(service.applySearch(searchInput)).toMatchSnapshot()
      })
    })
  })

  describe('getCategoryData', () => {
    const parseResult = x => ({
      ...x,
      visibleMethods: x.visibleMethods.length,
    })

    it('active category is number', () => {
      const prop = 'add'
      const result = service.getCategoryData({
        methodCategories: service.getMethod(prop).categories,
        currentFilter: 'Number',
      })
      expect(parseResult(result)).toMatchInlineSnapshot(`
        Object {
          "activeIndex": 4,
          "methodIndexes": Array [
            4,
          ],
          "visibleMethods": 10,
        }
      `)
    })

    it('active category is default one', () => {
      const prop = 'add'
      const result = service.getCategoryData({
        methodCategories: service.getMethod(prop).categories,
        currentFilter: 'All',
      })
      expect(parseResult(result)).toMatchInlineSnapshot(`
        Object {
          "activeIndex": 0,
          "methodIndexes": Array [
            4,
          ],
          "visibleMethods": 168,
        }
      `)
    })
  })
})
