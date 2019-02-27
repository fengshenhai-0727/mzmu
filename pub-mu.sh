#!/usr/bin/env bash

_name=mzmu

# 删除相关文件
rm -rf ./dist

# 获得当前分支名
# 发布版本必须在Master分支下
# r若果当前分支不是Master, 则有可能当前功能未Merge到Master分支

_branch=`git branch | grep '*' | cut -c 3-`

if [ "$_branch" != "master" ]; then

    echo '...'
    echo "当前分支 $_branch 不是master分支"
    echo '请验证是否将版本分支merge master'
    echo '只有在master上才可以发布版本'
    echo '...'
    echo ''
    exit 0
fi

git pull origin master

if [ $? -ne 0 ]; then
    echo '文件冲突或错误'
    exit 0
fi

# 编译文件
./node_modules/.bin/tsc -p ./tsconfig.json

if [ $? -ne 0 ]; then
    echo '...'
    echo '编译错误，请检查代码，修正问题'
    echo '...'
    echo ''

    $1

    exit 0
fi

# 旧版本号
_ov=`npm view mzmu version`

echo "当前版本 -=>" $_ov

# 要发布的版本号
_version=""

# git commit 信息
_commit=""

if [ -n ]; then
    if [ "$1" == "v" ]; then
        _version="$2"
        _commit="$4"
    elif [ "$1" == "m" ]; then
        _version="$4"
        _commit="$2"
    fi
fi

if [ "$_version" == "" ]; then
    _version=`npm version patch --no-git-tag-version`
else
    npm version $_version --no-git-tag-version
fi

echo "::::: 推送到NPM $_ov -> $_version"

## 拷贝文件
cp ./package.json ./dist/package.json
cp ./README.md ./dist/README.md
cp ./common.d.ts ./dist/common.d.ts


echo ":::::: 推送到NPM"
    npm publish ./dist

if [ $? -eq 0 ]; then

    echo ":::::::::::: Git Mark 此次修改信息"
    git pull
    git add .
    git commit -am "$_ov -> $_version :: $_commit"
    git pull
    git push

    _tag="$_version"

    echo "::::::::::::::: Git Tag"
    git tag $_tag -m "$_ov -> $_version :: $_commit"
    git push --tags
fi
