import Seo from '../components/Seo';
import { Callout, LegalPage, Section } from '../components/Prose';
import { SUPPORT_EMAIL } from '../lib/config';

/**
 * Hosted privacy policy. Mirrors app/privacy.tsx in the phone app — if one
 * changes, change both, or the Play listing and the app disagree.
 */
export default function Privacy() {
  return (
    <>
      <Seo
        title="Privacy Policy"
        description="Themeplix has no accounts and no sign-in. Exactly what the app stores, what it sends, and why."
        path="/privacy"
      />
      <LegalPage
        title="Privacy Policy"
        updated="Last updated 27 August 2026"
        lede="Themeplix has no accounts, no sign-in, and asks for nothing about you. Here is exactly what the app stores, what it sends, and why."
      >
        <Callout tag="Stays on your phone" tone="good">
          Your favourites, which premium wallpapers you have unlocked, your
          light/dark choice, whether you dismissed the rating prompt, and whether
          Pro is active on this device. None of it is sent anywhere. Uninstalling
          erases all of it.
        </Callout>

        <Callout tag="Leaves your phone" tone="warn">
          Requests for wallpaper images, a count of one when a wallpaper is
          downloaded, your advertising ID going to Google for ads, and a purchase
          token if you buy Pro, so Google and our billing provider can confirm
          the membership. The download count records the wallpaper, not the
          person.
        </Callout>

        <Section title="This website">
          themeplix.app shows the same catalogue for browsing. It sets no
          tracking cookies and has no analytics or ad scripts. When you download
          a wallpaper here, the image is compressed in your own browser and the
          only thing sent back is a count of one for that wallpaper. Your IP
          address reaches our content host (Supabase) with any request, the same
          as visiting any website.
        </Section>

        <Section title="No account, no personal details">
          The app has no sign-up and no login. It never asks for your name,
          email, phone number, location or contacts, and there is no profile of
          you on our side to look up.
        </Section>

        <Section title="Stored on your device">
          A handful of things live in the app's private storage: your favourites,
          your ad unlocks, your appearance setting, and whether you have answered
          the rating prompt. Android's Clear storage option, or uninstalling,
          removes all of them permanently.
        </Section>

        <Section title="Sent to run the app">
          Wallpapers and categories are fetched from our content service on
          Supabase. Any internet request reveals your IP address to the server,
          which Supabase records in standard infrastructure logs; we do not use
          those to profile you. Downloading a wallpaper adds one to that
          wallpaper's counter, which is what ranks Trending.
        </Section>

        <Section title="Permissions">
          Photo access is requested the first time you download a wallpaper in
          the app and is used only to save that image. The app never reads or
          uploads your existing photos. Notifications are optional. Both can be
          withdrawn in Android Settings at any time.
        </Section>

        <Section title="Advertising">
          Themeplix is free, paid for by Google AdMob, or ad-free with Themeplix
          Pro. Banners appear while you browse, and a rewarded video unlocks a
          premium wallpaper. Watching one is always your choice, and declining
          just leaves it locked. Google may collect your advertising ID and
          technical device information to serve and measure ads. We receive only
          aggregate counts. In the EEA and UK the app asks your consent before
          showing personalised ads. Pro members see no ads at all. This website
          shows no ads.
        </Section>

        <Section title="Payments and Pro">
          Themeplix Pro is sold through Google Play. When you start a
          subscription or buy the lifetime unlock, Google Play handles the
          payment. Your card, UPI or other payment details go to Google and never
          reach us. We, and our billing provider RevenueCat, receive only a
          purchase token that confirms the membership is active. It is linked to
          your Google account, not to any profile we hold. There is still no
          login. Manage or cancel a subscription anytime in the Play Store under
          Subscriptions.
        </Section>

        <Section title="Who else is involved">
          Google AdMob serves the ads. Supabase stores and delivers the images.
          Google Play and RevenueCat process and verify Pro purchases. Expo
          delivers app updates and push notifications. Cloudflare serves this
          website. We do not sell, rent or trade data to anyone.
        </Section>

        <Section title="Children">
          Themeplix is not directed at children under 13 and we do not knowingly
          collect anything from them.
        </Section>

        <Section title="Your choices">
          Reset your advertising ID in Android Settings, withdraw any permission,
          clear the app's storage, or uninstall. Manage or cancel a Pro
          subscription in the Play Store. Because there is no account, nothing on
          our servers is tied to you, so removing the app is complete deletion.
          See <a href="/delete-data">Delete my data</a> for details.
        </Section>

        <Section title="Contact">
          Questions, corrections, or a copyright concern about an image? Write to{' '}
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
        </Section>
      </LegalPage>
    </>
  );
}
