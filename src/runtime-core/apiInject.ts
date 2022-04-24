import { getCurrentInstance } from "./component";

export function provide(key, value) {
  const currentInstance: any = getCurrentInstance();
  if (currentInstance) {
    let { provides } = currentInstance;

    const parentProvides = currentInstance.parent.provides;

    if (provides == parentProvides) {
      currentInstance.provides = Object.create(parentProvides);
      console.log(Object.create(parentProvides));

      provides = currentInstance.provides;
    }

    provides[key] = value;
    console.log(provides);
  }
}

export function inject(key, defaultValue) {
  const currentInstace: any = getCurrentInstance();
  if (currentInstace) {
    const parentProvides = currentInstace.parent.provides;

    if (key in parentProvides) {
      return parentProvides[key];
    } else if (defaultValue) {
      if (typeof defaultValue === "function") {
        return defaultValue();
      }
      return defaultValue;
    }
  }
}
