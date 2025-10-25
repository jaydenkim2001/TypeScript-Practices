/* A literal type in TypeScript is a type that represents exactly one specific 
   value rather than a broad category of values. */

//===========================================================================================================================================================================================
//Q1: Write a function that selects a button style to be used in a web application.
/* Literal Type Definition:
   - Button styles: "primary", "secondary", "danger"

   Function Specification:
   - Function name: getButtonClass
   - Input: a button style (literal type)
   - Output: return a CSS class based on the given style. */

function getButtonClass(style: "primary" | "secondary" | "danger"): string {
  return `btn-${style}`;
}

// 테스트 코드
console.log(getButtonClass("primary")); // "btn-primary"
console.log(getButtonClass("secondary")); // "btn-secondary"
console.log(getButtonClass("danger")); // "btn-danger"
// console.log(getButtonClass("unknown")); // 오류 발생

//===========================================================================================================================================================================================
//Q2: Write a function that handles the different states that occur when requesting data from a server.
/* Literal Type Definition:
   - Request states: "loading", "success", "error"

   Function Specification:
   - Function name: handleRequestState
   - Input: a request state (literal type)
   - Output: return a message corresponding to the given state. */

function handleRequestState(state: "loading" | "success" | "error"): string {
  switch (state) {
    case "loading":
      return "Loading, please wait...";
    case "success":
      return "Request successful!";
    case "error":
      return "There was an error processing your request.";
    default:
      throw new Error("Error occured");
  }
}

// 테스트 코드
console.log(handleRequestState("loading")); // "Loading, please wait..."
console.log(handleRequestState("success")); // "Request successful!"
console.log(handleRequestState("error")); // "There was an error processing your request."
// console.log(handleRequestState("unknown")); // 오류 발생
