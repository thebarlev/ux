# python3 backup-legal.py <base> — 046: backup 30 days (paid plans) in terms, privacy, cancel, features, articles, llms.txt
import sys, urllib.request
B = sys.argv[1]
def get(u): return urllib.request.urlopen(urllib.request.Request(B + u, headers={"user-agent": "Mozilla/5.0 l046"}), timeout=60).read().decode()
ok = bad = 0
def chk(u, s, want=True):
    global ok, bad
    if (s in get(u)) == want: ok += 1
    else: bad += 1; print("FAIL", u, "missing" if want else "present", s)
chk("/terms", "גיבוי יומי שנשמר 30 יום, בחבילות בתשלום."); chk("/en/terms", "A daily backup, kept for 30 days, on the paid plans.")
chk("/terms", "ושומרים כל גיבוי 30 יום."); chk("/en/terms", "keep each backup for 30 days.")
chk("/terms", "עותקים בגיבוי נמחקים אוטומטית 30 יום אחרי סגירת החשבון."); chk("/en/terms", "Copies in backups are deleted automatically 30 days after the account is closed.")
chk("/privacy", "<td>עד 30 יום.</td>"); chk("/en/privacy", "<td>Up to 30 days.</td>")
chk("/privacy", "עותקים בגיבוי נמחקים 30 יום אחרי הסגירה."); chk("/en/privacy", "Copies in backups are deleted 30 days after closing.")
chk("/cancel", "ועותקים בגיבוי נמחקים 30 יום אחריה."); chk("/en/cancel", "and copies in backups are deleted 30 days later.")
chk("/features", "גיבוי יומי ושחזור, 30 יום אחורה, בחבילות בתשלום", False); chk("/pricing", "גיבוי יומי ושחזור, 30 יום אחורה, בחבילות בתשלום", False)
chk("/en/features", "Daily backup and restore, 30 days back, on paid plans", False); chk("/en/pricing", "Daily backup and restore, 30 days back, on paid plans", False)
chk("/pricing", "בכל חבילה: אחסון, עורך ייעודי וטופס לידים."); chk("/en/pricing", "On every plan: hosting, a dedicated editor and a lead form.")
chk("/blog/wordpress-vs", "גיבוי יומי ושחזור, 30 יום אחורה, בחבילות בתשלום."); chk("/en/blog/wordpress-vs", "Daily backup and restore, 30 days back, on paid plans.")
chk("/blog/wordpress-vs", "ובחבילות בתשלום גם גיבוי יומי ושחזור, 30 יום אחורה."); chk("/en/blog/wordpress-vs", "the paid plans add daily backup and restore, 30 days back.")
chk("/llms.txt", "- Daily backup and restore, 30 days back, on paid plans")
chk("/blog/wordpress-vs", "אחסון ו-SSL כלולים. גיבוי יומי, 30 יום, בחבילות בתשלום"); chk("/en/blog/wordpress-vs", "Hosting and SSL included. Daily backup, 30 days, on paid plans")
chk("/en/pricing", "Quick connection to your domain"); chk("/en/pricing", "your own domain", False)
print("OK", ok, "FAIL", bad)
