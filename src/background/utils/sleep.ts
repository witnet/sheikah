export default async function sleep(t) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, t)
  })
}