# Created by namduongit
# Github: github.com/namduongit

# Completion cache
HISTFILE="$HOME/.config/zsh/.zhistory"
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

# Explain 'Export' and 'Source'
# 1. Explain 'Export'
# - Example: export $NAMDUONG=$HOME/namduong
# - This script will create 1 variable name is NAMDUONG
# - Print variable value: echo $NAMDUONG
# - Only assigns a value, doesn;t create folder or file
# - You can change java home path: export $JAVA_HOME=/path/...
#
# 2. Explain 'Source'
# - Example: source /path/namduong
# - This script will read and excute all script in file at shell
# - Load config in file: source .zshrc
# - In utils.sh file have a function. You source utils.sh, you can
# use any function in this file
#

# Enable plugins
source /usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh
source /usr/share/zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh

# Prompt
PROMPT=$'%B%F{blue}[%m@%n]%f%F{yellow}%~%f\n%F{white}-> %f%b'

# Alias
alias ls='ls --color=auto'
alias start-hdmi="xrandr --output HDMI-1-0 --right-of eDP-1 --auto"

# Export somethings
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" 
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"