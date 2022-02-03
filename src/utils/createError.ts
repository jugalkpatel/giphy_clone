function createError(errName: string, errMsg: string): Error {
  const error = new Error(errMsg);
  error.name = errName;
  return new Error();
}

export { createError };
