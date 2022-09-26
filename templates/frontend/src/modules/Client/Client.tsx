import React from 'react'
import { useIntl } from 'react-intl'

import { variables } from '~/styles'

import translations from './Client.i18n.json'
import styles from './Client.module.scss'

export const Client: React.FC = () => {
  const intl = useIntl()

  return (
    <div className={styles.container}>
      <div className={styles.title} style={{ color: variables.colorPrimary }}>
        {intl.formatMessage(translations.name, { name: 'Neat hero' })}
      </div>
    </div>
  )
}
