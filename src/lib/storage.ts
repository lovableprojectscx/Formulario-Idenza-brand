import { supabase } from './supabase';
import { ReferenceImage } from '../types/briefing';

export async function uploadReferenceImage(
  file: File,
  onProgress?: (percent: number) => void
): Promise<ReferenceImage> {
  // Validate file size (10 MB max)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error(`El archivo ${file.name} supera el límite de 10 MB.`);
  }

  // Create clean safe file name with timestamp
  const ext = file.name.split('.').pop() || 'jpg';
  const cleanBaseName = file.name
    .replace(/\.[^/.]+$/, '')
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .substring(0, 30);
  const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}_${cleanBaseName}.${ext}`;
  const filePath = `references/${fileName}`;

  const { data, error } = await supabase.storage
    .from('briefing_files')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('Error al subir imagen a Supabase Storage:', error);
    throw error;
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('briefing_files')
    .getPublicUrl(filePath);

  return {
    name: file.name,
    url: publicUrl,
    path: filePath,
    size: file.size,
  };
}

export async function deleteReferenceImage(filePath: string): Promise<void> {
  const { error } = await supabase.storage
    .from('briefing_files')
    .remove([filePath]);

  if (error) {
    console.warn('Error eliminando imagen de storage:', error);
  }
}
