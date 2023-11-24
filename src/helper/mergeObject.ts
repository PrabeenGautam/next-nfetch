function mergeObjects(...objects: any[]) {
  return objects.reduce((merged, currentObject) => {
    return {
      ...merged,
      ...currentObject,
      headers: {
        ...(merged.headers || {}),
        ...(currentObject.headers || {}),
      },
    };
  }, {});
}

export default mergeObjects;
