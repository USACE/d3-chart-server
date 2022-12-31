# Extensible API for Rendering D3 Charts Server-Side

## Adding A New Chart

Each chart should be packaged inside a dedicated folder. At the time of this writing, the charts are located in the directory `_charts` in the root of this repository. However, the intent is that these will be moved to a separate npm package that can be used for client-side or server-side (chartserver) rendering. The charts in this directory should not contain any http-specific logic. Each chart should be a function that accepts a configuration object (with keys/values), and a "dom" (node for the D3 code to act against).

To implement the HTTP endpoint that serves a particular chart, create a new file in the directory `handlers`. The file will contain two exports:

1. The handler (which should also be the default export) is a function that is called at route `GET /<name-of-chart>`. This function will have the following form:

```
(req, res) => {
      //
      // additional code here
      //
      res.send(dom.outerHTML)
  };
```

2. An `INFO` object that contains at least `name`, `description`, `required_params` key/values. An example is shown below. This information will be used to extend baseline information about the chart id, url, etc. that is published at the root of this api (`/`). See `app.js` and `appinfo.js` in the root of this repository for additional information on how this works.

Example INFO object:

```
const INFO = {
 name: 'Dam Profile Chart',
 description: `Dam Profile Chart Description`,
 required_params: ['pool', 'tail', 'inflow', 'outflow'],
};
```
