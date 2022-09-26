import React from 'react'
import { useIntl } from 'react-intl'

import translations from './Admin.i18n.json'
import styles from './Admin.module.scss'

export const Admin: React.FC = () => {
  const intl = useIntl()

  return (
    <div className={styles.title}>
      {intl.formatMessage(translations.name, { name: 'Neat hero' })}
    </div>
  )
}
