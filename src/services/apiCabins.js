import supabase, { supabaseUrl } from "./supabase";

//  ------------------Get All Cabins ------------
export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins couldn't be Loaded.");
  }
  return data;
}

//  ---------------Create New Cabin -------------
export async function createCabin(newCabin) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  console.log(hasImagePath);
  const imageName = `${Math.random()}${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins.images/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  // Upload Image
  if (hasImagePath) return;

  const { error: storageError } = await supabase.storage
    .from("cabins.images")
    .upload(imageName, newCabin.image);

  // Delete the cabin in case of image upload failed
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }
  return data;
}
// -------------------- Edit Cabin --------------------------
export async function editCabin({ id, newCabin }) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}${newCabin.image[0].name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins.images/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .update({ ...newCabin, image: imagePath })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  // Upload Image
  if (!hasImagePath) {
    const { error: storageError } = await supabase.storage
      .from("cabins.images")
      .upload(imageName, newCabin.image[0]);

    if (storageError) {
      console.error(storageError.message);
      throw new Error(storageError.message);
    }
  }

  return data;
}
// ----------------------Delete Specific Cabin ----------------
export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
}
