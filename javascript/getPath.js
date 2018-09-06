function getPath(node, path = []) {
  if (node.tagName === "BODY") {
    path.push("body");
    return path.reverse().join(">");
  } else if (node.id) {
    path.push(`#${node.id}`);
    return path.reverse().join(">");
  }

  const nodeTagName = node.tagName.toLowerCase();
  const sameTags = node.parentNode.querySelectorAll(`:scope > ${nodeTagName}`);

  if (sameTags.length === 1) {
    path.push(nodeTagName);
  } else {
    const position = Array.from(sameTags).indexOf(node) + 1;
    path.push(`${nodeTagName}:nth-child(${position})`);
  }

  return getPath(node.parentElement, path);
}
