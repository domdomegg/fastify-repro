# fastify-crash-mre

Minimal reproducible example for demonstrating a bug that can crash fastify.

| Route (GET)                | Expected                    | Actual                                                                   |
|----------------------------|-----------------------------|--------------------------------------------------------------------------|
| `/happy`                   | Returns `{"from":"/happy"}` | Same as expected                                                         |
| `/route-throw-inner-catch` | Returns `{"from":"inner"}`  | Same as expected                                                         |
| `/route-throw-inner-throw` | Returns  `{"from":"outer"}` | Same as expected                                                         |
| `/hook-throw-inner-catch`  | Returns  `{"from":"inner"}` | Same as expected                                                         |
| `/hook-throw-inner-throw`  | Returns  `{"from":"outer"}` | Server crashes. No response is returned, and breaks all other endpoints. |