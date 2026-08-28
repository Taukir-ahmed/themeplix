import Seo from '../components/Seo';
import { LegalPage, Section } from '../components/Prose';
import { SUPPORT_EMAIL } from '../lib/config';

/**
 * Terms of Service. Kept deliberately plain. Payment-aggregator review (BillDesk
 * / RBI PA rules) expects this to exist and be reachable from the site.
 */
export default function Terms() {
  return (
    <>
      <Seo
        title="Terms of Service"
        description="The terms for using the Themeplix app and website."
        path="/terms"
      />
      <LegalPage
        title="Terms of Service"
        updated="Last updated 28 August 2026"
        lede="These terms cover your use of the Themeplix app and this website. Using either means you accept them."
      >
        <Section title="Who we are">
          Themeplix ("Themeplix", "we", "us") is a wallpaper service operated by an
          individual seller based in Patna, Bihar, India:{' '}
          <strong>Md Taukir Ahmed</strong>. Contact:{' '}
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
        </Section>

        <Section title="The service">
          Themeplix offers phone wallpapers through an Android app and this
          website. Wallpapers, categories and rankings change over time. We may
          add, change or remove any wallpaper or feature at any time, and we may
          limit or suspend the service for maintenance or for misuse.
        </Section>

        <Section title="No account">
          Themeplix has no sign-up and no login. You are responsible for the
          device you use it on. Some settings and purchases are stored only on
          that device.
        </Section>

        <Section title="Licence to use wallpapers">
          When you download a wallpaper, we grant you a personal, non-exclusive,
          non-transferable licence to use it as wallpaper or a background on your
          own devices. You may not:
          <br />
          <br />
          • resell, redistribute, sublicense or share the image files as a set or
          collection;
          <br />
          • use wallpapers in a product, service or advertisement, or as
          merchandise;
          <br />
          • scrape or bulk-download the catalogue, or use bots to access it;
          <br />
          • claim the artwork as your own.
          <br />
          <br />
          Occasional personal sharing of a single wallpaper with a friend is
          fine.
        </Section>

        <Section title="Intellectual property">
          "Themeplix" and the Themeplix logo are our marks. The wallpapers are
          original compositions created by the developer using AI image tools and
          curated by hand; the arrangement and selection of the catalogue is also
          ours. We do not knowingly include real people's likenesses, brand
          logos, or copyrighted characters. If you believe an image should not be
          here, email us and we will review it.
        </Section>

        <Section title="Themeplix Pro and payments">
          Themeplix Pro is an optional upgrade that removes ads, unlocks all
          premium wallpapers, and enables full-resolution saves. It is sold only
          through Google Play, as a monthly subscription, a yearly subscription,
          or a one-time lifetime purchase, at the prices shown in the app at the
          time of purchase. Google Play processes the payment; we never receive
          or store your card, UPI or bank details. Subscriptions renew
          automatically until cancelled. See our{' '}
          <a href="/refund">Cancellation &amp; Refund policy</a> for how to cancel
          and how refunds work.
        </Section>

        <Section title="Advertising">
          The free version of Themeplix shows ads served by Google AdMob,
          including a rewarded video to unlock premium wallpapers. Watching a
          rewarded ad is always your choice. Pro removes all ads. This website
          shows no ads.
        </Section>

        <Section title="Acceptable use">
          Do not attempt to break, overload, reverse-engineer or gain
          unauthorised access to the service or its infrastructure, and do not
          use it to infringe anyone's rights or break the law.
        </Section>

        <Section title="Disclaimers">
          The service is provided "as is" and "as available", without warranties
          of any kind. We do not guarantee that it will be uninterrupted,
          error-free, or that any particular wallpaper will remain available.
        </Section>

        <Section title="Limitation of liability">
          To the extent permitted by law, Themeplix is not liable for indirect,
          incidental or consequential losses. Our total liability for any claim
          relating to the service is limited to the amount you paid us (through
          Google Play) in the 12 months before the claim, or, if you paid
          nothing, to INR 1,000.
        </Section>

        <Section title="Changes">
          We may update these terms. Material changes will be reflected by the
          "last updated" date above and, where significant, noted in the app.
          Continuing to use Themeplix after a change means you accept the updated
          terms.
        </Section>

        <Section title="Governing law">
          These terms are governed by the laws of India. Courts at Patna, Bihar
          have exclusive jurisdiction, subject to any consumer-protection rights
          you have where you live.
        </Section>

        <Section title="Contact">
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
        </Section>
      </LegalPage>
    </>
  );
}
