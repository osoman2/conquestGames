

## Crear proyecto en Google Cloud Console y extraer API Key

1. Ve a console.cloud.google.com
2. Arriba a la izquierda → Select a project → New Project
3. Ponle un nombre (ej: conquergames) → Create
4. En el menú izquierdo → APIs & Services → Library
5. Busca Google Sheets API → clic → Enable
6. APIs & Services → Credentials → + Create Credentials → Service account
7. Nombre: conquergames-sheets → Create and Continue
8. En Role selecciona Editor → Continue → Done
9. En la lista de Service Accounts, haz clic en la que acabas de crear
10. Tab Keys → Add Key → Create new key → JSON → Create
11. Se descarga un archivo .json — guárdalo bien, solo se descarga una vez
12. Abre el JSON descargado, copia el valor de client_email (algo como conquergames-sheets@tu-proyecto.iam.gserviceaccount.com)
13. Abre tu Google Sheet → botón Compartir
14. Pega ese email → permiso Editor → Enviar



# Numeros y spots
Amateur: 60 cupos
Pro: 40 cupos
Total: 100 (como antes)
Si quieres cambiar esos números, solo modifica maxSpots en content/categories.ts.

