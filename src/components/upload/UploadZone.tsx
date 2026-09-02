"use client";

import { useId, useState } from "react";
import { FileImage, UploadCloud, X } from "lucide-react";

export function UploadZone() {
  const inputId = useId();
  const [files, setFiles] = useState<File[]>([]);

  return (
    <section aria-labelledby="upload-zone-title" className="upload-zone">
      <UploadCloud aria-hidden="true" size={42} strokeWidth={1.5} />
      <h2 id="upload-zone-title">Adicione suas fotos</h2>
      <p>JPEG, PNG, GIF ou WebP. Ate 10 arquivos por vez.</p>
      <label className="secondary-action" htmlFor={inputId}>
        Escolher arquivos
      </label>
      <input
        accept="image/jpeg,image/png,image/gif,image/webp"
        className="visually-hidden"
        id={inputId}
        multiple
        onChange={(event) => setFiles(Array.from(event.target.files ?? []).slice(0, 10))}
        type="file"
      />

      {files.length > 0 ? (
        <ul aria-label="Arquivos selecionados" className="file-list">
          {files.map((file) => (
            <li key={`${file.name}-${file.lastModified}`}>
              <FileImage aria-hidden="true" size={18} />
              <span>{file.name}</span>
              <button
                aria-label={`Remover ${file.name}`}
                onClick={() => setFiles((current) => current.filter((item) => item !== file))}
                type="button"
              >
                <X aria-hidden="true" size={17} />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
