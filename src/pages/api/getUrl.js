import { supabase } from "../../../supabaseClient";

export default async function handler(req, res) {
    try {
        const { data: links, error } = await supabase.from("urls").select();

        if (error) {
            console.error("Error al obtener los enlaces:", error.message);
            return res.status(500).json({ error: "Ocurrió un error al procesar la solicitud." });
        }

        return res.status(200).json(links);
    } catch (e) {
        console.error("Error inesperado:", e.message);
        return res.status(500).json({ error: "Ocurrió un error inesperado." });
    }
}