#!/bin/bash
mkdir -p converted
for f in *.mp4; do
  [ -e "$f" ] || continue
  ffmpeg -i "$f" -c:v libx264 -c:a copy "converted/$f"
done
