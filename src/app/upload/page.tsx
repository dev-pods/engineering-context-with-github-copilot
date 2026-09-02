import { Globe2, LockKeyhole, Settings2 } from "lucide-react";
import { UploadZone } from "@/components/upload/UploadZone";

export default function UploadPage() {
  return (
    <div className="page-shell upload-page">
      <header className="page-heading">
        <div>
          <p className="eyebrow">Nova colecao</p>
          <h1>Upload de fotografias</h1>
          <p>Prepare os arquivos, defina a visibilidade e organize as tags.</p>
        </div>
        <div aria-label="Status" className="status-chip">
          Rascunho
        </div>
      </header>

      <div className="upload-layout">
        <UploadZone />

        <form className="settings-panel">
          <div className="panel-title">
            <Settings2 aria-hidden="true" size={21} />
            <h2>Configuracoes do upload</h2>
          </div>

          <div className="field-grid">
            <label>
              Galeria
              <select defaultValue="">
                <option disabled value="">Selecione uma galeria</option>
                <option>Wedding - Sarah &amp; John</option>
                <option>Corporate Headshots</option>
                <option>Nature Portfolio</option>
              </select>
            </label>

            <label>
              Visibilidade
              <span className="input-with-icon">
                <LockKeyhole aria-hidden="true" size={17} />
                <select defaultValue="private">
                  <option value="public">Publica</option>
                  <option value="private">Privada</option>
                  <option value="review">Revisao do cliente</option>
                </select>
              </span>
            </label>

            <label className="full-field">
              Tags separadas por virgula
              <input
                name="tags"
                placeholder="wedding, portrait, outdoor..."
                type="text"
              />
              <small>Use termos consistentes para melhorar a busca na galeria.</small>
            </label>

            <label className="full-field">
              Aviso de copyright
              <span className="input-with-icon">
                <Globe2 aria-hidden="true" size={17} />
                <input name="copyright" placeholder="2026 Luma Studio" type="text" />
              </span>
            </label>
          </div>

          <div className="form-actions">
            <button className="secondary-action" type="button">Salvar rascunho</button>
            <button className="primary-action" type="submit">Processar upload</button>
          </div>
        </form>
      </div>
    </div>
  );
}
