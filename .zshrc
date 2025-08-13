# --------------- PLUGIN --------------- #
ZSH_PLUGIN_DIR="$HOME/.config/zsh/plugins"

# zsh-autosuggestions
source "$ZSH_PLUGIN_DIR/zsh-autosuggestions/zsh-autosuggestions.zsh"

# zsh-syntax-highlighting
source "$ZSH_PLUGIN_DIR/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh"

# --------------- PROMPT --------------- #
# Prompt
PROMPT=$'%B%F{blue}[%m@%n]%f%F{yellow}%~%f\n%F{white}-> %f%b'

# ----------- History - Cache ---------- #
HISTSIZE=10000
SAVEHIST=10000
HISTFILE=~/.config/zsh/cache

# --------------- SOURCE --------------- #
source /usr/share/nvm/init-nvm.sh

# ---------------- Alias --------------- #

