# Dynamoc

> Dynamoc is a GUI client for dynamodb-local, dynalite and AWS dynamodb

## Build status

[![Build Status](https://travis-ci.org/ieiayaobb/dynamoc.svg?branch=master)](https://travis-ci.org/ieiayaobb/dynamoc)

## Screenshots

 ![connect](https://raw.githubusercontent.com/ieiayaobb/dynamoc/master/screenshots/connect.png)
 ![datasheet](https://raw.githubusercontent.com/ieiayaobb/dynamoc/master/screenshots/datasheet.png)
 ![record](https://raw.githubusercontent.com/ieiayaobb/dynamoc/master/screenshots/record.png)

## How to build

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron app for production
npm run build

# lint all JS/Vue component files in `app/src`
npm run lint

# run webpack in production
npm run pack
```

## TODO list
 - [ ] Loading mask for operations
 - [ ] Previous page for scan
 - [x] Query on Primary Key
 - [x] Query on GSI
 - [x] View detail record on JSON value
 - [ ] Edit specified record
 - [ ] Delete specified record

---
## Thanks to
 - vuejs
 - vue-router
 - vuex
 - Element-UI
 - electron
 - electron-vue

## LINCESE
MIT
