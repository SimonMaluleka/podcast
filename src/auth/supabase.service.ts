import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from "@supabase/supabase-js";

export const supabase = createClient(
  "https://qokahabbrbiqsdqmrqdw.supabase.co", //import.meta.env.VITE_SUPABASE_URL,
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFva2FoYWJicmJpcXNkcW1ycWR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAzOTEzMTIsImV4cCI6MjAyNTk2NzMxMn0.CTqMzyskDYhxRz7qnynVmI_yPBo64ZR-5wF_iYjHxQ0"
  //import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY
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
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data.session;
  } catch (error) {
    console.log(error);
  }
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) console.log(error);
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
