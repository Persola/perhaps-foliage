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

function updateproject {
  cd $1
  npm install > /dev/null
  if [ $? -eq 0 ]
  then
    printGreen "$1 installed"
  else
    printRed "$1 failed to install"
    return -1
  fi

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

updateproject core

if [ $? -eq 0 ]
then
  (updateproject electron) &
  (updateproject vscode) &
  (updateproject web) &
  (updateproject saliva) &
  (updateproject pantheon) &

  wait

  updateproject vscode-saliva
fi
