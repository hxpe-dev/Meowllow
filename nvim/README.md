# Meowllow for Neovim

## Installation

### Lazy.nvim
```lua
{
  "hxpe-dev/meowllow",
  name = "meowllow",
  dir = "nvim",
  priority = 1000,
  config = function()
    vim.cmd("colorscheme meowllow-purr")
  end,
}
```

### Packer
```lua
use { "hxpe-dev/meowllow", dir = "nvim" }
```

### Vim-Plug
```lua
Plug 'hxpe-dev/meowllow/nvim'
```
