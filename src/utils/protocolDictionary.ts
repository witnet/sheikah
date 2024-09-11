import { revertObject } from '@/utils'
import { Kind } from '@/types'

export function getIndexFromProtocolKind(
  kindOptions: { [index: string]: Kind },
  primaryText: string,
): number {
  const result: string = (
    revertObject(kindOptions) as { [key in Kind]: string }
  )[primaryText as Kind]
  return Number(result)
}
