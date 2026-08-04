import { useEffect } from 'react';
import { ArrowRight, X } from 'lucide-react';

export type ProjectGalleryImage = {
  src: string;
  alt: string;
};

type ProjectGalleryModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  images: ProjectGalleryImage[];
};

export default function ProjectGalleryModal({ open, onClose, title, images }: ProjectGalleryModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        className="absolute inset-0 bg-navy-950/85 backdrop-blur-sm"
        aria-label="Galerie schließen"
        onClick={onClose}
      />

      <div className="relative z-10 flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-navy-900 shadow-2xl shadow-black/40">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-accent-400">Projektgalerie</p>
            <h2 className="mt-1 text-lg font-bold text-white sm:text-xl">{title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-white/10 text-white transition-colors hover:bg-white/10"
            aria-label="Schließen"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-4 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {images.map((image) => (
              <figure
                key={image.src}
                className="overflow-hidden rounded-xl border border-white/10 bg-navy-950/50 shadow-lg shadow-black/20"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectGalleryButton({
  onClick,
  label = 'Unsere Projekte',
}: {
  onClick: () => void;
  label?: string;
}) {
  return (
    <button type="button" onClick={onClick} className="btn-primary mt-8 w-full sm:w-auto">
      {label}
      <ArrowRight className="h-4 w-4" />
    </button>
  );
}
