import { ImportMyMeta } from "../env";
/**
 * Work around for now until we can figure out why we're getting typing errors
 * for all the ENV variables.
 *
 * Note: using a `.d.ts` file was causing rollup to fail so have renamed
 * `env.d.ts` to `env.ts` for now.
 */
export function getEnv(): ImportMyMeta["env"] {
  return (import.meta as unknown as ImportMyMeta).env;
}
