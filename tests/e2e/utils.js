export function createSelection(field, start, end) {
  if (field.createTextRange) {
    var selRange = field.createTextRange()
    selRange.collapse(true)
    selRange.moveStart('character', start)
    selRange.moveEnd('character', end)
    selRange.select()
  } else if (field.setSelectionRange) {
    field.setSelectionRange(start, end)
  } else if (field.selectionStart) {
    field.selectionStart = start
    field.selectionEnd = end
  }
  field.focus()
  return field[0].innerHTML
}
