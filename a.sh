#!/bin/bash
git filter-branch --env-filter '
OLD_EMAIL="mizi.lin@admaster.com.cn"
CORRECT_NAME="amily4555"
CORRECT_EMAIL="amily4555@gmail.com"
if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
export GIT_COMMITTER_NAME="$CORRECT_NAME"
export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
export GIT_AUTHOR_NAME="$CORRECT_NAME"
export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi' --tag-name-filter cat -- --branches --tags

git push --force --tags origin 'refs/heads/*'
