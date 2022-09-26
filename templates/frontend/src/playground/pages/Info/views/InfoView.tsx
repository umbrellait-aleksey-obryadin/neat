import React, { useState } from 'react'

import { Layout } from '~/playground/components'
import { CodeOn, CodeOff } from '~/playground/icons'
import { Page } from '~/playground/types'

import styles from './InfoView.module.scss'
import 'highlight.js/styles/mono-blue.css'

interface Props {
  page: Page
}

export const InfoView = ({ page }: Props) => {
  const [showSourceCode, setShowSourceCode] = useState<boolean>(false)
  const icon = showSourceCode ? <CodeOff /> : <CodeOn />

  return (
    <Layout className={styles.root} tags={page.tags} title={page.name}>
      <div className={styles.markdown} dangerouslySetInnerHTML={{ __html: page.instruction }} />

      {page.example && (
        <div>
          <div className={styles.titleWrapper}>
            <div className={styles.title}>Example</div>
            <button className={styles.button} onClick={() => setShowSourceCode(!showSourceCode)}>
              {icon}
            </button>
          </div>
          {showSourceCode ? (
            <div className={styles.sourceCode}>
              <pre>
                <span className="hljs">{page.example?.sourceCode}</span>
              </pre>
            </div>
          ) : (
            page.example.component
          )}
        </div>
      )}
    </Layout>
  )
}
