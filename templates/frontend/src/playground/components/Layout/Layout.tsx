import cx from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'

import { Tags } from '~/playground/types'

import styles from './Layout.module.scss'

interface Props {
  title: string
  children: React.ReactNode
  tags: Tags[]
  className?: string
}

export const Layout = ({ title, children, tags, className }: Props) => (
  <div className={cx(styles.root, className)}>
    <div className={styles.breadcrumbs}>
      <Link className={styles.link} to="/">
        Neat Docs
      </Link>
      <div>/ {title}</div>
    </div>
    <div className={styles.tags}>{tags.map((tag) => `#${tag} `)}</div>

    <div>{children}</div>
  </div>
)
