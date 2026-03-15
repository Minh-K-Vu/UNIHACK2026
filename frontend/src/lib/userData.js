import { supabase } from "./supabase";

export async function getFavorites(userId) {
  const { data, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getRecentSearches(userId) {
  const { data, error } = await supabase
    .from("recent_searches")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) throw error;
  return data;
}

export async function addRecentSearch(userId, ticker) {
  const { error } = await supabase
    .from("recent_searches")
    .upsert(
      {
        user_id: userId,
        ticker,
        created_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id,ticker",
      }
    );

  if (error) throw error;
}

export async function toggleFavorite(userId, ticker) {
  const { data, error } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", userId)
    .eq("ticker", ticker)
    .limit(1);

  if (error) throw error;

  const exists = data.length > 0;

  if (exists) {
    const { error: deleteError } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", userId)
      .eq("ticker", ticker);

    if (deleteError) throw deleteError;

    return false;
  }

  const { error: insertError } = await supabase
    .from("favorites")
    .insert({
      user_id: userId,
      ticker,
    });

  if (insertError) throw insertError;

  return true;
}