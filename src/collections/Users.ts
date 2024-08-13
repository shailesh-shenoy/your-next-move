import type { CollectionConfig } from 'payload'
import { adminOnly, adminOnlyField, adminOrSelf, adminPanelAccess, anyone } from './access/access-control'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    admin: adminPanelAccess,
    create: anyone,
    read: adminOrSelf,
    update: adminOrSelf,
    delete: adminOnly,
  },
  fields: [
    {
      name: "role",
      type: "select",
      saveToJWT: true,
      options: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "User",
          value: "user",
        },
      ],
      defaultValue: "user",
      access: {
        read: adminOnlyField,
        create: adminOnlyField,
        update: adminOnlyField,
      },
    },
    {
      name: "tags",
      type: "text",
      hasMany: true
    }
  ],
}
