export const getDefault = resolvedModule => resolvedModule.default;
export const RequestsPromise = import("./services/httpService.js");
export const asyncLoadingSpinner = () =>
  import("./components/LoadingSpinner/LoadingSpinner.js").then(getDefault);
export const asyncError = import(
  "./components/ErrorComponent/ErrorComponent.js"
).then(getDefault);
