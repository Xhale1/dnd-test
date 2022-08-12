import { useMemo } from "use-memo-one";
import useEffectOnce from "../../use-effect-once";
import createRegistry from "./create-registry";
import type { Registry } from "./registry-types";

export default function useRegistry(): Registry {
  const registry: Registry = useMemo(createRegistry, []);

  // Hack to get around react 18 double render in useEffect hook
  useEffectOnce(() => {
    return function unmount() {
      // clean up the registry to avoid any leaks
      // doing it after an animation frame so that other things unmounting
      // can continue to interact with the registry
      requestAnimationFrame(registry.clean);
    };
  });

  return registry;
}
