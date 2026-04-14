import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wdaixjhluktcnrnochao.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkYWl4amhsdWt0Y25ybm9jaGFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwOTA0NzgsImV4cCI6MjA5MTY2NjQ3OH0.InLA-Otf0JDIFpaXEIGCFGOgjhfCc-5byAwhd3eXR6Y";

export const supabase = createClient(supabaseUrl, supabaseKey);