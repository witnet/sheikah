import { message } from "antd"

export default function Message (text?: string) {
  return message.info(text || "Not implemented yet")
}

export { Message }
