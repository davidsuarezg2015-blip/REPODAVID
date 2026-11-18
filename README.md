# Alivio · Guía de duelo

Aplicación web en español para explorar cinco reacciones ante una pérdida, reflexionar sobre cómo se han presentado durante los últimos siete días y descargar un informe personal en PDF con sugerencias de cuidado.

## Ejecutar en local

Requiere Node.js 20.19+ o 22.12+.

```sh
npm ci
npm run dev
npm test
npm run build
```

`npm run build` genera un sitio estático en `dist/`. No requiere un servidor de aplicaciones, una base de datos ni claves. Puedes comprobar la compilación con `npm run preview`.

## Publicar con GitHub Pages

1. Abre [Settings → Pages](https://github.com/davidsuarezg2015-blip/REPODAVID/settings/pages) y selecciona **GitHub Actions** como **Source** en **Build and deployment**. Solo tienes que hacerlo una vez.
2. Fusiona los cambios a `main`. El flujo **Build and publish Alivio** ejecuta las pruebas, compila `dist/` y despliega el sitio desde `main`. Los pull requests ejecutan las pruebas y la compilación, pero no publican.
3. Una vez completado el despliegue, abre [Alivio en GitHub Pages](https://davidsuarezg2015-blip.github.io/REPODAVID/).

Si habilitaste Pages después de fusionar, vuelve a ejecutar el flujo en **Actions → Build and publish Alivio → Run workflow**, usando la rama `main`.

## Fuente y alcance

La guía parte de *Sobre la muerte y los moribundos: Alivio del sufrimiento psicológico*, de Elisabeth Kübler-Ross (traducción de Neri Daurella, edición digital de 2017). Incluye referencias a los capítulos 3–8 de la edición adjunta y al capítulo 11 (p. 202), donde se describe cómo las fases pueden superponerse. No reproduce ni redistribuye el PDF del libro.

El marco se describió originalmente a partir de conversaciones con personas que afrontaban el final de la vida. Aquí se adapta para la reflexión ante una pérdida. Se usa **Tristeza** para referirse a la fase que el libro llama «Depresión», sin equipararla con un diagnóstico clínico. Las fases no son una secuencia obligatoria ni una medida de avance.

## Cómo se interpreta el cuestionario

- Hay dos afirmaciones por fase. Las opciones van de 0 (Nada) a 3 (Mucho); las omisiones no cuentan como cero.
- Se calcula el promedio con las respuestas disponibles de cada fase. Para comparar el perfil completo se necesitan al menos siete respuestas, con una como mínimo por fase.
- Si ningún promedio llega a 2, no se indica una fase predominante. Cuando el promedio mayor alcanza 2, se muestran las fases que quedan a medio punto o menos de ese valor. Si son varias, el informe no fuerza un desempate.
- Estas son reglas orientativas de la aplicación, no umbrales clínicos. El cuestionario no es una prueba validada ni reemplaza una evaluación profesional.

Las respuestas y el informe se calculan en memoria en la pestaña, sin cuenta ni almacenamiento persistente. Solo queda una copia local si la persona descarga el PDF.
