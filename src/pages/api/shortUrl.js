import { supabase } from "../../../supabaseClient";
import QRCode from "qrcode";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { url } = req.body;
    const short = Math.random().toString(36).substr(2, 5);

    const qrCodeData = await QRCode.toDataURL(short);

    const { data, error } = await supabase
      .from("urls")
      .insert([{ url, short, qr_code: qrCodeData }])
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data[0]);
  }
}