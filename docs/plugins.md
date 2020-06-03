
Example plugin
`<app folder>/plugins/dist/index.js`
```js
class Logger {
  event({ type, emitter }) {
    console.log({ event: type, emitter });
  }

  action(data) {
    return { data: 'logger action' };
  }
}

module.exports = Logger;
```

## Event handlers

The value returned by an actions events will result in an error response in the resolver.

```js
class Logger {
  event({ type }) {
    if (payload.someValue < 5) {
      return 'Value should be greater than 5';
    }
  }
}

module.exports = Logger;
```

The query response will have the following

request
```json
{
  "collectons": {
    "action": "getCollections",
    "args": {
      "someValue": 2
    }
  }
}
```
response
```json
{
  "errors": {
    "collectons": "Value should be greater than 5"
  }
}
```

## Action resolvers 

Action resolvers must return an object with at least one these properties
- `data`
- `error`
