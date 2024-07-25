import type { CollectionConfig, User } from 'payload'
import { adminOnlyField, adminOrCreator, adminOrCreatorWrite, adminOrUser, anyone } from './access/access-control'

export const Tasks: CollectionConfig = {
    slug: 'tasks',
    admin: {
        useAsTitle: 'title',
    },
    access: {
        create: adminOrCreatorWrite,
        read: adminOrCreator,
    },
    fields: [
        {
            name: 'title',
            label: 'Title',
            type: 'text',
            required: true,
        },
        {
            name: "createdBy",
            type: "relationship",
            relationTo: "users",
            hasMany: false,
            required: true,
            index: true,
            maxDepth: 0,
            access: {
                update: () => false,
                // read: adminOnlyField,
            },
        }
    ],
}
