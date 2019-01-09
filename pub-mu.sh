#!/usr/bin/env bash

_name=mzm

# 删除相关文件

rm -rf ./dist/$_name

# 新建文件夹

mkdir ./dist/$_name


# 更新文件
cd ./$_name

    git checkout master

    if [ $? -ne 0 ]; then
        echo '切换分支错误'
        exit 0
    fi

    git pull origin master

    if [ $? -ne 0 ]; then
        echo '文件冲突或错误'
        exit 0
    fi

    # 编译文件
    ../node_modules/.bin/tsc -p ./tsconfig.json

    if [ $? -ne 0 ]; then
        echo 编译错误
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
cd ..