import { flatten } from 'lodash'
import React from 'react'
import { useParams } from 'react-router-dom'

import { docs } from '../../Docs/docs'

import { InfoView } from './views'

export const Info = () => {
  const { id } = useParams()
  const page = flatten(docs.map((document) => document.pages)).find(
    (page) => page.path === `/${id}`,
  )

  if (!page) return null

  return <InfoView page={page} />
}
