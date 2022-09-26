export enum Tags {
  frontend = 'frontend',
  mobile = 'mobile',
  backend = 'backend',
}

export interface Docs {
  title: string
  pages: Page[]
}

export interface Page {
  name: string
  path: string
  tags: Tags[]
  instruction: string
  example?: {
    sourceCode: string
    component: React.ReactNode
  }
}
