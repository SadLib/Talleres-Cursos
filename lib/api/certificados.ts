import { apiFetch, API_BASE_URL, getToken } from "./client";

export type Certificado = {
  id: number;
  inscripcion_id: number;
  codigo_verificacion: string;
  fecha_emision: string;
};

export function emitirCertificado(inscripcion_id: number): Promise<Certificado> {
  return apiFetch<Certificado>("/certificados", {
    method: "POST",
    body: { inscripcion_id },
  });
}

export async function certificadoPorInscripcion(inscripcion_id: number): Promise<Certificado | null> {
  try {
    return await apiFetch<Certificado>(`/certificados/por-inscripcion/${inscripcion_id}`);
  } catch {
    return null;
  }
}

export async function descargarConstanciaPDF(certificadoId: number, nombreAlumno: string) {
  const token = getToken();
  const url = `${API_BASE_URL}/certificados/${certificadoId}/pdf`;
  const res = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error("No se pudo generar el PDF");
  const blob = await res.blob();
  const objectUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = objectUrl;
  a.download = `constancia-${nombreAlumno.replace(/\s+/g, "-")}.pdf`;
  a.click();
  URL.revokeObjectURL(objectUrl);
}
