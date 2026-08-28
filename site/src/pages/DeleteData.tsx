import Seo from '../components/Seo';
import { LegalPage, Section } from '../components/Prose';
import { PACKAGE_NAME, SUPPORT_EMAIL } from '../lib/config';

/**
 * Google Play requires a reachable "how to delete your data" URL for the store
 * listing even when the app collects almost nothing. This is that page.
 */
export default function DeleteData() {
  return (
    <>
      <Seo
        title="Delete my data"
        description="How to delete any data associated with Themeplix. Short version: there is no account, so uninstalling is complete deletion."
        path="/delete-data"
      />
      <LegalPage
        title="Delete my data"
        updated="Last updated 27 August 2026"
        lede="Themeplix has no account system, so there is no profile to delete on our side. Here is what exists and how to remove each part."
      >
        <Section title="On your phone">
          Everything personal to you — favourites, unlocked wallpapers, appearance
          setting, Pro status on that device — is stored only in the app's private
          storage. To erase it:
          <br />
          <br />
          Android Settings → Apps → Themeplix → Storage → <strong>Clear storage</strong>,
          or simply uninstall the app. Both remove all of it permanently. App
          package: <code className="text-text">{PACKAGE_NAME}</code>.
        </Section>

        <Section title="Download counts">
          When a wallpaper is downloaded, a single number on that wallpaper goes
          up by one. It is not linked to you, your device, or your IP address —
          there is nothing in it to identify or delete.
        </Section>

        <Section title="Server logs">
          Our content host (Supabase) and Cloudflare keep short-lived
          infrastructure logs that include IP addresses, as every web service
          does. These rotate automatically. To request early deletion of logs
          tied to your IP address, email us with the approximate dates and times
          you used the app or site.
        </Section>

        <Section title="Advertising ID">
          Ad identifiers are managed by Google, not us. Reset or delete yours in
          Android Settings → Privacy → Ads. Opting out of ad personalisation
          there stops the app from receiving personalised ads.
        </Section>

        <Section title="Pro purchases">
          Purchase records are held by Google Play and RevenueCat to verify an
          active membership. Manage or cancel a subscription in the Play Store.
          For deletion of purchase records, contact Google Play support; email us
          and we will remove the matching token on our side.
        </Section>

        <Section title="Ask us directly">
          Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> with the
          subject "Data deletion". We reply within 30 days. Because we hold no
          account and no personal profile, most requests are resolved simply by
          confirming there is nothing tied to you to delete.
        </Section>
      </LegalPage>
    </>
  );
}
