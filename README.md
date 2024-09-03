# fastify-crash-mre

_This repository is now archived because the bug has been fixed._

Minimal reproducible example for demonstrating [fastify bug #5220](https://github.com/fastify/fastify/issues/5220). This fatally crashes the server when using nested error handlers.

| Route (GET)                | Expected                    | Actual                                                                   |
|----------------------------|-----------------------------|--------------------------------------------------------------------------|
| `/happy`                   | Returns `{"from":"/happy"}` | Same as expected                                                         |
| `/route-throw-inner-catch` | Returns `{"from":"inner"}`  | Same as expected                                                         |
| `/route-throw-inner-throw` | Returns  `{"from":"outer"}` | Same as expected                                                         |
| `/hook-throw-inner-catch`  | Returns  `{"from":"inner"}` | Same as expected                                                         |
| `/hook-throw-inner-throw`  | Returns  `{"from":"outer"}` | Server crashes. No response is returned, and breaks all other endpoints. |