import { supabase } from '../../supabase'

export async function deleteFileFromTableByBucketAndId(table, fileId) {
  const { tableError } = await supabase.from(table).delete().eq('id', fileId)
  if (tableError) return false
  return true
}

export async function deleteFileFromStorageByBucketAndPath(bucket, path) {
    const { storageError } = await supabase.storage.from(bucket).remove([path])
    if (storageError) return false
    return true
}
