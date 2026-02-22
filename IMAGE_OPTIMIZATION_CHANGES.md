# Image Optimization Changes

These changes add WebP compression on upload, lazy loading for images, and Supabase image transform support for thumbnails.

---

## 1. Install `browser-image-compression`

```bash
cd ibi-vue
npm install browser-image-compression@^2.0.2
```

---

## 2. Create `src/util/compressImage.js`

Create a new file at `ibi-vue/src/util/compressImage.js`:

```js
import imageCompression from 'browser-image-compression'

const defaultOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
  fileType: 'image/webp'
}

/**
 * Compress an image file before upload.
 * Converts to WebP, caps at 1MB and 1920px max dimension.
 * Returns a new File object with a .webp extension.
 */
export async function compressImage(file, options = {}) {
  const opts = { ...defaultOptions, ...options }
  const compressed = await imageCompression(file, opts)

  // Ensure filename ends with .webp
  const baseName = file.name.replace(/\.[^/.]+$/, '')
  return new File([compressed], `${baseName}.webp`, {
    type: 'image/webp'
  })
}
```

---

## 3. Update `src/util/supabase/downloadFile.js`

Update the `getFileUrl` function to accept optional transform parameters (`width`, `height`, `quality`) for Supabase image transforms on thumbnails.

**Before:**

```js
export async function getFileUrl(bucket, filename) {
  const { data } = await supabase.storage.from(bucket).getPublicUrl(filename)
  if (data) return data.publicUrl
}
```

**After:**

```js
export async function getFileUrl(bucket, filename, { width, height, quality } = {}) {
  const transform = {}
  if (width) transform.width = width
  if (height) transform.height = height
  if (quality) transform.quality = quality

  const options = Object.keys(transform).length > 0 ? { transform } : {}
  const { data } = await supabase.storage.from(bucket).getPublicUrl(filename, options)
  if (data) return data.publicUrl
}
```

---

## 4. Update `src/components/SempurnaComponents/SemFileUpload.vue`

### 4a. Add import

Add this import near the top of the `<script setup>` block:

```js
import { compressImage } from '../../util/compressImage'
```

### 4b. Compress on upload

In the `uploadImage` function, replace the file handling:

**Before:**

```js
const file = files.value[0]
const fileExt = file.name.split('.').pop()
const filePath = `${category.value}/${Date.now()}.${fileExt}`
```

**After:**

```js
const file = await compressImage(files.value[0])
const filePath = `${category.value}/${Date.now()}.webp`
```

### 4c. Fix error/success toast handling

Replace the `catch`/`finally` block:

**Before:**

```js
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: uploadError.message, life: 2000 })
  } finally {
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Image uploaded successfully',
      life: 2000
    })
    uploading.value = false
  }
```

**After:**

```js
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: error.message, life: 2000 })
    uploading.value = false
    return
  }
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'Image uploaded successfully',
    life: 2000
  })
  uploading.value = false
```

### 4d. Add lazy loading to the preview image

In the `<template>`, add `loading="lazy"` to the `<img>` tag:

```html
<img v-if="src" :src="src" alt="Avatar" class="avatar image" loading="lazy" />
```

---

## 5. Update `src/components/Projects.vue`

### 5a. Use transforms for thumbnails

In the `getImagePaths` function, pass transform options:

**Before:**

```js
const data = await getFileUrl('projects', image.image_path)
```

**After:**

```js
const data = await getFileUrl('projects', image.image_path, { width: 400, quality: 75 })
```

### 5b. Add lazy loading

Add `loading="lazy"` to the `<img>` tag that displays project thumbnails:

```html
<img
  :src="imagePaths.find((x) => x.id == project.id).path"
  :alt="project.name"
  class="avatar image"
  loading="lazy"
/>
```

---

## 6. Update `src/views/GalleryView.vue`

### 6a. Use transforms for thumbnails

In the `getImagePaths` function, pass transform options:

**Before:**

```js
const data = await getFileUrl('projects', image.image_path)
```

**After:**

```js
const data = await getFileUrl('projects', image.image_path, { width: 400, quality: 75 })
```

### 6b. Add lazy loading

Add `loading="lazy"` to the `<Image>` component:

```html
<Image
  :src="imagePaths.find((x) => x.id == project.id).path"
  :alt="project.name"
  loading="lazy"
/>
```

---

## 7. Update `src/views/ProjectView.vue`

### 7a. Add import

Add this import near the top of the `<script setup>` block:

```js
import { compressImage } from '../util/compressImage'
```

### 7b. Compress on upload

In the `uploadPhoto` function, replace the file handling:

**Before:**

```js
uploadPhoto.value = event.target.files
// ...
const file = uploadPhoto.value[0]
const fileExt = file.name.split('.').pop()
const filePath = `${project.project.category}/${Date.now()}.${fileExt}`
```

**After:**

```js
const selectedFiles = event.target.files
// ...
const file = await compressImage(selectedFiles[0])
const filePath = `${project.project.category}/${Date.now()}.webp`
```

Note: Also fix the variable shadowing bug — the original code overwrites the `uploadPhoto` function with `uploadPhoto.value = event.target.files`. Use a local `selectedFiles` variable instead.

### 7c. Add lazy loading

Add `loading="lazy"` to the `<Image>` component in the gallery:

```html
<Image :src="image.path" alt="Project Image" :width="galleryWidth" preview loading="lazy" />
```

---

## Summary of Changes

| Change | Files affected |
|---|---|
| New dependency: `browser-image-compression` | `package.json` |
| New utility: `compressImage()` | `src/util/compressImage.js` (new) |
| Image transform support in `getFileUrl()` | `src/util/supabase/downloadFile.js` |
| Compress uploads to WebP | `SemFileUpload.vue`, `ProjectView.vue` |
| Thumbnail transforms (400px, 75% quality) | `Projects.vue`, `GalleryView.vue` |
| Lazy loading on all images | `SemFileUpload.vue`, `Projects.vue`, `GalleryView.vue`, `ProjectView.vue` |
| Fix error toast bug in upload | `SemFileUpload.vue` |
| Fix variable shadowing bug in `uploadPhoto` | `ProjectView.vue` |
