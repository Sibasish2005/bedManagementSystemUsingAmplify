import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "documents",
  access: (allow) => ({
    "documents/*": [
      allow.authenticated.to(["read", "write"]),
      allow.groups(["ADMIN"]).to(["read"]),
    ],
  }),
});
