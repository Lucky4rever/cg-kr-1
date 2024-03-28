/**
 * Represents a generic tuple type.
 * @template T - The type of the tuple elements.
 */
type Tuple<T extends any> = T extends [infer A, ...infer B] ? [A, ...Tuple<B>] : T;

/**
 * Creates a tuple from the provided arguments.
 * @param args The arguments to be included in the tuple.
 * @returns The tuple containing the provided arguments.
 */
function createTuple<T extends any[]>(...args: T): Tuple<T> {
  const tuple: Tuple<T> = args as Tuple<T>;
  return tuple;
}

export type { Tuple };
export { createTuple };
