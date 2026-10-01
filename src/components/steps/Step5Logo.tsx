import React, { useState, useRef } from 'react';
import { BrandBriefingData, ReferenceImage } from '../../types/briefing';
import { uploadReferenceImage, deleteReferenceImage } from '../../lib/storage';
import { 
  Palette, 
  Upload, 
  X, 
  Loader2, 
  Image as ImageIcon, 
  Check, 
  Sparkles,
  AlertCircle
} from 'lucide-react';

interface StepProps {
  data: BrandBriefingData;
  onChange: (updates: Partial<BrandBriefingData>) => void;
}

const CURRENT_LOGO_OPTIONS = [
  { id: 'No tengo', label: 'No tengo', desc: 'Empezamos desde cero total' },
  { id: 'Tengo, quiero mejorarlo', label: 'Tengo, quiero mejorarlo', desc: 'Rediseño manteniendo la esencia' },
  { id: 'Tengo, quiero uno nuevo', label: 'Tengo, quiero uno nuevo', desc: 'Borrar y comenzar con nueva imagen' },
];

const LOGO_TYPES = [
  { 
    id: 'Solo el nombre', 
    title: 'Solo el nombre', 
    subtitle: 'Logotipo tipográfico',
    example: 'Ej. SONY, DENZA, BRAUN' 
  },
  { 
    id: 'Símbolo + nombre', 
    title: 'Símbolo + nombre', 
    subtitle: 'Isotipo + texto',
    example: 'Ej. Nike, Adidas, Rolex' 
  },
  { 
    id: 'Iniciales', 
    title: 'Iniciales', 
    subtitle: 'Monograma',
    example: 'Ej. HP, IBM, GE' 
  },
  { 
    id: 'Escudo o sello', 
    title: 'Escudo o sello', 
    subtitle: 'Emblema clásico',
    example: 'Ej. Harley-Davidson, Porsche' 
  },
  { 
    id: 'No sé, propónganme', 
    title: 'No sé, propónganme', 
    subtitle: 'Recomendación experta',
    example: 'Exploraremos las mejores opciones' 
  },
];

const COLOR_SUGGESTIONS = [
  { name: 'Azul Industrial / Eléctrico', hex: '#2563eb' },
  { name: 'Negro / Carbón Grafito', hex: '#0f172a' },
  { name: 'Gris Metálico / Acero', hex: '#64748b' },
  { name: 'Amarillo / Ámbar Maquinaria', hex: '#f59e0b' },
  { name: 'Rojo Fuego / Potencia', hex: '#dc2626' },
  { name: 'Verde Seguridad / Taller', hex: '#059669' },
  { name: 'Naranja Construcción', hex: '#ea580c' },
  { name: 'Dorado / Cobre Fino', hex: '#d97706' },
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
        // Validate MIME type
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
      setUploadError(err.message || 'Ocurrió un error al subir las imágenes.');
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
        console.warn('Error silencioso al remover archivo de bucket:', err);
      }
    }
  };

  const addColorLiked = (colorName: string) => {
    const current = data.colors_liked ? data.colors_liked.split(',').map((c) => c.trim()).filter(Boolean) : [];
    if (!current.includes(colorName)) {
      const updated = [...current, colorName].join(', ');
      onChange({ colors_liked: updated });
    }
  };

  const addColorDisliked = (colorName: string) => {
    const current = data.colors_disliked ? data.colors_disliked.split(',').map((c) => c.trim()).filter(Boolean) : [];
    if (!current.includes(colorName)) {
      const updated = [...current, colorName].join(', ');
      onChange({ colors_disliked: updated });
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Section Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-blue-400 font-mono text-sm uppercase tracking-wider mb-1">
          <Palette className="w-4 h-4" />
          <span>Parte 05</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          El logo
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Lo que le gusta, lo que no, y sus referencias visuales.
        </p>
      </div>

      <div className="space-y-6">
        {/* ¿Tiene logo ahora? */}
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            ¿Tiene logo ahora?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {CURRENT_LOGO_OPTIONS.map((item) => {
              const isSelected = data.has_current_logo === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onChange({ has_current_logo: item.id })}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-blue-600/15 border-blue-500 text-white shadow-md'
                      : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm">{item.label}</span>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-slate-700 bg-slate-800'
                      }`}
                    >
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </div>
                  <p className="text-xs text-slate-400">{item.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Si ya tiene logo, ¿qué quiere mantener y qué no? */}
        {(data.has_current_logo === 'Tengo, quiero mejorarlo' || data.has_current_logo === 'Tengo, quiero uno nuevo') && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 animate-fadeIn">
            <label className="block text-sm font-medium text-slate-200 mb-1.5">
              Si ya tiene logo, ¿qué quiere mantener y qué no?
            </label>
            <p className="text-xs text-slate-400 mb-2">
              Ej. "Queremos mantener el color azul y la letra inicial, pero quitar el dibujo de la tuerca vieja que ya no nos gusta..."
            </p>
            <textarea
              rows={2}
              value={data.current_logo_changes}
              onChange={(e) => onChange({ current_logo_changes: e.target.value })}
              placeholder="Describa qué elementos rescata y cuáles prefiere descartar..."
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm leading-relaxed"
            />
          </div>
        )}

        {/* ¿Qué tipo de logo le atrae más? */}
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-1.5">
            ¿Qué tipo de logo le atrae más?
          </label>
          <p className="text-xs text-slate-400 mb-3">
            Elija el estilo gráfico con el que más se identifica su visión.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {LOGO_TYPES.map((type) => {
              const isSelected = data.logo_style_preference === type.id;
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => onChange({ logo_style_preference: type.id })}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-blue-600/15 border-blue-500 text-white shadow-md'
                      : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm">{type.title}</span>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-slate-700 bg-slate-800'
                      }`}
                    >
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </div>
                  <span className="text-xs text-blue-400/90 font-medium block">{type.subtitle}</span>
                  <p className="text-[11px] text-slate-500 mt-1">{type.example}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Colores que le gustan y Colores que NO quiere */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Colores que le gustan */}
          <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-4">
            <label className="block text-sm font-medium text-slate-200 mb-1">
              Colores que le gustan
            </label>
            <p className="text-xs text-slate-400 mb-2.5">
              Haga clic en las sugerencias o escriba los suyos:
            </p>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {COLOR_SUGGESTIONS.map((col) => (
                <button
                  key={col.name}
                  type="button"
                  onClick={() => addColorLiked(col.name)}
                  className="flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition-all"
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: col.hex }} />
                  <span>{col.name}</span>
                </button>
              ))}
            </div>

            <input
              type="text"
              value={data.colors_liked}
              onChange={(e) => onChange({ colors_liked: e.target.value })}
              placeholder="Ej. Azul marino, gris oscuro, toques de amarillo..."
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Colores que NO quiere */}
          <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-4">
            <label className="block text-sm font-medium text-slate-200 mb-1">
              Colores que NO quiere
            </label>
            <p className="text-xs text-slate-400 mb-2.5">
              Tonos que prefiera evitar completamente:
            </p>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {['Rosado / Fucsia', 'Verde limón', 'Marrón apagado', 'Morado / Violeta', 'Celeste pastel'].map((col) => (
                <button
                  key={col}
                  type="button"
                  onClick={() => addColorDisliked(col)}
                  className="text-[11px] px-2.5 py-1 rounded-md bg-slate-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-300 border border-slate-700/60 hover:border-rose-800 transition-all"
                >
                  ✕ {col}
                </button>
              ))}
            </div>

            <input
              type="text"
              value={data.colors_disliked}
              onChange={(e) => onChange({ colors_disliked: e.target.value })}
              placeholder="Ej. Nada de fucsia ni verde claro..."
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Logos o marcas que le gustan */}
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-1.5">
            Logos o marcas que le gustan
          </label>
          <p className="text-xs text-slate-400 mb-2">
            De cualquier rubro. Pegue links o escriba el nombre y qué le gusta de cada uno.
          </p>
          <textarea
            rows={2}
            value={data.benchmark_logos}
            onChange={(e) => onChange({ benchmark_logos: e.target.value })}
            placeholder="Ej. Me gusta Caterpillar por lo fuerte y pesado de sus letras, y me gusta el logo de Stanley por lo limpio y directo..."
            className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm leading-relaxed"
          />
        </div>

        {/* Sus imágenes de referencia */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-slate-200">
              Sus imágenes de referencia
            </label>
            <span className="text-xs text-slate-400 font-mono">
              {images.length} de 12 imágenes
            </span>
          </div>
          <p className="text-xs text-slate-400 mb-3">
            Súbalas aquí: capturas, fotos de letreros, logos que vio en la calle, fotos de su taller y sus productos terminados. Hasta 12 imágenes, 10 MB cada una.
          </p>

          {/* Upload Dropzone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
              isUploading
                ? 'border-blue-500/60 bg-blue-500/5'
                : 'border-slate-800 hover:border-blue-500/50 bg-slate-900/40 hover:bg-slate-900/80'
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
              <div className="flex flex-col items-center justify-center py-3">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-2" />
                <p className="text-sm font-medium text-white">Subiendo imágenes al servidor...</p>
                <p className="text-xs text-slate-400">Por favor espere un momento</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-2">
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-3 shadow-inner">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-white mb-1">
                  Elegir fotos
                </p>
                <p className="text-xs text-slate-400">
                  JPG, PNG o WEBP desde su celular o computadora
                </p>
              </div>
            )}
          </div>

          {uploadError && (
            <div className="mt-2.5 flex items-center gap-2 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{uploadError}</span>
            </div>
          )}

          {/* Image Previews Grid */}
          {images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="group relative aspect-square rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shadow-sm"
                >
                  <img
                    src={img.url}
                    alt={img.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage(idx);
                      }}
                      className="self-end w-6 h-6 rounded-full bg-rose-600/90 text-white flex items-center justify-center hover:bg-rose-500 transition-colors shadow-md"
                      title="Eliminar imagen"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <p className="text-[10px] text-white truncate font-medium">
                      {img.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
