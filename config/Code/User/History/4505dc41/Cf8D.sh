
HOME_PATH=$HOME

function createDir() {
    mkdir -p "$HOME_PATH/.fonts"
    mkdir -p "$HOME_PATH/.local"
    mkdir -p "$HOME_PATH/.cache"
    mkdir -p "$HOME_PATH/builds"
    mkdir -p "$HOME_PATH/Pictures"
}

function configTouchPad() {
    cp -r "" /etc/X11/xorg.conf.d/30-touchpad.conf
}

function installYay() {

}
