#!/usr/bin/env bash

# 删除相关文件

rm -rf ./dist/mzmu

# 新建文件夹

mkdir ./dist/mzmu

# 编译文件
../../node_modules/.bin/tsc -p ./tsconfig.json

