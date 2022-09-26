export * from './Root'

export const convertMarkdown = (file: unknown) => {
  const convertedFile = file as { attributes: unknown; html: string }
  return convertedFile.html
}
