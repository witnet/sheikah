export interface WebContents {
  send(channel: string, ...args: Array<any>): void,
}

export interface Event {
  sender: WebContents,
  returnValue: any,
}
