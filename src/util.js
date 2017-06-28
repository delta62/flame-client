Array.range = n => {
  const ret = new Array(n)
  for (let i = 0; i < n; i++) ret[i] = i
  return ret
}
