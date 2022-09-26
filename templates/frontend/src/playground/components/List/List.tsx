import React from 'react'
import { Link } from 'react-router-dom'

import styles from './List.module.scss'

import { Page } from '~/playground/types'

interface Props {
  title: string
  pages: Page[]
}

export const List = ({ pages, title }: Props) => {
  if (!pages.length) return null

  return (
    <div>
      <div className={styles.title}>{title}</div>

      <ol className={styles.list}>
        {pages.map((page) => (
          <li key={page.path}>
            <Link to={page.path}>{page.name}</Link>{' '}
            <span className={styles.tags}>{page.tags.map((tag) => `#${tag} `)}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
