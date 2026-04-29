import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://wxeoomogotcicronjkxb.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "sb_publishable_AKpP5zsCyKGB6QHC00gTGA_B6sEQeIg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
