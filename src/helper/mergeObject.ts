function mergeObjects(...objects: any[]) {
  return objects.reduce((merged, currentObject) => {
    return {
      ...merged,
      ...currentObject,
      headers: {
        ...(merged.headers || {}),
        ...(currentObject.headers || {}),
      },
      next: {
        ...(merged.next || {}),
        ...(currentObject.next || {}),
      },
    };
  }, {});
}

export default mergeObjects;
