// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { supabase } from "../../../supabaseClient";

export default async function handler(req, res) {
  const { short } = req.body;

  try {
    const { data, error } = await supabase
      .from("urls")
      .delete()
      .eq("short", short);

    if (error) {
      throw error;
    }

    return res.status(200).json(data);
  } catch (e) {
    console.error("Error al eliminar el enlace:", e.message);

    if (e.code === "P2025") {
      return res.status(404).json({ error: "El enlace no existe." });
    }

    return res
      .status(500)
      .json({ error: "Ocurrió un error al procesar la solicitud." });
  }
}
