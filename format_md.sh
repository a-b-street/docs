#!/bin/bash

set -e

if [ -z "$@" ]
then

echo "formatting all of the everything"
find book/src -name \*.md \! -name CHANGELOG.md | xargs npm run fmt

else

echo "formatting $@"
npm run fmt "$@"
fi
