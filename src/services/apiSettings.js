import supabase from "./supabase";

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select().single();
  if (error) throw new Error("Failed to fetch from server");

  return data;
}
const settingsData = await getSettings();

export async function updateSetting(setting) {
  const { data, error } = await supabase
    .from("settings")
    .update(setting)
    .eq("id", settingsData.id)
    .select();

  if (error) throw new Error("Failed to update the setting");

  return data;
}
