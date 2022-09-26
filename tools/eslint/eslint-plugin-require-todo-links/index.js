const ruleRequireTodoLinks = {
  meta: {
    docs: {
      description:
        'Use to detect todo comments without links (Jira/Notion/etc.). This is needed to force tracking all technical debt issues in the backlog',
      recommended: true,
    },
    schema: [
      {
        type: 'object',
        properties: {
          terms: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create: function (context) {
    const sourceCode = context.getSourceCode(),
      configuration = context.options[0] || {},
      warningTerms = configuration.terms || ['todo', 'fixme', 'fix', 'to do']

    function reportInvalidTodos(node) {
      const comment = node.value.toLowerCase()

      warningTerms.forEach((term) => {
        if (comment.includes(term) && !comment.includes('https://neattech.atlassian.net/')) {
          return context.report(node, 'Use TODO/Fix comments with task link from Jira')
        }
      })
    }

    return {
      Program() {
        const comments = sourceCode.getAllComments()

        comments.filter((token) => token.type !== 'Shebang').forEach(reportInvalidTodos)
      },
    }
  },
}

module.exports = {
  rules: {
    jira: ruleRequireTodoLinks,
  },
}
