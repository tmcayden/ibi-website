import { supabase } from '../../supabase'

export async function downloadFile(bucket, filename) {
  try {
    const { data, error } = await supabase.storage.from(bucket).download(filename)
    if (error) throw error
    return URL.createObjectURL(data)
  } catch (error) {
    return null
  }
}

export async function downloadFiles(bucket, files) {
  const srcs = []
  for (const file of files) {
    const data = await downloadFile(bucket, file)
    if (data) srcs.push(data)
  }
  return srcs
}

export async function getFileUrl(bucket, filename) {
  const { data } = await supabase.storage.from(bucket).getPublicUrl(filename)
  if (data) return data.publicUrl
}
