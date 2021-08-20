function buildproject {
  cd $1
  npm run build
  cd ..
}

buildproject shared

(buildproject electron) &
(buildproject vscode) &
(buildproject web) &
(buildproject saliva) &
(buildproject pantheon) &

wait

buildproject vscode-saliva
