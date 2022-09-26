import React, { useState } from 'react'

import { Tags } from '~/playground/types'

import { docs } from '../../Docs/docs'

import { MainView } from './views'

export const Main = () => {
  const [selectedTags, setSelectedTags] = useState<Tags[]>([])

  const handleChangeTag = (tag: Tags) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const filteredDocsbyTag = selectedTags.length
    ? docs.map((documents) => ({
        ...documents,
        pages: documents.pages.filter((page) =>
          page.tags.some((tag) => selectedTags.includes(tag)),
        ),
      }))
    : docs

  return (
    <MainView
      docs={filteredDocsbyTag}
      handleChangeTag={handleChangeTag}
      selectedTags={selectedTags}
    />
  )
}
