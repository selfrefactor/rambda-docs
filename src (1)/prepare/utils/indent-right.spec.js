import { indentRight } from "./indent-right";
import { add } from "../../data.json";

test("R.add", () => {
  expect(indentRight(add.rambdaSource)).toMatchInlineSnapshot(`
    "export function add(a, b){                                                      
      if (arguments.length === 1) return _b => add(a, _b)                           
                                                                                    
      return Number(a) + Number(b)                                                  
    }                                                                               "
  `);
});
