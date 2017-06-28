export function armAction(isLocked, present) {
  present({ lock: isLocked })
}

export function buttonAction(data, present) {
  present(data)
}
