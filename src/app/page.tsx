import Link from "next/link";
import { ArrowRight, Camera, ImagePlus, Tags } from "lucide-react";

const highlights = [
  {
    icon: Camera,
    title: "Colecoes organizadas",
    description: "Reuna ensaios, eventos e portfolios em um fluxo unico.",
  },
  {
    icon: Tags,
    title: "Taxonomia consistente",
    description: "Use tags compartilhadas para encontrar imagens com rapidez.",
  },
  {
    icon: ImagePlus,
    title: "Upload em lote",
    description: "Prepare arquivos e metadados antes de publicar.",
  },
];

export default function HomePage() {
  return (
    <div className="page-shell">
      <section className="home-intro">
        <p className="eyebrow">Photo operations workspace</p>
        <h1>Fotografia pronta para encontrar, revisar e compartilhar.</h1>
        <p className="intro-copy">
          A Luma organiza o caminho entre o upload e a entrega ao cliente. Comece
          adicionando uma nova colecao de imagens.
        </p>
        <Link className="primary-action" href="/upload">
          Iniciar upload
          <ArrowRight aria-hidden="true" size={19} />
        </Link>
      </section>

      <section aria-label="Recursos da galeria" className="feature-grid">
        {highlights.map(({ icon: Icon, title, description }) => (
          <article className="feature-item" key={title}>
            <Icon aria-hidden="true" size={24} strokeWidth={1.7} />
            <h2>{title}</h2>
            <p>{description}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
