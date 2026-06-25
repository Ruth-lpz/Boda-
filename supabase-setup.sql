-- ============================================================
-- EJECUTA ESTE SCRIPT EN EL SQL EDITOR DE TU PROYECTO SUPABASE
-- ============================================================

CREATE TABLE IF NOT EXISTS invitados (
  id              BIGSERIAL PRIMARY KEY,
  nombre          TEXT NOT NULL,
  pases           INTEGER NOT NULL DEFAULT 1,
  estado          TEXT NOT NULL DEFAULT 'pendiente'
                    CHECK (estado IN ('pendiente', 'confirmado', 'declinado')),
  fecha_respuesta TIMESTAMPTZ,
  tel             TEXT,
  mensaje         TEXT,
  token           TEXT UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(16), 'hex')
);

ALTER TABLE invitados ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura pública"      ON invitados FOR SELECT USING (true);
CREATE POLICY "Inserción pública"    ON invitados FOR INSERT WITH CHECK (true);
CREATE POLICY "Actualización pública" ON invitados FOR UPDATE USING (true);
