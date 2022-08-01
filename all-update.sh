function updateproject {
  cd $1
  npm install
  npm run build
  cd ..
}

updateproject core

(updateproject electron) &
(updateproject vscode) &
(updateproject web) &
(updateproject saliva) &
(updateproject pantheon) &

wait

updateproject vscode-saliva
