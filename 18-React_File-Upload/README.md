# File Upload Component

## Overview

A React component that handles file uploads with progress tracking, status management, and drag-and-drop functionality.

## Core Functionality

### State Management

```typescript
const [file, setFile] = useState<File | null>(null);
const [status, setStatus] = useState<UploadStatus>("idle");
const [uploadProgress, setUploadProgress] = useState(0);
const [dragActive, setDragActive] = useState(false);

type UploadStatus = "idle" | "uploading" | "success" | "error";
```

- `file`: Stores the selected file object
- `status`: Tracks upload state ("idle", "uploading", "success", "error")
- `uploadProgress`: Tracks upload progress (0-100)
- `dragActive`: Manages drag-and-drop visual feedback

## Key Functions Explained

### 1. File Selection Handler

```typescript
const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  if (e.target.files) {
    setFile(e.target.files[0]);
  }
};
```

- Triggered when user selects a file via input
- `e.target.files` contains FileList object
- We store the first file (files[0])

### 2. Drag and Drop Handlers

```typescript
const handleDrag = (e: React.DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  setDragActive(e.type === "dragenter" || e.type === "dragover");
};

const handleDrop = (e: React.DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  setDragActive(false);

  if (e.dataTransfer.files?.[0]) {
    setFile(e.dataTransfer.files[0]);
  }
};
```

- `handleDrag`: Manages drag state for visual feedback
- `handleDrop`: Processes dropped file
- `e.dataTransfer.files` contains dropped files

### 3. File Upload Handler

```typescript
const handleFileUpload = async () => {
  if (!file) return null;
  setStatus("uploading");
  setUploadProgress(0);

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const progress = progressEvent?.total
          ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
          : 0;
        setUploadProgress(progress);
      },
    });
    setStatus("success");
  } catch (error) {
    setStatus("error");
  }
};
```

## Deep Dive into Key Concepts

### FormData

```typescript
const formData = new FormData();
formData.append("file", file);
```

- `FormData` is a built-in browser API
- Used to construct a set of key/value pairs representing form fields
- Automatically sets proper headers for file upload

Example:

```typescript
// Creating FormData
const formData = new FormData();

// Adding different types of data
formData.append("file", fileObject);
formData.append("username", "john_doe");
formData.append("age", "25");

// You can also append multiple files
formData.append("documents", file1);
formData.append("documents", file2);
```

### onUploadProgress

```typescript
onUploadProgress: (progressEvent) => {
  const progress = progressEvent?.total
    ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
    : 0;
  setUploadProgress(progress);
};
```

- Axios-specific callback for tracking upload progress
- `progressEvent.loaded`: Bytes transferred
- `progressEvent.total`: Total bytes to transfer
- Calculates percentage: (loaded / total) \* 100

Example of Progress Event:

```typescript
// Sample progressEvent object
{
  loaded: 25000,  // bytes uploaded
  total: 100000,  // total file size in bytes
  progress: 0.25, // 25% complete
  bytes: 25000,   // same as loaded
  rate: 256000,   // bytes per second
  estimated: 2,   // seconds remaining
}
```

## Code Flow

1. **Initial State**

   - Component starts with null file and idle status

2. **File Selection**

   - User selects file via click or drag-and-drop
   - File stored in state
   - File details displayed

3. **Upload Process**

   ```
   Click Upload Button
   ↓
   Create FormData
   ↓
   Start Upload (Status: uploading)
   ↓
   Track Progress (onUploadProgress)
   ↓
   Handle Response
   ↓
   Update Status (success/error)
   ```

4. **Status Management**
   - `idle`: Initial state or ready to upload
   - `uploading`: During file transfer
   - `success`: Upload completed
   - `error`: Upload failed

## Error Handling

```typescript
try {
  // upload logic
} catch (error) {
  setStatus("error");
  setUploadProgress(0);
}
```

- Catches network errors
- Catches server errors
- Resets progress
- Updates UI with error state

## Common Interview Questions

1. **Q: How would you handle multiple file uploads?**

   ```typescript
   const [files, setFiles] = useState<File[]>([]);

   // Modified handler
   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
     if (e.target.files) {
       setFiles(Array.from(e.target.files));
     }
   };
   ```

2. **Q: How to validate file types?**

   ```typescript
   const allowedTypes = ["image/jpeg", "image/png"];

   const validateFile = (file: File) => {
     return allowedTypes.includes(file.type);
   };
   ```

3. **Q: How to handle large file uploads?**

   - Use chunk upload strategy
   - Implement resume capability
   - Add validation for file size

   ```typescript
   const MAX_SIZE = 5 * 1024 * 1024; // 5MB

   if (file.size > MAX_SIZE) {
     alert("File too large");
     return;
   }
   ```

4. **Q: How to cancel ongoing uploads?**

   ```typescript
   const cancelToken = axios.CancelToken.source();

   // In upload function
   axios.post(URL, formData, {
     cancelToken: cancelToken.token,
   });

   // To cancel
   cancelToken.cancel("Upload cancelled");
   ```
