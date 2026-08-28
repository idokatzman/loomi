# LOOMI

חנות מקוונת לחברים קטנים סרוגים בעבודת יד.

**אתר חי:** https://loomi-friends.netlify.app

## מבנה

| קובץ | תפקיד |
|------|-------|
| `template.html` | **המקור לעריכה.** כל הקוד, העיצוב והטקסטים נמצאים כאן |
| `images/` | תמונות המוצרים (הקבצים עם `-sm` הם המוקטנים שנטענים לאתר) |
| `build-site.ps1` | בונה את `index.html` ע"י הטמעת התמונות כ-base64 |

`index.html`, `loomi-web.html` ו-`deploy/` נוצרים אוטומטית ולכן לא נשמרים בגיט.

## עריכה ופרסום

```powershell
# 1. ערוך את template.html
# 2. בנה
.\build-site.ps1
# 3. פרסם
Copy-Item index.html deploy\index.html -Force
npx netlify-cli deploy --dir=deploy --prod --site=a75a4a6a-203b-4285-9dee-929238bf6cc0
```

## הזמנות

הזמנות נשלחות בוואטסאפ ל-054-522-4288, ובמקביל נרשמות אוטומטית ב-Netlify Forms
(`app.netlify.com` → loomi-friends → Forms) עם מספר הזמנה ייחודי, כך שהזמנה
לא תאבד גם אם הלקוח שינה את ההודעה או לא שלח אותה.
