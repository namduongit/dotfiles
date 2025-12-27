**ROOT PATH**: /usr/share/application
- Sample script for creating desktop icons

- Example script:
```bash
[Desktop Entry]
Name=drawio
Comment=A diagramming and whiteboarding desktop app
Exec=/usr/bin/drawio %f
Terminal=false
Type=Application
Icon=drawio
StartupWMClass=draw.io
Categories=Graphics;
MimeType=application/vnd.jgraph.mxfile;application/vnd.visio;
```

- Explain:
`Name`: App name
`Comment`: Explain, describe the app, etc, ...
`Exec`: Path to the application startup script 
`Icon`: Icon app
... A few other setups

- Read more at path: `./android-studio/android-studio.desktop` and `./drawio/drawio.desktop`