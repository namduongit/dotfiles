#/bin/bash
xfce4-screenshooter --region --save /tmp/shot.png
xclip -selection clipboard -t image/png /tmp/shot.png
rm -rf /tmp/shot.png
