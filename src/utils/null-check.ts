/**
 * Checks if a value is null and throws an error if it is.
 * @param value - The value to check.
 * @param message - Optional. The error message to throw if the value is null.
 * @throws {Error} - Throws an error if the value is null.
 */
function nullCheck(value: unknown, message?: string) {
  if (value === null) {
    throw new Error(message ?? 'value must not be null');
  }
}

export default nullCheck;
