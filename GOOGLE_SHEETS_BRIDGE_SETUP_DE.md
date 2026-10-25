# Google-Sheets-Bridge für das FIB MDT

Bußgeldkatalog, Anwaltskammer und Haftbefehle bleiben an ihren ursprünglichen Google Sheets. Cloudflare ruft eine Apps-Script-Web-App serverseitig auf; es werden keine Datensätze nach Supabase importiert.

## Einrichtung
1. Öffne das bestehende Apps-Script-Projekt mit den bisherigen MDT-Funktionen.
2. Füge `google-apps-script/CloudflareBridge.gs` als neue Script-Datei hinzu. Falls bereits `doPost(e)` existiert, integriere die Fälle in den vorhandenen Router; es dürfen keine zwei gleichnamigen `doPost`-Funktionen bestehen.
3. Der Bridge-Code prüft die Sitzung und Berechtigungen über `https://fib-mdt.pages.dev` und erzeugt anschließend nur für den jeweiligen Aufruf eine kurzlebige Legacy-Sitzung. Wenn du eine andere MDT-Domain verwendest, setze in Apps Script > Projekteinstellungen > Script Properties die Property `FIB_MDT_API_BASE_URL` auf deine Basis-URL.
4. Deploy > New deployment > Web app. Execute as: **Me**. Der Endpunkt muss von Cloudflare erreichbar sein. Die Bridge nimmt nur die fünf explizit freigegebenen Methoden an.
5. Kopiere die Web-App-URL mit `/exec`.
6. Cloudflare Dashboard > Workers & Pages > `fib-mdt` > Settings > Variables and Secrets: `GOOGLE_SHEETS_API_URL` anlegen und als Wert die `/exec`-URL eintragen. Nicht in Frontend-Dateien oder Git schreiben.
7. Redeploye Pages. Unter `/api/health?deep=1` muss `googleSheets.configured` `true` sein.
8. Melde dich im MDT an und teste die drei Module. Bei Fehlern HTTP-Status und JSON-Fehlermeldung aus Network sichern; keine Tokens oder Secrets teilen.

Falls das vorhandene Apps Script `refreshWarrantsCache` nicht besitzt, ruft die Bridge stattdessen `getWarrants` erneut auf.
