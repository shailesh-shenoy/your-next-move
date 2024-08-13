import { CollectionAfterChangeHook } from 'payload'

export const afterTaskChange: CollectionAfterChangeHook = async ({
  doc, // full document data
  req, // full express request
}) => {
  const tagName = doc.tag
  const user = await req.payload.findByID({
    collection: 'users',
    id: doc.createdBy,
    depth: 2,
  })

  if (user.tags && user.tags.some((t) => t.tag === tagName)) {
    return
  }
  const tag = {
    tag: tagName,
  }

  const updatedUser = await req.payload.update({
    collection: 'users',
    id: doc.createdBy,
    data: {
      tags: user.tags ? [...user.tags, tag] : [tag],
    },
  })
}
