import supabase from "./supabase";

export async function getSettings() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.from("settings").select().single();
  if (error) throw new Error("Failed to fetch from server");

  return data;
}

export async function updateSetting(setting) {
  const { data: settingsData, error: fetchError } = await supabase
    .from("settings")
    .select("id")
    .single();
  if (fetchError) throw new Error("Failed to resolve settings row ID");
  const { data, error } = await supabase
    .from("settings")
    .update(setting)
    .eq("id", settingsData.id)
    .select();

  if (error) throw new Error("Failed to update the setting");

  return data;
}
