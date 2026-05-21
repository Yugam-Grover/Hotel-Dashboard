import supabase from "./supabase";
export async function GetCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins data could not be loaded!❌");
  }
  return cabins;
}

export async function CreateEditCabin(newCabin, editId) {
  //image path
  const hasImagePath = newCabin.image?.startsWith?.(
    import.meta.env.VITE_SUPABASE_URL,
  );
  const imageName = `${Math.random()}-${newCabin.image?.name}`.replaceAll(
    "/",
    "",
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");
  if (!editId)
    //To Create
    query = query.insert([{ ...newCabin, image: imagePath }]);
  //to Edit
  else query = query.update({ ...newCabin, image: imagePath }).eq("id", editId);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("New Cabin could not be created❌");
  }

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("File could not be uploaded and cabin not created❌");
  }

  return data;
}

export async function DeleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins data could not be Deleted!❌");
  }
}
