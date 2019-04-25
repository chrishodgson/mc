#!/bin/sh
archive="../mountain-challenge.tar.gz1" 
files=( $archive "node_modules" "client/node_modules" "package-lock.json" "client/package-lock.json" ".git")

for item in "${files[@]}"
do
  if [ -f "$item" ]; then
     echo "removing file $item"   
     rm $item
  elif [ -d "$item" ]; then
     echo "removing directory $item"   
     rm -rf $item
  fi 
done

# git init && git remote add origin https://github.com/chrishodgson/react-node-mountain-challenge.git

tar -czf $archive .
ls -lh $archive
