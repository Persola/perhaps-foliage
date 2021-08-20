function updateproject {
  cd $1
  npm install
  npm run build
  cd ..
}

updateproject shared

(updateproject electron) &
(updateproject vscode) &
(updateproject web) &
(updateproject saliva) &
(updateproject pantheon) &

wait

updateproject vscode-saliva
