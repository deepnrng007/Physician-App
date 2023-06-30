if [ "$ENV" == "prod"  ];
then
  echo "Switching to production environment"
  yes | cp -rf "./src/config/prod/.env" ./
elif [ "$ENV" == "qa"  ];
then
  echo "Switching to QA environment"
  yes | cp -rf "./src/config/qa/.env" ./
else
  echo "Switching to Dev environment"
  yes | cp -rf "./src/config/dev/.env" ./
fi