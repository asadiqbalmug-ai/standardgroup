// Multi-color accent palette used across the storefront so the site is no
// longer mono-teal. Each accent ships matching solid / soft / text shades so
// section headers, category cards and badges can vary their color while staying
// readable. Pick deterministically by index or by a string key (category slug).

export const ACCENTS = [
  { name: 'teal',   solid: '#0F766E', soft: '#CCFBF1', text: '#0F766E', ring: '#5EEAD4' },
  { name: 'navy',   solid: '#1E3A8A', soft: '#DBEAFE', text: '#1E3A8A', ring: '#93C5FD' },
  { name: 'rust',   solid: '#C2410C', soft: '#FFEDD5', text: '#C2410C', ring: '#FDBA74' },
  { name: 'amber',  solid: '#B45309', soft: '#FEF3C7', text: '#B45309', ring: '#FCD34D' },
  { name: 'green',  solid: '#15803D', soft: '#DCFCE7', text: '#15803D', ring: '#86EFAC' },
  { name: 'purple', solid: '#6D28D9', soft: '#EDE9FE', text: '#6D28D9', ring: '#C4B5FD' },
  { name: 'rose',   solid: '#BE123C', soft: '#FFE4E6', text: '#BE123C', ring: '#FDA4AF' },
  { name: 'sky',    solid: '#0369A1', soft: '#E0F2FE', text: '#0369A1', ring: '#7DD3FC' },
]

function hash(str) {
  let h = 0
  for (let i = 0; i < (str || '').length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0
  return h
}

export function accentByIndex(i) {
  return ACCENTS[((i % ACCENTS.length) + ACCENTS.length) % ACCENTS.length]
}

export function accentForKey(key) {
  return ACCENTS[hash(key) % ACCENTS.length]
}
