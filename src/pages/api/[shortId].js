import { supabase } from "../../../supabaseClient";

export default async function handler(req, res) {
  const { shortId } = req.query; 
  try {
    const { data, error } = await supabase
      .from("urls")
      .select("url")
      .eq("short", shortId)
      .single();

    return res.redirect(302, data.url);
  } catch (error) {
    console.error("Error al buscar el enlace:", error.message);
    return res.status(500).json({ error: "Ocurrió un error al procesar la solicitud." });
  }
}