```markdown
# Brucat Bitácora Café

Bitácora web para registrar tus extracciones de café. Stack: **React + Vite + Dexie (IndexedDB) + Tailwind**. Deploy en **GitHub Pages**.

## 🚀 Scripts

```bash
# Instalar dependencias
npm i

# Levantar entorno local
npm run dev

# Build estático
npm run build

# Previsualización del build
npm run preview
```

## 🌐 Deploy en GitHub Pages
1. Crea el repo `brucat-bitacora-cafe` en GitHub (público).
2. Ajusta en `vite.config.js` el `base: '/brucat-bitacora-cafe/'` (ya viene configurado).
3. Habilita GitHub Pages: Settings → Pages → Source: "GitHub Actions".
4. Haz push a `main`: el workflow `deploy.yml` publicará el sitio.

> La app quedará disponible en: `https://<tu-usuario>.github.io/brucat-bitacora-cafe/`

## 📦 Datos
- Se guardan en el navegador con **IndexedDB** vía **Dexie**.
- Puedes exportar/importar desde **Ajustes** (próxima iteración).

## 🧰 Campos v1
- Fecha/hora, Método, Molino, Molienda (#), Gramos café, Gramos agua, Ratio, Temperatura, Tiempo total
- Café/Origen/Tueste, Fecha de tueste, Puntaje (0–10), Notas, Resultado (OK/Ajustar)

## 🗺️ Rutas
- `/` Lista + filtros
- `/new` Nueva extracción
- `/detail/:id` Detalle/Edición
- `/settings` Ajustes
- `/stats` Gráficos (evolución, promedio por método, molienda vs puntaje)

## 🧪 Roadmap breve
- [ ] Export/Import JSON
- [x] Gráficos (evolución puntaje, promedio por método, dispersión molienda vs puntaje)
- [ ] Backups opcionales en GitHub Gist/Drive
```
```
