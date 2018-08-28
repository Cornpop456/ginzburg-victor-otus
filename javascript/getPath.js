function getPath(node, path = '') {
  if (node.tagName === 'BODY') return path.slice(0, -1);

  const initialNode = node;

  if (node.id) {
    path = '#' + node.id + '>' + path;
    return path.slice(0, -1);
  } else {
    let pos = 1;
    while ((node = node.previousElementSibling) != null) pos++;

    const sameTags = Array.from(initialNode.parentNode.children)
      .map(elem => elem.tagName)
      .filter(elem => elem === initialNode.tagName);

    if (sameTags.length === 1) {
      path = initialNode.tagName.toLocaleLowerCase() + '>' + path;
    } else {
      path = initialNode.tagName.toLocaleLowerCase() + `:nth-child(${pos})>` + path;
    }

    return getPath(initialNode.parentElement, path);
  }
}
