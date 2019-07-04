#!/bin/bash

app_version=$(cat package.json | jq -r '.version')
git_hash=$(git log --pretty=format:'%h' -n 1)
version="$app_version.$git_hash"
echo "Creating zip for version $version"
zip -r prism-spa-$version.zip ./dist
