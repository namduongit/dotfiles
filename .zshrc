# Completion cache
HISTFILE="$HOME/.config/zsh/zhistory"
HISTSIZE=10000
SAVEHIST=10000

# Share cache history
setopt share_history
setopt hist_ignore_dups
setopt hist_ignore_all_dups
setopt hist_ignore_space
setopt hist_verify
setopt inc_append_history

# Basic auto/tab complete:
autoload -U compinit
zstyle ':completion:*' menu select
zmodload zsh/complist
compinit
_comp_options+=(globdots)

# Ignore upper and lowercase when TAB completion
zstyle ':completion:*' matcher-list '' 'm:{a-zA-Z}={A-Za-z}' 'r:|[._-]=* r:|=*' 'l:|=* r:|=*'

# Plugin
ZSH_PLUGIN_DIR="$HOME/.config/zsh/plugins"
source "$ZSH_PLUGIN_DIR/zsh-autosuggestions/zsh-autosuggestions.zsh"
source "$ZSH_PLUGIN_DIR/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh"

# Export
export NVM_DIR="$HOME/.nvm"
source /usr/share/nvm/init-nvm.sh


# Prompt
PROMPT=$'%B%F{blue}[%m@%n]%f%F{yellow}%~%f\n%F{white}-> %f%b'

# Alias
alias ls='ls --color=auto'

alias edp1-60='xrandr --output eDP1 --mode 1920x1080 --rate 60'
alias edp1-144='xrandr --output eDP1 --mode 1920x1080 --rate 144'

alias hdmi-same='xrandr --output HDMI-1-0 --same-as eDP1 --auto'
alias hdmi-right='xrandr --output HDMI-1-0 --auto --right-of eDP1'
alias hdmi-left='xrandr --output HDMI-1-0 --auto --left-of eDP1'

alias nvidia-run="__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia"

# Used when using hyrbird and want to using HDMI
alias env_hyrbird_HDMI="xrandr --output HDMI-1-0 --auto --right-of eDP1"

# Used when using nvidia
alias env_nvidia_eDP="xrandr --output eDP-1-1 --auto --left-of HDMI-0"

# Get python env
# python3 -m venv venv
