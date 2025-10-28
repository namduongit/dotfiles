#!/bin/bash
# Backup existing dotfiles before installation

BACKUP_DIR="$HOME/dotfiles_backup_$(date +%Y%m%d_%H%M%S)"
CONFIGS_TO_BACKUP=(
    "$HOME/.config/alacritty"
    "$HOME/.config/rofi" 
    "$HOME/.config/yazi"
    "$HOME/.config/dwmbar"
    "$HOME/.zshrc"
    "$HOME/.bashrc"
    "$HOME/.xinitrc"
)

echo "Creating backup directory: $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"

for config in "${CONFIGS_TO_BACKUP[@]}"; do
    if [ -e "$config" ]; then
        echo "Backing up: $config"
        cp -r "$config" "$BACKUP_DIR/"
    fi
done

echo "Backup completed in: $BACKUP_DIR"
