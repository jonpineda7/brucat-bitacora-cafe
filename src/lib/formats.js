export const toRatio = (gramsCoffee, gramsWater) => {
  if(!gramsCoffee || !gramsWater) return ''
  const r = (gramsWater / gramsCoffee).toFixed(1)
  return `1:${r}`
}
