import { supabase } from './supabase';
import { BrandBriefingData, BrandBriefingRecord } from '../types/briefing';

export async function submitBrandBriefing(data: BrandBriefingData): Promise<BrandBriefingRecord> {
  const { data: record, error } = await supabase
    .from('brand_briefings')
    .insert([
      {
        business_name: data.business_name,
        products_sold: data.products_sold,
        products_other: data.products_other,
        years_operating: data.years_operating,
        location_scope: data.location_scope,
        business_story: data.business_story,

        target_clients: data.target_clients,
        target_clients_other: data.target_clients_other,
        value_proposition: data.value_proposition,
        pre_purchase_questions: data.pre_purchase_questions,
        pricing_comparison: data.pricing_comparison,

        competitors: data.competitors,
        competitors_dealbreakers: data.competitors_dealbreakers,

        business_as_person: data.business_as_person,
        brand_words: data.brand_words,
        personality_traits: data.personality_traits,

        has_current_logo: data.has_current_logo,
        current_logo_changes: data.current_logo_changes,
        logo_style_preference: data.logo_style_preference,
        colors_liked: data.colors_liked,
        colors_disliked: data.colors_disliked,
        benchmark_logos: data.benchmark_logos,
        reference_images: data.reference_images,

        brand_touchpoints: data.brand_touchpoints,
        brand_touchpoints_other: data.brand_touchpoints_other,
        deadline: data.deadline,

        contact_name: data.contact_name,
        contact_role: data.contact_role,
        contact_whatsapp: data.contact_whatsapp,
        contact_social_web: data.contact_social_web,
        additional_notes: data.additional_notes,

        status: 'nuevo',
        admin_notes: '',
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error insertando briefing en Supabase:', error);
    throw error;
  }

  return record as BrandBriefingRecord;
}

export async function fetchAllBriefings(): Promise<BrandBriefingRecord[]> {
  const { data, error } = await supabase
    .from('brand_briefings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error obteniendo briefings de Supabase:', error);
    throw error;
  }

  return (data || []) as BrandBriefingRecord[];
}

export async function updateBriefingStatus(
  id: string,
  status: 'nuevo' | 'en_revision' | 'en_diseno' | 'completado',
  admin_notes?: string
): Promise<void> {
  const updates: Record<string, any> = {
    status,
    updated_at: new Date().toISOString(),
  };

  if (admin_notes !== undefined) {
    updates.admin_notes = admin_notes;
  }

  const { error } = await supabase
    .from('brand_briefings')
    .update(updates)
    .eq('id', id);

  if (error) {
    console.error('Error actualizando estado del briefing:', error);
    throw error;
  }
}

export async function deleteBriefing(id: string): Promise<void> {
  const { error } = await supabase
    .from('brand_briefings')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error eliminando briefing:', error);
    throw error;
  }
}
