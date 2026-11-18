# Código Contravencional de Salta

Guía de consulta del **Código Contravencional de la Provincia de Salta (Ley 7135)**, con explicaciones en palabras simples. Funciona como app instalable en el celular (PWA) y sin internet.

> ⚠️ Es una guía de referencia informativa. No reemplaza el texto oficial ni el asesoramiento de un abogado. Ante cualquier trámite o proceso real, consultá siempre la norma vigente en el Boletín Oficial de Salta.

## Qué hace

- **Búsqueda inteligente**: entiende frases cotidianas ("mi vecino hace mucho ruido de noche"), palabras relacionadas y errores de tipeo. No distingue mayúsculas ni acentos.
- **Salto directo por número**: escribí `87`, `art 87` o `45 bis` y va directo al artículo.
- **Filtros** por libro (Parte General, Contravenciones, Procedimiento) y por tipo de sanción (multa, arresto o ambas).
- **Copiar, WhatsApp y link** en cada artículo, con el texto y la explicación ya formateados.
- **Tamaño de letra** ajustable (A− / A+) y **modo oscuro**. Se recuerdan en el dispositivo.
- **Instalable** en Android e iPhone, con botón "Instalar app".
- **Sin internet**: después de la primera visita funciona offline.
- **Aviso de actualización**: cuando se publica una versión nueva, la app lo avisa.

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La página y toda la lógica (búsqueda, filtros, botones). |
| `articulos.json` | **Los artículos.** Para corregir o agregar uno, editá solo este archivo. |
| `sw.js` | Service worker: funcionamiento offline y actualizaciones. |
| `manifest.json` | Datos de la app instalable (nombre, colores, íconos). |
| `icon-*.png`, `apple-touch-icon.png`, `icon.svg` | Íconos de la app. |

## Cómo editar un artículo

Cada artículo en `articulos.json` tiene este formato:

```json
{
  "numero": "87",
  "texto": "Texto del artículo tal como figura en la ley.",
  "libro": "Libro II — Parte Especial (Contravenciones)",
  "explicacion": "Explicación en palabras simples.",
  "palabras": "palabras clave extra para la búsqueda"
}
```

El campo `libro` tiene que ser exactamente uno de estos:
`Libro I — Parte General`, `Libro II — Parte Especial (Contravenciones)` o `Libro III — Procedimiento`.

## Cómo publicar una actualización

1. Hacé los cambios (por ejemplo, en `articulos.json`).
2. En `sw.js`, subí el número de `VERSION` (por ejemplo, de `"v2"` a `"v3"`).
3. Subí los cambios a GitHub. Quien ya tenga la app instalada verá el aviso **"Hay una versión nueva"**.

## Probarlo en la PC

La página carga `articulos.json`, así que no funciona abriendo `index.html` con doble clic. Usá un servidor local, por ejemplo:

```bash
python -m http.server 8000
```

y entrá a `http://localhost:8000`. También funciona publicada en GitHub Pages o Netlify.
