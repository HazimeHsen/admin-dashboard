const isErrorResponse = (error: unknown): error is Error => {
  return error instanceof Error && typeof error.message === "string";
};
export default isErrorResponse;
