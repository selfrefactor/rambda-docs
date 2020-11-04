import { TestBed } from "@angular/core/testing";
import { MethodsDataService } from "./methods-data.service";

describe("MethodsDataService", () => {
  let service: MethodsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MethodsDataService);
  });

  it("should be created", () => {
    expect(service.getAllKeys()).toMatchSnapshot();
  });
  it.only("should be created", () => {
    expect(service.applySearch("for")).toMatchInlineSnapshot(`
      Array [
        "or",
        "forEach",
        "xor",
        "filter",
        "pathOr",
        "propOr",
        "F",
      ]
    `);
    // expect(service.applySearch('flitr')).toBeDefined();
  });

  describe("getCategoryData", () => {
    const parseResult = (x) => ({
      ...x,
      visibleMethods: x.visibleMethods.length,
    });

    it("active category is number", () => {
      const prop = "add";
      const result = service.getCategoryData({
        methodCategories: service.getMethod(prop).categories,
        currentFilter: "Number",
      });
      expect(parseResult(result)).toMatchInlineSnapshot(`
        Object {
          "activeIndex": 4,
          "methodIndexes": Array [
            4,
          ],
          "visibleMethods": 10,
        }
      `);
    });

    it("active category is default one", () => {
      const prop = "add";
      const result = service.getCategoryData({
        methodCategories: service.getMethod(prop).categories,
        currentFilter: "All",
      });
      expect(parseResult(result)).toMatchInlineSnapshot(`
        Object {
          "activeIndex": 0,
          "methodIndexes": Array [
            4,
          ],
          "visibleMethods": 168,
        }
      `);
    });
  });
});
