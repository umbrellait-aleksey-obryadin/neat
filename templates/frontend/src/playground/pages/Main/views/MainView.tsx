import React from 'react'

import { List } from '~/playground/components'
import { Tags, Docs } from '~/playground/types'
import { cx } from '~/styles'

import styles from './MainView.module.scss'

interface Props {
  selectedTags: Tags[]
  handleChangeTag: (tag: Tags) => void
  docs: Docs[]
}

export const MainView = ({ selectedTags, handleChangeTag, docs }: Props) => (
  <div className={styles.container}>
    <div className={styles.title}>Neat Docs</div>
    <div className={styles.tags}>
      {Object.values(Tags).map((tag) => (
        <button
          className={cx(styles.tag, selectedTags.includes(tag) && styles.active)}
          key={tag}
          onClick={() => handleChangeTag(tag)}
        >
          #{tag}
        </button>
      ))}
    </div>
    {docs.map((document) => (
      <List key={document.title} pages={document.pages} title={document.title} />
    ))}
  </div>
)
