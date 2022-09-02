# Extensible API for Rendering D3 Charts Server-Side

## Adding A New Visualization

Each visualization should be packaged inside a dedicated folder at the root of this repository. The folder should include at least the following 2 items:

- Handler function to be called on `GET /<name-of-visualization>`. This function will have the form:

  ```
  (req, res) => {
        //
        // additional code here
        //
        res.send(...)
    };
  ```

- An `Info` object that contains at least `name`, `description`, `required_params` key/values. An example is shown below. This information will extend baseline information about the visualization id, url, etc. that is published at the root of this api (`/`).

  See `app.js` and `appinfo.js` in the root of this repository for additional information on how this works.

  Example Info object:

  ```
  {
   name: 'Dam Profile Chart',
   description: `Dam Profile Chart Description`,
   required_params: ['pool', 'tail', 'inflow', 'outflow'],
  };
  ```
