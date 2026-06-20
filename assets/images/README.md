# Imágenes — elmejorelectro.es

Esta carpeta almacena todas las imágenes del sitio.
Antes de publicar, coloca aquí los siguientes archivos:

## Imágenes generales

| Archivo             | Tamaño recomendado | Descripción                                    |
|---------------------|--------------------|------------------------------------------------|
| `og-image.jpg`      | 1200 × 630 px      | Imagen Open Graph (redes sociales / SEO)       |
| `favicon.ico`       | 32 × 32 px         | Favicon del sitio                              |
| `favicon-192.png`   | 192 × 192 px       | Icono PWA / Android                            |
| `favicon-512.png`   | 512 × 512 px       | Icono PWA splash                               |
| `logo.svg`          | —                  | Versión vectorial del logo (opcional)          |

## Imágenes de producto (sección "Selección del mes")

Obtén las imágenes directamente del panel de Amazon Associates
o usa la URL de imagen del catálogo de Amazon con tu tag de afiliado.

| Archivo                    | Producto                        |
|----------------------------|---------------------------------|
| `philips-hd9650.jpg`       | Philips Airfryer XXL HD9650     |
| `cosori-pro-ii-55l.jpg`    | Cosori Pro II 5.5 L             |
| `tefal-easy-fry-ey2018.jpg`| Tefal Easy Fry Compact EY2018   |

## Imágenes de artículos (sección "Últimas reviews")

| Archivo                        | Artículo                                          |
|--------------------------------|---------------------------------------------------|
| `review-philips-hd9650.jpg`    | Análisis Philips HD9650 tras 3 meses de uso       |
| `comparativa-3-modelos.jpg`    | Cosori vs Philips vs Tefal 2025                   |
| `freidoras-baratas-60eu.jpg`   | Las 5 mejores freidoras de aire baratas           |

## Notas de optimización

- Formato recomendado: WebP (con fallback JPG)
- Comprime todas las imágenes antes de subir (TinyPNG, Squoosh)
- Añade `width` y `height` en el HTML para evitar layout shift (CLS)
- Usa `loading="lazy"` en imágenes fuera del viewport inicial
- Añade `alt` descriptivo en cada `<img>`
