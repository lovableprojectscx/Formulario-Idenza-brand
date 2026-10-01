import React, { useState, useRef } from 'react';
import { BrandBriefingData } from '../../types/briefing';
import { uploadReferenceImage, deleteReferenceImage } from '../../lib/storage';
import { Upload, X, Loader2 } from 'lucide-react';

interface StepProps {
  data: BrandBriefingData;
  onChange: (updates: Partial<BrandBriefingData>) => void;
}

const CURRENT_LOGO_OPTIONS = [
  { id: 'No tengo', label: 'No tengo', desc: 'Empezamos desde cero' },
  { id: 'Tengo, quiero mejorarlo', label: 'Tengo, quiero mejorarlo', desc: 'Evolucionar la imagen actual' },
  { id: 'Tengo, quiero uno nuevo', label: 'Tengo, quiero uno nuevo', desc: 'Cambio total de logotipo' },
];

const LOGO_TYPES = [
  { id: 'Solo el nombre', title: 'Solo el nombre', desc: 'Tipográfico puro (ej. Sony, Braun)' },
  { id: 'Símbolo + nombre', title: 'Símbolo + nombre', desc: 'Icono acompañado de texto' },
  { id: 'Iniciales', title: 'Iniciales', desc: 'Monograma (ej. IBM, HP)' },
  { id: 'Escudo o sello', title: 'Escudo o sello', desc: 'Emblema cerrado' },
  { id: 'No sé, propónganme', title: 'No sé, propónganme', desc: 'El equipo recomendará la mejor ruta' },
];

export const Step5Logo: React.FC<StepProps> = ({ data, onChange }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const images = data.reference_images || [];

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (images.length + files.length > 12) {
      setUploadError('Puede subir un máximo de 12 imágenes de referencia.');
      return;
    }

    setUploadError(null);
    setIsUploading(true);

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
        if (!validTypes.includes(file.type.toLowerCase())) {
          throw new Error(`El archivo ${file.name} no es una imagen válida (JPG, PNG o WEBP).`);
        }
        return await uploadReferenceImage(file);
      });

      const uploadedResults = await Promise.all(uploadPromises);
      onChange({ reference_images: [...images, ...uploadedResults] });
    } catch (err: any) {
      console.error('Error al subir archivos:', err);
      setUploadError(err.message || 'Error al subir las imágenes.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = async (indexToRemove: number) => {
    const imgToRemove = images[indexToRemove];
    const newImages = images.filter((_, idx) => idx !== indexToRemove);
    onChange({ reference_images: newImages });

    if (imgToRemove && imgToRemove.path) {
      try {
        await deleteReferenceImage(imgToRemove.path);
      } catch (err) {
        console.warn('Error silencioso al remover archivo:', err);
      }
    }
  };

  return (
    <div className="space-y-7 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-tinta-border pb-4">
        <span className="text-xs font-mono tabular-nums text-blanco-dim uppercase tracking-wider block mb-1">
          Parte 05
        </span>
        <h2 className="text-2xl sm:text-3xl font-display font-medium text-blanco tracking-tight">
          El logo
        </h2>
        <p className="text-blanco-muted text-sm mt-1">
          Lo que le gusta, lo que no, y sus referencias.
        </p>
      </div>

      <div className="space-y-6">
        {/* ¿Tiene logo ahora? */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-blanco-muted mb-1">
            ¿Tiene logo ahora?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
            {CURRENT_LOGO_OPTIONS.map((item) => {
              const isSelected = data.has_current_logo === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onChange({ has_current_logo: item.id })}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-tinta-hover border-ambar text-blanco font-medium'
                      : 'bg-tinta-surface border-tinta-border text-blanco-muted hover:border-tinta-borderActive hover:text-blanco'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{item.label}</span>
                    <div
                      className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? 'border-ambar bg-ambar'
                          : 'border-tinta-border bg-tinta'
                      }`}
                    >
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-tinta" />}
                    </div>
                  </div>
                  <p className="text-xs text-blanco-dim">{item.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Si ya tiene logo, ¿qué quiere mantener y qué no? */}
        {(data.has_current_logo === 'Tengo, quiero mejorarlo' || data.has_current_logo === 'Tengo, quiero uno nuevo') && (
          <div className="bg-tinta-surface border border-tinta-border rounded-xl p-4 animate-fadeIn">
            <label className="block text-xs font-semibold uppercase tracking-wider text-blanco-muted mb-1">
              Si ya tiene logo, ¿qué quiere mantener y qué no?
            </label>
            <p className="text-xs text-blanco-dim mb-2">
              Detalle colores, formas o símbolos que rescata o descarta.
            </p>
            <textarea
              rows={2}
              value={data.current_logo_changes}
              onChange={(e) => onChange({ current_logo_changes: e.target.value })}
              placeholder="Ej. Mantener el color azul marino, pero descartar el símbolo actual..."
              className="w-full px-3.5 py-2.5 bg-tinta border border-tinta-border rounded-lg text-blanco placeholder-blanco-dim text-sm focus:outline-none focus:border-ambar transition-colors"
            />
          </div>
        )}

        {/* ¿Qué tipo de logo le atrae más? */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-blanco-muted mb-1">
            ¿Qué tipo de logo le atrae más?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-2">
            {LOGO_TYPES.map((type) => {
              const isSelected = data.logo_style_preference === type.id;
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => onChange({ logo_style_preference: type.id })}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-tinta-hover border-ambar text-blanco font-medium'
                      : 'bg-tinta-surface border-tinta-border text-blanco-muted hover:border-tinta-borderActive hover:text-blanco'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{type.title}</span>
                    <div
                      className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? 'border-ambar bg-ambar'
                          : 'border-tinta-border bg-tinta'
                      }`}
                    >
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-tinta" />}
                    </div>
                  </div>
                  <p className="text-xs text-blanco-dim">{type.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Colores que le gustan / Colores que NO quiere */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-blanco-muted mb-1">
              Colores que le gustan
            </label>
            <p className="text-xs text-blanco-dim mb-2">
              Escriba los tonos de su preferencia.
            </p>
            <input
              type="text"
              value={data.colors_liked}
              onChange={(e) => onChange({ colors_liked: e.target.value })}
              placeholder="Ej. Azul marino, gris acero, negro..."
              className="w-full px-4 py-3 bg-tinta-surface border border-tinta-border rounded-xl text-blanco placeholder-blanco-dim text-sm focus:outline-none focus:border-ambar transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-blanco-muted mb-1">
              Colores que NO quiere
            </label>
            <p className="text-xs text-blanco-dim mb-2">
              Colores que prefiera no ver en su marca.
            </p>
            <input
              type="text"
              value={data.colors_disliked}
              onChange={(e) => onChange({ colors_disliked: e.target.value })}
              placeholder="Ej. Nada de fucsia, verde claro ni naranja..."
              className="w-full px-4 py-3 bg-tinta-surface border border-tinta-border rounded-xl text-blanco placeholder-blanco-dim text-sm focus:outline-none focus:border-ambar transition-colors"
            />
          </div>
        </div>

        {/* Logos o marcas que le gustan */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-blanco-muted mb-1">
            Logos o marcas que le gustan
          </label>
          <p className="text-xs text-blanco-dim mb-2">
            De cualquier rubro. Pegue links o escriba el nombre y qué le gusta de cada uno.
          </p>
          <textarea
            rows={2}
            value={data.benchmark_logos}
            onChange={(e) => onChange({ benchmark_logos: e.target.value })}
            placeholder="Nombres de marcas o enlaces..."
            className="w-full px-4 py-3 bg-tinta-surface border border-tinta-border rounded-xl text-blanco placeholder-blanco-dim text-sm leading-relaxed focus:outline-none focus:border-ambar transition-colors"
          />
        </div>

        {/* Sus imágenes de referencia */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-semibold uppercase tracking-wider text-blanco-muted">
              Sus imágenes de referencia
            </label>
            <span className="text-xs font-mono tabular-nums text-blanco-dim">
              {images.length}/12
            </span>
          </div>
          <p className="text-xs text-blanco-dim mb-3">
            Súbalas aquí: capturas, fotos de letreros, logos que vio en la calle, fotos de su taller y sus productos terminados. Hasta 12 imágenes, 10 MB cada una.
          </p>

          {/* Upload Dropzone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`border border-dashed rounded-xl p-5 text-center cursor-pointer transition-colors ${
              isUploading
                ? 'border-ambar/60 bg-tinta-surface'
                : 'border-tinta-border hover:border-tinta-borderActive bg-tinta-surface/60 hover:bg-tinta-surface'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              multiple
              accept="image/jpeg,image/png,image/webp,image/jpg"
              className="hidden"
            />

            {isUploading ? (
              <div className="flex items-center justify-center gap-2 py-2 text-blanco-muted text-xs">
                <Loader2 className="w-4 h-4 text-ambar animate-spin" />
                <span>Subiendo imágenes...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-2">
                <Upload className="w-5 h-5 text-blanco-muted mb-2" />
                <p className="text-xs font-medium text-blanco mb-0.5">
                  Elegir fotos
                </p>
                <p className="text-[11px] text-blanco-dim">
                  JPG, PNG o WEBP desde su celular o computadora
                </p>
              </div>
            )}
          </div>

          {uploadError && (
            <p className="mt-2 text-xs text-rose-400">
              {uploadError}
            </p>
          )}

          {/* Image Previews */}
          {images.length > 0 && (
            <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="group relative aspect-square rounded-lg overflow-hidden bg-tinta border border-tinta-border"
                >
                  <img
                    src={img.url}
                    alt={img.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage(idx);
                    }}
                    className="absolute top-1 right-1 w-5 h-5 rounded-md bg-tinta/90 text-blanco hover:text-rose-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Eliminar"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
