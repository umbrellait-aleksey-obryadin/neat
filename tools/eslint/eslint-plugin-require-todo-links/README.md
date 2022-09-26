# Eslint-plugin-require-todo-links

This rule is used to detect comments with words (like Todo) without linking tasks from Jira

### Usage

Add plugin to file .eslintrc.{js,json}:

```
{
    "plugins": ["require-todo-links"],
}
```

or in .eslintrc.yml:

```
  plugins:
    - require-todo-links
```

Then add rule:

```
    require-todo-links/jira: [<type>, { 'terms': <terms> }]
```

`type` - off (or 0), warn (or 1), error (or 2)

`terms` - optional array of terms to match. Default: ['todo', 'fixme', 'fix', 'to do']. Terms are matched case-insensitive and as whole words.

For example:

```
   require-todo-links/jira: 'error'
```
