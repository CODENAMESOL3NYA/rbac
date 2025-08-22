const roles = {
  admin: ["create", "read", "update", "delete"],
  editor: ["create", "read", "update"],
  user: ["read"],
};

module.exports = roles;
