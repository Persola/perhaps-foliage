printRed ()
{
  red=`tput setaf 1`
  reset=`tput sgr0`
  echo "${red}$1${reset}"
}  

printGreen ()
{
  green=`tput setaf 2`
  reset=`tput sgr0`
  echo "${green}$1${reset}"
}  

function buildproject {
  cd $1
  npm run build > /dev/null
  if [ $? -eq 0 ]
  then
    printGreen "$1 built"
  else
    printRed "$1 failed to build"
    return -1
  fi
  cd ..
  return 0
}

buildproject core

if [ $? -eq 0 ]
then
  (buildproject electron) &
  (buildproject vscode) &
  (buildproject web) &
  (buildproject saliva) &
  (buildproject pantheon) &

  wait

  buildproject vscode-saliva
fi

