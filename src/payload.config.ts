// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import nodemailer from 'nodemailer'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { Tasks } from './collections/Tasks'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Tasks],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  // email: nodemailerAdapter({
  //   defaultFromAddress: process.env.EMAIL_FROM || '',
  //   defaultFromName: process.env.EMAIL_FROM_NAME || '',
  //   transportOptions: {
  //     host: process.env.SMTP_HOST || '',
  //     port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587,
  //     // secure: process.env.EMAIL_SECURE === 'true',
  //     auth: {
  //       user: process.env.SMTP_USER || '',
  //       pass: process.env.SMTP_PASS || '',
  //     },
  //   },
  // }),
  email: undefined,
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
})
