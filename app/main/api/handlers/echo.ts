/**
 * Echo handler
 */
async function echo(system: any, params: Array<any>) {
  return `I got: ${params.join(", ")}`
}

export default echo
