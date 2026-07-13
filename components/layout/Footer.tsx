import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { footerLinks } from "@/data/navigation";
import { Logo } from "@/components/brand/Logo";

export function Footer() {
  const { socialLinks, contact } = siteConfig;
  const social = [socialLinks.instagram, socialLinks.line];

  return (
    <footer className="border-t border-mist bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div>
            <Logo showEnglish tone="dark" />
            <p className="mt-6 text-sm leading-relaxed text-mist">
              不是預測未來
              <br />
              而是修正決策
            </p>
          </div>

          <nav aria-label="頁尾連結" className="flex flex-col gap-3 text-sm">
            {footerLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-mist transition-colors hover:text-paper"
              >
                {item.label}
              </Link>
            ))}
            {contact.email.enabled && (
              <a
                href={`mailto:${contact.email.address}`}
                className="text-mist transition-colors hover:text-paper"
              >
                聯絡方式
              </a>
            )}
            {social.map((link) =>
              link.enabled ? (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mist transition-colors hover:text-paper"
                >
                  {link.label}
                </a>
              ) : (
                <span key={link.label} className="cursor-default text-stone">
                  {link.label}（即將開放）
                </span>
              ),
            )}
          </nav>
        </div>

        <p className="mt-12 border-t border-ink-soft pt-6 text-xs text-stone">
          © {new Date().getFullYear()} {siteConfig.name} {siteConfig.englishName}
          ．本網站不提供未來預測、吉凶論斷或心理診斷。
        </p>
      </div>
    </footer>
  );
}
