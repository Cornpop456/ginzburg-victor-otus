function getPath(node, path = '') {
  if (node.tagName === 'BODY') {
    return path.slice(0, -1);
  } else if (node.id) {
    path = '#' + node.id + '>' + path;
    return path.slice(0, -1);
  }

  const nodeTagName = node.tagName.toLocaleLowerCase(),
    sameTags = Array.from(node.parentNode.children).filter(elem => elem.tagName === node.tagName);

  if (sameTags.length === 1) {
    path = nodeTagName + '>' + path;
  } else {
    let tempNode = node,
      pos = 1;
    while ((tempNode = tempNode.previousElementSibling) !== null) pos++;
    path = nodeTagName + `:nth-child(${pos})>` + path;
  }

  return getPath(node.parentElement, path);
}
