# Rambda docs

Build with **Angular 10**

## Acknowledgement

- rxjs-fruits - for providing working `monaco editor` configuration

- shiki - for allowing me to use my own VSCode theme in code highlighting

## TODO

- extract shortest definition; otherwise there is no point of code snippet mode

- add firefox and mobile to `snap`

## E2E tests

With video:

```
"test:e2e": "folio e2e/specs --param browserName=chromium -p video",
```

## Troubleshoot

### Update deps

`Angular-material` is limiting update as its cdk version should match that of this project

### npm ERR! code EINTEGRITY

`npm config set package-lock false`