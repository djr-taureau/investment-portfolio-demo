#!/bin/bash

version = $(cat package.json | jq -r '.version')
zip -r prism-spa-$version.zip ./dist
