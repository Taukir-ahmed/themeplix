import Seo from '../components/Seo';
import ProPlans from '../components/ProPlans';
import AppCTA from '../components/AppCTA';

const FAQ = [
  {
    q: 'How do I buy Pro?',
    a: 'Inside the Themeplix app. Open the app, tap the Pro badge, pick a plan, and Google Play handles the payment. There is no way to subscribe on the website.',
  },
  {
    q: 'What does Pro actually remove?',
    a: 'Every banner ad, every rewarded video, and the compression on downloads. It also unlocks the full premium shelf permanently.',
  },
  {
    q: 'Is lifetime really one payment?',
    a: 'Yes. ₹799 once, no renewal. The monthly and yearly plans are subscriptions you can cancel anytime in the Play Store.',
  },
  {
    q: 'Do I need an account?',
    a: 'No. Pro is tied to your Google account through Play. Themeplix itself has no login and stores nothing about you on a server.',
  },
];

export default function Pro() {
  return (
    <>
      <Seo
        title="Themeplix Pro"
        description="Themeplix Pro removes every ad, unlocks all premium wallpapers, and saves at full resolution. From ₹49/month or ₹799 lifetime."
        path="/pro"
      />

      <div className="mx-auto max-w-6xl px-5 pt-14 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Themeplix Pro
        </span>
        <h1 className="mx-auto mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
          The whole gallery, ad-free, at full quality
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-muted">
          One upgrade. Bought once in the app through Google Play.
        </p>
      </div>

      <ProPlans />

      <section className="mx-auto max-w-2xl px-5 py-10">
        <h2 className="mb-6 font-display text-2xl font-bold tracking-tight">Questions</h2>
        <div className="divide-y divide-line border-y border-line">
          {FAQ.map((f) => (
            <div key={f.q} className="py-5">
              <h3 className="font-display text-sm font-semibold">{f.q}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <AppCTA />
    </>
  );
}
