export interface Entry {
  port: number
  name: string
  path: string
  template: string
  favicon: string
}

interface NeatConfigEntry {
  port: number
  path: string
  template?: string // default ./public/index.ejs
  favicon?: string // default ./public/favicon
}

export interface NeatConfig {
  name: string
  entries: Record<string, NeatConfigEntry>
}
