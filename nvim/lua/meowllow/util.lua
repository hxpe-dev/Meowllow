-- small helpers for Meowllow nvim themes
local M = {}

-- Accept a table of highlight groups and safely set colors
function M.set_highlights(tbl)
  for group, opts in pairs(tbl) do
    local fixed = {}
    for k,v in pairs(opts) do
      if (k == "fg" or k == "bg" or k == "sp") and type(v) == "string" then
        -- remove alpha if present
        if #v == 9 then v = v:sub(1,7) end
        fixed[k] = v
      else
        fixed[k] = v
      end
    end
    vim.api.nvim_set_hl(0, group, fixed)
  end
end

return M