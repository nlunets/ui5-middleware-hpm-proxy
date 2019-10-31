# UI5 http-proxy-middleware based proxy

This is a middleware for [ui5-server] (https://github.com/SAP/ui5-server), enabling advanced proxy support.

Behind the scenes it leverage [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware) and will use the same configuration format.

## Install

```bash
npm install ui5-middleware-hpm-proxy --save-dev
```

```bash
yarn add ui5-middleware-hpm-proxy --dev
```


> As the devDependencies are not recognized by the UI5 tooling, they need to be listed in the `ui5 > dependencies` array. In addition, once using the `ui5 > dependencies` array you need to list all UI5 tooling relevant dependencies.

2. configure it in `$yourapp/ui5.yaml`:

```yaml
server:
  customMiddleware:
  - name: ui5-middleware-hpm-proxy
    afterMiddleware: compression
    mountPath: /
    configuration:
        logProvider: "ui5"
        logLevel: "info"
```


## Configuration options (in `$yourapp/ui5.yaml`)