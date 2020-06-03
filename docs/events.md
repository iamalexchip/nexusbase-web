

## `action.*`

Action events will have the following data structure
```
{
  type: 'action.collections.browse.before',
  payload: {}
  meta: {
    mainDB: LodashWrapper {},
    workspaceDB: LodashWrapper {}
  }
}
```

The payload will have the following data:
- Before events `action.*.before` will have the submitted arguments.
- After events `action.*.before` have the resolver result.
