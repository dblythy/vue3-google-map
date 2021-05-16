# Changelog

## `0.8.0`

- This is a major change and has breaking changes from the `0.7.x` api
- The `apiKey` parameter is now just `api` and can be passed a string value for the API_KEY, however, if other options are desired on the Google API (such as libraries, region, etc) then you will just pass in a dictionary of parameters to `api`. Both examples below are valid:
    ```html
    <GoogleMap api="my-key" />
    ```
    as well as 
    ```html
    <GoogleMap api="{ apiKey: 'my-key', libraries: ['places'] }">
    ```
- All options for the component can be found on the `options` parameter and are strongly typed
- Properties/options which are setup to animate/transition are still exposed on the root of the 

The documentation has been updated to reflect these changes