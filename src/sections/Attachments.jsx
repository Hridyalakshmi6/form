import { useRef } from 'react'
import styles from './Attachments.module.css'

export default function Attachments({ data, update }) {
  const inputRef = useRef()

  const handleFiles = (files) => {
    const valid = Array.from(files).filter(f => f.size <= 5 * 1024 * 1024)
    update({ files: [...data.files, ...valid] })
  }

  const removeFile = (idx) => {
    update({ files: data.files.filter((_, i) => i !== idx) })
  }

  return (
    <>
      <div
        className={styles.zone}
        onClick={() => inputRef.current.click()}
        onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add(styles.dragging) }}
        onDragLeave={e => e.currentTarget.classList.remove(styles.dragging)}
        onDrop={e => { e.preventDefault(); e.currentTarget.classList.remove(styles.dragging); handleFiles(e.dataTransfer.files) }}
        role="button"
        tabIndex={0}
        aria-label="Upload files"
        onKeyDown={e => e.key === 'Enter' && inputRef.current.click()}
      >
        <div className={styles.icon}>↑</div>
        <p className={styles.text}>Click to upload or drag & drop</p>
        <p className={styles.hint}>PNG, JPG, PDF — max 5 MB each</p>
      </div>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept=".png,.jpg,.jpeg,.pdf"
        style={{ display: 'none' }}
        onChange={e => handleFiles(e.target.files)}
      />

      {data.files.length > 0 && (
        <ul className={styles.list}>
          {data.files.map((f, idx) => (
            <li key={idx} className={styles.item}>
              <span className={styles.fileName}>{f.name}</span>
              <span className={styles.fileSize}>{(f.size / 1024).toFixed(0)} KB</span>
              <button
                type="button"
                className={styles.remove}
                onClick={() => removeFile(idx)}
                aria-label={`Remove ${f.name}`}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
