#!/bin/bash
# @author: namduongit

YAY_AUR="https://aur.archlinux.org/yay.git"
GIT_DWM="https://github.com/namduongit/dwm"

WORK_DIR=$(pwd)

BUILDS_DIR="$HOME/Builds"
DEV_DIR="$HOME/Dev"
DOCS_DIR="$HOME/Documents"
PICS_DIR="$HOME/Pictures"

CONFIGS_DIR="$HOME/.config"


function initDirectory() {
    [ ! -d "$BUILDS_DIR" ] && mkdir -p "$BUILDS_DIR"
    [ ! -d "$DEV_DIR" ] && mkdir -p "$DEV_DIR"
    [ ! -d "$DOCS_DIR" ] && mkdir -p "$DOCS_DIR"
    [ ! -d "$PICS_DIR" ] && mkdir -p "$PICS_DIR"
    [ ! -d "$CONFIGS_DIR" ] && mkdir -p "$CONFIGS_DIR"
}

function installPackages() {
    echo -e "\nInstalling packages from ./packages/** ..."
    for package in ./packages/*; do
        echo -e "\nInstalling packages from $package ..."
        pkglist_clean=$(grep -v "#" "$package" | grep -v "^$")
        if [ -n "$pkglist_clean" ]; then
            sudo pacman -S --needed $(comm -12 <(pacman -Slq | sort) <(echo "$pkglist_clean" | sort))
        fi
    done 
}

function installYayAUR() {
    cd "$BUILDS_DIR" && git clone "$YAY_AUR" && cd yay && makepkg -si
    cd "$WORK_DIR"
}

function installDwmSuckless() {
    cd "$BUILDS_DIR" && git clone "$GIT_DWM" && cd dwm && sudo make install
    cd "$WORK_DIR"
}

function buildConfigs() {
    echo -e "\nBuilding configs from ./configs/**"
    cp -r "./configs/dwmbar" "$CONFIGS_DIR/"
    cp -r "./configs/rofi" "$CONFIGS_DIR/"
    cp -r "./configs/alacritty" "$CONFIGS_DIR/"
    cp -r "./configs/yazi" "$CONFIGS_DIR/"
    cp -r "./configs/zsh" "$CONFIGS_DIR/"
}

function buildX11() {
    echo -e "\nBuilding X11 config ..."
    sudo cp ./x11/* /etc/X11/xorg.conf.d/
}

function buildZsh() {
    echo -e "\nBuilding Zsh config ..."
    cp ./.zshrc "$HOME/"
}

initDirectory
installPackages
installYayAUR
installDwmSuckless
buildConfigs
buildX11
buildZsh
echo -e "\nInstallation completed!"
echo "Reboot required. Run 'sudo reboot' to restart the system."