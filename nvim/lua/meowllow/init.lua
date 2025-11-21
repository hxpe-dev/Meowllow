local M = {}

function M.load(style)
  style = style or "purr"
  local ok, mod = pcall(require, "meowllow.themes." .. style)
  if not ok then return error("meowllow: theme '" .. style .. "' not found") end
  mod.apply()
end

return M