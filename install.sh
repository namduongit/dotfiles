#!/bin/bash
# @author: github.com/namduongit
# @contact: nguyennamduong205@gmail.com

# Help
# pacman --needed: only install packages that are NOT installed
# comm -12 <(pacman -Slq | sort) <(sort "./packages/package-list")
# File 1        File 2      
# a             m
# b             a
# d             n
# e             b

# Output column 1: Only in a
# Output column 2: Only in b
# Output column 3: In a and in b
# -1 is Hide column 1 and -2 is Hide column 2 -> Get intersection element 

# xargs: remove "\n" char

HOME_USER=$HOME
PWD=$(pwd)

DWM_GIT="https://github.com/namduongit/dwm"
YAY_GIT="https://aur.archlinux.org/yay.git"

BUID_PATH="$HOME_USER/Builds"
PICTURE_PATH="$HOME_USER/Pictures"
CONFIG_PATH="$HOME_USER/.config"

main_dotfile() {
    echo "Install packages using dotfile"
    echo "Please check which operating system (OS) you are using. This dotfile will install the WM as dwm (X11)."
    echo " -------------------------------------------------------"
    echo "| Github  : https://github.com/namduongit/dotfiles      |"
    echo "| OS      : Arch Linux x86_64                           |"
    echo "| WM      : dwm (X11)                                   |"
    echo " -------------------------------------------------------"
}

configure_folder() {
    [ ! -d "$BUID_PATH" ] && mkdir -p "$BUID_PATH"
    [ ! -d "$PICTURE_PATH" ] && mkdir -p "$BUID_PATH"
    [ ! -d "$CONFIG_PATH" ] && mkdir -p "$BUID_PATH"
}

install_package() {
    valid_package=$(comm -12 <(pacman -Slq | sort) <(sort ./packages/package-list) | xargs)
    echo "Script will install some packages: $valid_package"
    read -r -p "Do you want to continue (they will be ignored)? [Y/n] " answer
    case $answer in
        ""|[Yy]* );;
        * ) exit 1;;
    esac
    sudo pacman -S --needed $valid_package
    echo "Download packages successful"
}

install_driver() {
    echo "Install intel driver and NVIDIA driver (mesa and nvidia driver)"
    valid_package=$(comm -12 <(pacman -Slq | sort) <(sort ./packages/driver) | xargs)
    echo "Script will install some package: $valid_package"
    case $answer in
        ""|[Yy]* );;
        * ) exit 1;;
    esac
    sudo pacman -S --needed $valid_package
    echo "Download some driver package successful"
}

install_support() {
    valid_package=$(comm -12 <(pacman -Slq | sort) <(sort ./packages/support) | xargs)
    echo "Script will install some package: $valid_package"
    case $answer in
        ""|[Yy]* );;
        * ) exit 1;;
    esac
    sudo pacman -S --needed $valid_package
    echo "Download some support package successful"
}

install_font() {
    valid_package=$(comm -12 <(pacman -Slq | sort) <(sort ./packages/fonts) | xargs)
    echo "Script will install some package: $valid_package"
    case $answer in
        ""|[Yy]* );;
        * ) exit 1;;
    esac
    sudo pacman -S --needed $valid_package
    echo "Download some fonts successful"
}

install_yay() {
    cd "$BUID_PATH" && git clone "$YAY_GIT" && cd yay && makepkg -si
    valid_package=$(comm -12 <(yay -Slq | sort) <(sort ./packages/yay-pkg) | xargs)
    echo "Do you want to install a package from yay?: $valid_package"
    case $answer in
        ""|[Yy]* );;
        * ) exit 1;;
    esac
    yay -S --needed $valid_package
    echo "Download some package from yay successful"
    cd "$PWD" || exit
}

main_dotfile
read -r -p "Do you want to use this Script (they will be ignored)? [Y/n] " answer
case $answer in
    ""|[Yy]* );;cp -r "./.zshrc" "$HOME_USER/.zshrc"
    * ) exit 1;;
esac

echo "Configure and create folders"
configure_folder

echo "Install packeges from pacman"
install_package
install_driver
install_support

echo "Install yay package manager"
install_yay

sudo cp -r "./etc/X11/xorg.conf.d/30-touchpad.conf" "/etc/X11/xorg.conf.d/30-touchpad.conf"
sudo cp -r "./packages/font/*" "/usr/share/fonts/"

cp -r "./configs/*" "$CONFIG_PATH/"
cp -r "./desktop" "$PICTURE_PATH/desktop-image.png"
cp -r "./.xinitrc" "$HOME_USER/.xinitrc"
cp -r "./.zshrc" "$HOME_USER/.zshrc"

chsh -s "$(which zsh)"

reboot