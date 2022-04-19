#! /usr/bin/env sh

HOOKS_FILE=${1:-./.pre-commit-hooks.yaml}
PACKAGE_FILE=./package.json

# need to fully consume file to allow usage like:
# ./sync_versions.sh > ./.pre-commit-hooks.yaml
# otherwise ./.pre-commit-hooks.yaml is overwritten
# as empty file since ">" is piped before rading
# the file in the script
content=$(< $HOOKS_FILE)

exec &> $HOOKS_FILE

while IFS= read line; do
    if [ -n "$line" ] && [ -z "${line##*sync:package.json*}" ]; then
        IFS=' ' read package version < <(
            echo $line \
                | awk '{ print $2 }' \
                | tr -d '"' \
                | tr -d "'" \
                | sed -r "s/(.)@/\1 /g"
        )
        version_in_package=$(
            cat $PACKAGE_FILE \
                | grep "\"$package\"" \
                | cut -d'"' -f 4
        )
        echo "$line" | sed "s/$(echo $version | sed 's/\^/\\^/g')/$version_in_package/g"
    else
        echo "$line"
    fi
done < <(echo "$content" | sed 's/\\/\\\\/g')
