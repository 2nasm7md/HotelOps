import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://fdoafonsiahnaywcckzi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkb2Fmb25zaWFobmF5d2Nja3ppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MDEyNDAsImV4cCI6MjA2NTE3NzI0MH0.Waf_9FB94CGcvBAjtsLDOTTbOrUNHevmxNztYC5hw5M";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
