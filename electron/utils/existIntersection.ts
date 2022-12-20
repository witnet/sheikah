export function existIntersection({
  oldWitnetNodes,
  currentNodeConfiguration,
}: {
  oldWitnetNodes: Array<string>
  currentNodeConfiguration: Array<string>
}) {
  return currentNodeConfiguration.some(ip => oldWitnetNodes.includes(ip))
}
