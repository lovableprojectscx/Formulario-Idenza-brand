export interface ReferenceImage {
  name: string;
  url: string;
  path: string;
  size: number;
}

export interface PersonalityTraits {
  traditional_modern: number; // 0 (Tradicional) a 100 (Moderno)
  industrial_elegant: number; // 0 (Industrial, rudo) a 100 (Elegante, fino)
  formal_friendly: number;    // 0 (Serio, formal) a 100 (Cercano, amigable)
  economical_premium: number; // 0 (Económico) a 100 (Premium)
  local_bigcorp: number;      // 0 (Local, de barrio) a 100 (Gran empresa)
}

export interface BrandBriefingData {
  // 01 El negocio
  business_name: string;
  products_sold: string[];
  products_other: string;
  years_operating: string;
  location_scope: string;
  business_story: string;

  // 02 Sus clientes
  target_clients: string[];
  target_clients_other: string;
  value_proposition: string;
  pre_purchase_questions: string;
  pricing_comparison: string;

  // 03 La competencia
  competitors: string;
  competitors_dealbreakers: string;

  // 04 La personalidad
  business_as_person: string;
  brand_words: string;
  personality_traits: PersonalityTraits;

  // 05 El logo
  has_current_logo: string;
  current_logo_changes: string;
  logo_style_preference: string;
  colors_liked: string;
  colors_disliked: string;
  benchmark_logos: string;
  reference_images: ReferenceImage[];

  // 06 Dónde va a ir la marca
  brand_touchpoints: string[];
  brand_touchpoints_other: string;
  deadline: string;

  // 07 Sus datos
  contact_name: string;
  contact_role: string;
  contact_whatsapp: string;
  contact_social_web: string;
  additional_notes: string;
}

export interface BrandBriefingRecord extends BrandBriefingData {
  id: string;
  created_at: string;
  updated_at: string;
  status: 'nuevo' | 'en_revision' | 'en_diseno' | 'completado';
  admin_notes: string;
}

export const INITIAL_BRIEFING_DATA: BrandBriefingData = {
  business_name: '',
  products_sold: [],
  products_other: '',
  years_operating: '',
  location_scope: '',
  business_story: '',

  target_clients: [],
  target_clients_other: '',
  value_proposition: '',
  pre_purchase_questions: '',
  pricing_comparison: '',

  competitors: '',
  competitors_dealbreakers: '',

  business_as_person: '',
  brand_words: '',
  personality_traits: {
    traditional_modern: 50,
    industrial_elegant: 50,
    formal_friendly: 50,
    economical_premium: 50,
    local_bigcorp: 50,
  },

  has_current_logo: '',
  current_logo_changes: '',
  logo_style_preference: '',
  colors_liked: '',
  colors_disliked: '',
  benchmark_logos: '',
  reference_images: [],

  brand_touchpoints: [],
  brand_touchpoints_other: '',
  deadline: '',

  contact_name: '',
  contact_role: '',
  contact_whatsapp: '',
  contact_social_web: '',
  additional_notes: '',
};
