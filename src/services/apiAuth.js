import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    console.error(error);
    throw new Error("Something wrong Please try again");
  }

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    throw new Error("Something wrong Please try again");
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
    throw new Error("Something wrong Please try again");
  }

  return data.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error);
    throw new Error("Something wrong Please try again");
  }
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  let updatedData;
  // 1 Update the fullName or the Password
  if (fullName) updatedData = { data: { fullName } };
  if (password) updatedData = { password };
  const { data, error } = await supabase.auth.updateUser(updatedData);
  if (error) {
    console.error(error);
    throw new Error("Update info faild Please try again");
  }
  if (!avatar) return data;
  // 2 Update the avatar
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: uploadAvaterError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (uploadAvaterError) {
    console.error(uploadAvaterError);
    throw new Error("Upload faild Please try again");
  }
  // 1 Update the avatar in the user
  const { data: updatedUser, error: updateAvatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars//${fileName}`,
      },
    });
  if (updateAvatarError) {
    console.error(uploadAvaterError);
    throw new Error("Update faild Please try again");
  }
  return updatedUser;
}
