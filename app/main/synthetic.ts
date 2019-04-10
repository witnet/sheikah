export interface WebContents {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  send(channel: string, ...args: Array<any>): void,
}

export interface Event {
  sender: WebContents,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  returnValue: any,
}
