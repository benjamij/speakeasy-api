#!/bin/bash
rm -rf ~/.speakeasy-api-deploy
mkdir -p ~/.speakeasy-api-deploy

# Variables
version=$(node -p "require('./package.json').version")
timestamp=$(date)

# Flags (production|staging)
while [ ! $# -eq 0 ]
do
	case "$1" in
		production)
			target="production"
			;;
	esac
	shift
done

# Defining Target repository
if [ "$target" == "production" ]; then
    apiRepository="speakeasybot-api"
else
    exit;
fi

echo "Deploying SpeakEasy API to $target";

PROJECT_DIR=$(pwd)

echo "Deploying API..."

echo "Deploying from $PROJECT_DIR";

# Back-end
cp -r $PROJECT_DIR/* ~/.speakeasy-api-deploy/
cp $PROJECT_DIR/.gitignore ~/.speakeasy-api-deploy/
cp $PROJECT_DIR/key.json ~/.speakeasy-api-deploy/agent-key.json
cp $PROJECT_DIR/Procfile ~/.speakeasy-api-deploy/

echo "API ready for deploy."

cd ~/.speakeasy-api-deploy

git init
heroku git:remote -a "$apiRepository"

git add .
git commit -m "Auto-Deploy version: $version" -m "Deployed at $timestamp"

echo "Deploying API..."
git push -f heroku master
echo "API deployed."

echo "Removing temporary data..."
rm -rf ~/.speakeasy-api-deploy
echo "Temporary data removed...All done."
