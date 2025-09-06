export const required = v => (v !== undefined && v !== null && `${v}`.trim() !== '')
export const numberOrEmpty = v => v === '' || !Number.isNaN(Number(v))
