#!/bin/sh

set -o errexit
set -o nounset
set -o pipefail
set -o xtrace

apk --no-cache add git
git config --global user.email xiaoxiangmoe@gmail.com
git config --global user.name ZHAO Jinxiang

yarn install --frozen-lockfile
yarn workspace typescript-macros-docs run build
yarn global add gh-pages
gh-pages --dist=docs/.docz/dist
