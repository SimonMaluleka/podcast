import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY
);

export const client = SupabaseClient;
export const _session: AuthSession | null = null;
export const profile = async (user: User) => {
  return supabase
    .from("profiles")
    .select(`username, website, avatar_url`)
    .eq("id", user.id)
    .single();
};
export const getSession = async () => {
  return await supabase.auth.getSession();
};

export const signin = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export const sigOut = async () => {
  return await supabase.auth.signOut();
};

export const updateProfile = async () => {
  const update = {
    ...updateProfile,
    updated_at: new Date(),
  };

  return await supabase.from("profiles").upsert(update);
};

export const authChanges = async (
  callback: (event: AuthChangeEvent, session: Session | null) => void
) => {
  return supabase.auth.onAuthStateChange(callback);
};

export const downloadImage = async (path: string) => {
  return supabase.storage.from("avatars").download(path);
};

export const uplodImage = async (filePath: string, file: File) => {
  return supabase.storage.from("avatars").upload(filePath, file);
};
