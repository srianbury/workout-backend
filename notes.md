# random notes

## Principles for Error Handling

a. Use try catch

    - especially when working with user input or external services

b. Log errors

    - time
    - location
    - stacktrace

c. Test error handling

    - ensure the error handling mechanisms are working properly

d. Provide clear error message back to the user when possible

## Advice on try/catch usage

You should use try/catch statements in strategic places where you anticipate errors could occur and where you have a specific action to take in response to that error.

It's important to balance the need for robust error handling with the maintainability and readability of the code.

In summary, use try-catch statements where it's really needed and where you have a clear action to take when an exception occurs.
