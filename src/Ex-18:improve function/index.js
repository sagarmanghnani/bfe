function excludeItems(items, excludes) {
  excludes.forEach(excludeItem => {
    items = items.filter((item) => {
      return item[excludeItem.k] !== excludeItem.v;
    })
  });
  return items;
}