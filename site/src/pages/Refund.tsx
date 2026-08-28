import Seo from '../components/Seo';
import { LegalPage, Section } from '../components/Prose';
import { SUPPORT_EMAIL } from '../lib/config';

/**
 * Cancellation & Refund policy. Required by payment-aggregator review even
 * though Google Play is the actual processor for every Pro purchase.
 */
export default function Refund() {
  return (
    <>
      <Seo
        title="Cancellation & Refund Policy"
        description="How to cancel Themeplix Pro and how refunds are handled."
        path="/refund"
      />
      <LegalPage
        title="Cancellation & Refund Policy"
        updated="Last updated 28 August 2026"
        lede="Every Themeplix Pro purchase goes through Google Play. That means Google Play handles billing, cancellations and refunds — we never receive your payment directly."
      >
        <Section title="What you can buy">
          Themeplix Pro is the only paid item. It is available as a monthly
          subscription, a yearly subscription, or a one-time lifetime purchase.
          The free app has no paid content — premium wallpapers are unlocked with
          a rewarded video at no cost.
        </Section>

        <Section title="Cancelling a subscription">
          You can cancel a monthly or yearly subscription at any time:
          <br />
          <br />
          Google Play Store app → tap your profile → <strong>Payments &amp;
          subscriptions</strong> → <strong>Subscriptions</strong> → Themeplix →{' '}
          <strong>Cancel subscription</strong>.
          <br />
          <br />
          Cancelling stops the next renewal. Your Pro access continues until the
          end of the period you have already paid for. There is no separate
          cancellation fee.
        </Section>

        <Section title="Refunds">
          Refunds are governed by{' '}
          <a
            href="https://support.google.com/googleplay/answer/2479637"
            target="_blank"
            rel="noreferrer"
          >
            Google Play's refund policy
          </a>
          . In general:
          <br />
          <br />
          • You can request a refund directly from Google Play within 48 hours of
          purchase (Play Store → profile → Payments &amp; subscriptions → Budget
          &amp; order history → the order → <strong>Request a refund</strong>).
          <br />
          • After 48 hours, refund requests are reviewed by Google at its
          discretion.
          <br />
          • The lifetime purchase follows the same 48-hour window.
          <br />
          <br />
          Because we never receive your payment, we cannot process a card, UPI or
          bank refund ourselves. If a refund is approved by Google Play, Google
          returns the money to your original payment method, usually within a few
          business days.
        </Section>

        <Section title="Problems with a purchase">
          If you were charged incorrectly, charged twice, or Pro did not activate
          after payment, email{' '}
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> with your Google
          Play order number (starts with <code className="text-text">GPA.</code>).
          We will look into it and, where a refund is warranted, help you get it
          through Google Play or raise it with Google on your behalf.
        </Section>

        <Section title="Free trials">
          Themeplix Pro is not currently offered with a free trial. If that
          changes, the trial length and the date you would first be charged will
          be shown clearly before you confirm.
        </Section>

        <Section title="Contact">
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> — we reply
          within a few days.
        </Section>
      </LegalPage>
    </>
  );
}
