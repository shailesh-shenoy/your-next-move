import type { CollectionConfig, User } from 'payload'
import { adminOnlyField, adminOrCreator, adminOrCreatorWrite, adminOrUser, anyone } from './access/access-control'
import { afterTaskChange } from './hooks/hooks'

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
        },
        {
            name: "status",
            type: "select",
            options: [
                { label: "Pending", value: "pending" },
                { label: "Skipped", value: "skipped" },
                { label: "Completed", value: "completed" },
            ],
        },
        {
            name: "note",
            type: "textarea",
            required: false,
        },
        {
            name: "startTime",
            type: "date",
            required: false,
            admin: {
                date: {
                    pickerAppearance: 'dayAndTime'
                }
            }
        },
        {
            name: "endTime",
            type: "date",
            required: false,
            admin: {
                date: {
                    pickerAppearance: 'dayAndTime'
                }
            }
        },
        {
            name: "tag",
            type: "text",
            required: false,
            defaultValue: "untagged"
        }
    ],
    hooks: {
        afterChange: [afterTaskChange]
    }
}
