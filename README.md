# Dotfiles for Arch Linux with DWM

My personal dotfiles configuration for Arch Linux with DWM window manager.

## Prerequisites

- Fresh Arch Linux installation
- Base system installed and configured
- Internet connection
- Git installed

## Installation

### 1. Clone this repository

```bash
cd ~
git clone https://github.com/namduongit/dotfiles.git
cd dotfiles
```

### 2. Run the installation script

```bash
chmod +x install.sh
./install.sh
```

### 3. Reboot the system

```bash
sudo reboot
```

## What's Included

### Window Manager
- **DWM** - Dynamic Window Manager (built from source)

### Terminal & Shell
- **Alacritty** - Modern terminal emulator
- **Zsh** - Z shell with custom configuration

### Applications
- **Rofi** - Application launcher
- **Yazi** - Terminal file manager
- **dwmbar** - Custom status bar for DWM

### Package Manager
- **Yay** - AUR helper (auto-installed)

## Structure

```
dotfiles/
├── configs/          # Application configurations
│   ├── alacritty/
│   ├── dwmbar/
│   ├── rofi/
│   ├── yazi/
│   └── zsh/
├── packages/         # Package lists
├── x11/              # X11 configurations
├── .zshrc            # Zsh configuration
└── install.sh        # Main installation script
```

## Manual Configuration

After installation, you may want to:

1. Edit `~/.zshrc` for shell customization
2. Modify DWM keybindings in `~/Builds/dwm/config.h`
3. Customize status bar in `~/.config/dwmbar/`

## Troubleshooting

If you encounter issues:

1. Check if all packages are installed: `pacman -Qq`
2. Verify DWM is built: `which dwm`
3. Check X11 configuration: `ls /etc/X11/xorg.conf.d/`

## Credits

- Author: [@namduongit](https://github.com/namduongit)
- DWM: [suckless.org](https://dwm.suckless.org)

## License

This dotfiles configuration is available as open source under the terms