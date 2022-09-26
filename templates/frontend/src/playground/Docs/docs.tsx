import React from 'react'

import {
  FormHookDocs,
  FormContextDocs,
  ExampleFormHookDocs,
  ExampleFormHook,
  ExampleFormFieldDocs,
  ExampleFormField,
} from '~/lib/form'
import { LoggerDocs, ExampleLoggerDocs, ExampleLogger } from '~/lib/logger'
import { NotifyDocs, ExampleNotify, ExampleNotifyDocs } from '~/lib/notify/'
import { Tags, Docs } from '~/playground/types'

import BackendDocs from './Backend.md'
import FrontendDocs from './Frontend.md'
import MobileDocs from './Mobile.md'

export const docs: Docs[] = [
  {
    title: 'Initialization',
    pages: [
      {
        path: '/initialization-frontend',
        name: 'How to init frontend app with @neat',
        instruction: FrontendDocs,
        tags: [Tags.frontend],
      },
      {
        path: '/initialization-backend',
        name: 'How to init backend app with @neat',
        instruction: BackendDocs,
        tags: [Tags.backend],
      },
      {
        path: '/initialization-mobile',
        name: 'How to init mobile app with @neat',
        instruction: MobileDocs,
        tags: [Tags.mobile],
      },
    ],
  },
  {
    title: 'Libraries',
    pages: [
      {
        path: '/logger',
        instruction: LoggerDocs,
        example: {
          sourceCode: ExampleLoggerDocs,
          component: <ExampleLogger />,
        },
        name: 'How to use «logger»',
        tags: [Tags.frontend, Tags.mobile],
      },
      {
        path: '/notify',
        instruction: NotifyDocs,
        example: {
          sourceCode: ExampleNotifyDocs,
          component: <ExampleNotify />,
        },
        name: 'How to use «notify»',
        tags: [Tags.frontend, Tags.mobile],
      },
      {
        path: '/form-hook',
        name: 'How to use «form» hook',
        example: {
          sourceCode: ExampleFormHookDocs,
          component: <ExampleFormHook />,
        },
        instruction: FormHookDocs,
        tags: [Tags.frontend, Tags.mobile],
      },
      {
        path: '/form-context',
        instruction: FormContextDocs,
        example: {
          sourceCode: ExampleFormFieldDocs,
          component: <ExampleFormField />,
        },
        name: 'How to use «form» context',
        tags: [Tags.frontend, Tags.mobile],
      },
    ],
  },
]
