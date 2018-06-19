export type WebContents = {
  send(channel: string, ...args: Array<any>): void
}

export type Event = {
  sender: WebContents;
  returnValue: any;
}
