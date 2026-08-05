import PageHero from '../components/PageHero'

const SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    paragraphs: [
      'By accessing or using our app, you explicitly agree to comply with and be bound by these Terms of Use. We reserve the right to modify these terms and our privacy policy at any time, with or without prior notice. Changes may occur for various reasons, including updates to our features, changes in our business practices, or modifications in legal requirements. The most recent version of these terms will be accessible on both our app and website, along with the date of the last revision. We recommend that you periodically review these terms to remain informed of any updates. Your continued use of the Dater app and website following any changes signifies your acceptance of the revised terms. Significant modifications will be communicated to you through in-app notifications, ensuring that you are well-informed about any alterations to your agreement with us.',
    ],
  },
  {
    title: '2. Eligibility',
    paragraphs: [
      'Dater is a fastest growing social platform created to connect individuals seeking relationships and friendships. To register account, you must confirm that you meet the following eligibility criteria:',
    ],
    list: [
      'You are at least 18 years old or the age of majority to legally enter into a contract under the laws of your home country if that happens to be greater than 18.',
      'You possess the legal capacity to enter into a binding contract with Dater.',
      'Be legally permitted to use the App by the laws of your home country.',
      'You are not prohibited by any applicable law from using our services.',
      'You do not have any unspent criminal convictions involving violence, sexual misconduct, or harassment.',
      'You will not use the app if you have previously been banned or removed from Dater.',
      'You are not listed on the U.S. Treasury Department\'s Specially Designated Nationals list or any similar government restrictions.',
      'You agree to comply with all applicable local, state, national, and international laws, rules, and regulations.',
      'You are not a citizen of any country that is a part of the EU',
    ],
    afterList:
      'If you do not meet any of these conditions, we reserve the right to terminate your account immediately and without prior notice.',
  },
  {
    title: '3. Governing Law',
    paragraphs: [
      'These Terms of Use, along with our privacy policy, shall be governed in all respects by the laws of India. By using our services, you agree to submit to the exclusive jurisdiction of the courts located in Gurugram, Haryana, for any disputes arising from your use of our platform. This jurisdiction clause ensures that any legal matters are resolved under a consistent legal framework, providing clarity and consistency in the enforcement of these terms.',
    ],
  },
  {
    title: '4. Registration and Your Account',
    paragraphs: [
      'To use our app, you must first register by providing your mobile number (you have to verify by OTP sent by SMS) or by using your Facebook login details or Using your Apple ID.',
      'If you create an Account using your Facebook login details, you authorise us to access, display and use certain information from your Facebook account (e.g. profile pictures, relationship status, location and information about Facebook friends). Unfortunately, we cannot allow you to use another person\'s Account or to share your Account with any other person without permission.',
      'If you register or sign in using your Apple ID, you allow Apple to share with us your Apple login, a name (which you can change), and an email that will be connected to your Dater account for account recovery.',
      'Once your registration is successful, you will create a personal account ("Your Account"). During this setup process, you are encouraged to share additional information about yourself, including your interests, personal stories, photos, and basic details such as your name, gender, date of birth, height, relationship status, religion, ethnicity, city of residence etc. Your mobile number and e-mail address will act as your unique identifier for customer support communications.',
      'After registration, you qualify as a user of the Dater platform. Users may face suspension or permanent account ban if we receive multiple complaints regarding their behaviour or if they violate any of our terms or community guidelines.',
      'You are solely responsible for maintaining the confidentiality of your account credentials and for any activities that occur under your account. It is crucial to safeguard your login information to prevent unauthorised access.',
      'By registering for Dater, you grant us permission to send you SMS and email notifications regarding activities related to your profile and account. These notifications may include updates, messages from other users, or important information regarding your account status.',
      'If you suspect that your account has been accessed by someone else, please contact us immediately to report unauthorised access. We take account security seriously and will assist you in resolving any security concerns.',
    ],
  },
  {
    title: '5. Community Guidelines',
    paragraphs: [
      'All users of Dater are expected to conduct themselves with respect and professionalism at all times. Engaging in unacceptable behaviour may lead to account suspension or or permanent account ban. The following behaviour\'s are strictly prohibited:',
    ],
    list: [
      'Posting or transmitting content that is defamatory, inaccurate, abusive, obscene, profane, offensive, threatening, harassing, racially offensive, or otherwise illegal. We strive to maintain a respectful environment for all users, where everyone feels safe and valued.',
      'Using automated tools such as robots, spiders, or similar applications to access or replicate content on our platform without authorisation. This includes any attempt to scrape data or manipulate the platform for personal gain.',
      'Using Dater for commercial purposes or to solicit business without prior consent. The platform is designed for personal connections, not commercial transactions or marketing efforts.',
      'Providing misleading, false, or inaccurate information to Dater or other users in your profile or communications. Honesty and transparency are essential to fostering meaningful connections and maintaining the integrity of the community.',
      'Sharing links to other websites or services without prior approval from Dater. This helps us maintain a safe environment and reduces the risk of users being exposed to harmful or inappropriate content.',
      'Sharing your login credentials with anyone else. Your account is personal to you, and sharing it compromises your security and privacy, potentially putting you and your data at risk.',
      'Disclosing personal information publicly on your profile, such as full name, address, email address, or phone number. Additionally, avoid including personal contact details in messages to users who have not contacted you first. This precaution helps protect your privacy and ensures a safer experience for all users.',
    ],
    afterList:
      'Failure to adhere to these guidelines may lead to the termination or permanent ban of your account. Please be aware that your photos will be subject to review before being published on Dater. Uploading malicious software or compromising the security of our services is strictly prohibited. You are also expected to handle information from other users responsibly and not to disrupt the normal functioning of Dater.',
  },
  {
    title: '6. Safety',
    paragraphs: [
      'Dater does not conduct background checks on users and does not verify the statements made by individuals using the platform. As such, you are responsible for taking appropriate safety precautions when interacting with other users. Engaging with others online or offline carries inherent risks, and you acknowledge that we cannot guarantee the accuracy or reliability of the information provided by other users. While Dater makes reasonable efforts to maintain accurate and up-to-date information, we cannot guarantee its completeness or current relevance. Any reliance on information provided through our services is at your own risk.',
      'We do not knowingly collect data from minors. If a minor is found to be using our services, and a parent or guardian informs us, we will promptly delete all data associated with that minor. Protecting the privacy and safety of young users is a priority for us, and we take any violations of this policy seriously.',
    ],
  },
  {
    title: '7. Purchases, Cancellations, and Refunds',
    paragraphs: [
      'Dater does not sell physical products but offers digital goods, such as a Premium Subscription, Dater Boost and Dater Flowers, which can enhance your experience on the platform. Payments for these digital goods are generally non-refundable. If you choose to purchase a recurring subscription, your account will be charged automatically until you decide to cancel it. To cancel your subscription, you must access your account settings in the app store and follow the provided instructions. It is important to manage your subscriptions actively to avoid unexpected charges.',
      'Refunds may be available under specific conditions if requested within 5 days of the transaction date, provided that the payment was made in a currency other than INR, the goods remain unused, and applicable laws permit refunds. Such refunds will be processed within 7 business days, ensuring that your concerns are addressed promptly and fairly.',
      'If you subscribed through Google and, reside outside the US your refund will be handled by Google, not Dater. To request a refund, go to the Google Play Store app, select your order history, find the transaction, select "Report a Problem" and submit your refund request. If you subscribed using your Apple ID, refunds are handled by Apple (regardless of where you live), not Dater. To request a refund, go to iTunes, click on your Apple ID, select "Purchase history," find the transaction and hit "Report Problem". You can also submit a request at Apple Support.',
      'Payments made through our website or other payment gateways should also be directed to our customer support team for resolution. We are here to help you navigate any issues you may encounter, ensuring a smooth and satisfying experience on our platform.',
    ],
  },
  {
    title: '8. License',
    paragraphs: [
      'As a user of Dater, you are granted a limited, non-exclusive, and non-transferable license to use our services for personal and non-commercial purposes. By submitting content to Dater, you grant us a free, non-exclusive, worldwide, and perpetual license to use, reproduce, modify, and display your content for the purpose of facilitating communication between users. Dater may utilise this content across various platforms, including our website, app, advertisements, and internal purposes. Your contributions help enhance the community experience and foster connections among users.',
      'We reserve the right to modify or discontinue our services, or any part thereof, at any time without notice. You agree that we will not be liable to you or any third party for any modification, suspension, or discontinuation of our services. This means that while we strive to provide a continuous service, circumstances may arise that necessitate changes, and we appreciate your understanding in this regard.',
    ],
  },
  {
    title: '9. Deletion of Account',
    paragraphs: [
      'You may delete your Dater account at any time without prior notice. If you choose to delete your account, your profile will be removed from the platform, and you will not be able to reactivate it or recover any data associated with it. If you wish to use Dater again in the future, you will need to register for a new account and provide the necessary information again. This process ensures that all data is handled in accordance with our privacy policy. maintaining your privacy and security throughout your interaction with our services.',
      'Dater reserves the right to terminate your membership, suspend or ban your account, or disable access to the services if you breach any of these Terms of Use, with or without notice. Please note that purchases made through the platform are non-refundable, even if your account is terminated due to violations of the terms. We take violations seriously to maintain a safe environment for all users, and we appreciate your cooperation in this matter.',
    ],
  },
  {
    title: '10. Copyright Infringement Claims',
    paragraphs: [
      'If you believe that your intellectual property rights have been infringed upon by a user on our platform, please notify us immediately by providing the following information:',
    ],
    list: [
      'A description of the copyrighted work that you claim has been infringed.',
      'The location of the infringing material on our platform.',
      'Your contact information, including your address, phone number, and email address.',
      'A statement affirming your belief that the disputed use is not authorised by the copyright owner or the law.',
    ],
    afterList:
      'Upon receiving this information, we will promptly investigate your claim and take appropriate action. We respect the intellectual property rights of others and take infringement claims seriously. We encourage users to be mindful of copyright issues and to respect the rights of content creators.',
  },
  {
    title: '11. Disclaimer of Warranties',
    paragraphs: [
      'Dater provides services "as is" and "as available," without any warranties of any kind, whether express or implied. We do not guarantee that the services will be uninterrupted, error-free, secure, or free from viruses or other harmful components. By using our platform, you acknowledge and accept that any reliance on information or services provided through Dater is at your own risk. This includes any potential emotional distress, loss of data, or damages incurred while using our services.',
      'To the fullest extent permitted by law, we disclaim all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant the accuracy, reliability, or completeness of any information provided by users or third parties. It is essential to approach any interactions on the platform with caution and to prioritise your safety and well-being.',
    ],
  },
  {
    title: '12. Limitation of Liability',
    paragraphs: [
      'In no event shall Dater, its affiliates, employees, agents, licensors, or partners be liable for any direct, indirect, incidental, punitive, or consequential damages, including but not limited to damages for loss of profits, goodwill, use, data, or other intangible losses, arising from or related to your use or inability to use the services. This limitation applies even if we have been advised of the possibility of such damages.',
      'This applies even if we were aware of the possibility of such damages. If you are dissatisfied with the app or website, your only option is to stop using them.',
      'You understand and agree that Dater\'s liability is limited to the maximum extent permitted by law, and you waive any claims against us arising from your use of our services. It is important to recognise that while we strive to provide a positive experience, we cannot assume responsibility for every outcome resulting from user interactions or the use of our platform.',
      'You agree to waive any claims related to your use of the app or website. Note that some jurisdictions do not allow the exclusion or limitation of certain damages, so these provisions may not apply to you. If any part of this limitation is found to be invalid or unenforceable, our total liability will not exceed $100.',
    ],
  },
  {
    title: '13. Indemnification',
    paragraphs: [
      'You agree to indemnify, defend, and hold harmless Dater, its affiliates, employees, directors, agents, licensors, and partners from any claims, liabilities, damages, losses, or expenses, including reasonable attorney fees, arising out of or in connection with your use of the services, your violation of these Terms of Use, or your violation of any rights of another party. This includes, but is not limited to, claims arising from your interactions with other users, your breach of any applicable law, or your failure to comply with these Terms.',
      'By participating in our platform, you agree to take responsibility for your actions and to protect Dater from any legal consequences stemming from your behaviour. This provision is essential to maintaining a safe and enjoyable environment for all users. You agree to, and hereby do, release Dater and its successors from any claims, demands, losses, damages, rights, and actions of any kind, including personal injuries, death and property damage, that either directly or indirectly arises from your interactions with or conduct of other users of the App.',
    ],
  },
  {
    title: '14. Severability',
    paragraphs: [
      'If any provision of these Terms of Use is found to be unlawful, void, or unenforceable, the remaining provisions will continue to be valid and enforceable to the fullest extent permitted by law. The unenforceable provision will be deemed modified to reflect the original intent of the parties, and the remaining provisions shall remain in full force and effect, ensuring that the overarching purpose of these terms is upheld. This means that even if one part of the agreement is invalidated, the rest will still be effective.',
    ],
  },
  {
    title: '15. Waiver',
    paragraphs: [
      'No waiver of any provision of these Terms of Use shall be deemed or shall constitute a waiver of any other provision, nor shall any waiver constitute a continuing waiver. Any failure of Dater to assert a right or provision under these Terms shall not constitute a waiver of such right or provision, and the parties agree that they will continue to abide by these terms and conditions as stipulated. This clause emphasises the importance of maintaining the integrity of the agreement, ensuring that each party remains accountable for their responsibilities.',
    ],
  },
  {
    title: '16. Entire Agreement',
    paragraphs: [
      'These Terms of Use, along with our privacy policy and any other legal notices or agreements published by us on the services, constitute the entire agreement between you and Dater regarding your use of the services. This agreement supersedes any prior agreements or understandings, whether written or oral, related to the subject matter herein. No oral or written statements made by any representative of Dater shall have any force or effect unless explicitly incorporated into this agreement. This ensures clarity and transparency in the relationship between users and Dater.',
    ],
  },
]

function LegalSection({ section }) {
  return (
    <div>
      <h2 className="mb-4 mt-8 font-google-sans-flex text-[24px] font-bold text-text-primary">
        {section.title}
      </h2>
      {section.paragraphs?.map((p, i) => (
        <p key={i} className="mb-4 font-google-sans-flex text-[16px] leading-relaxed text-text-muted">
          {p}
        </p>
      ))}
      {section.list && (
        <ul className="mb-4 list-disc space-y-2 pl-6 font-google-sans-flex text-[16px] leading-relaxed text-text-muted">
          {section.list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {section.afterList && (
        <p className="mb-4 font-google-sans-flex text-[16px] leading-relaxed text-text-muted">
          {section.afterList}
        </p>
      )}
    </div>
  )
}

export default function Terms() {
  return (
    <main className="w-full">
      <PageHero title="Terms & conditions" />

      <div className="mx-auto max-w-4xl px-8 py-16">
        <h2 className="mb-2 font-google-sans-flex text-[28px] font-bold text-text-primary">Terms of use</h2>
        <span className="mb-8 block font-google-sans-flex text-[16px] text-text-muted">
          Updated on 25 Oct, 2024
        </span>

        <p className="mb-4 font-google-sans-flex text-[16px] leading-relaxed text-text-muted">
          These Terms of Use apply for accessing and using the Dater website (www.dater.social) and
          the Dater mobile application (both iOS app and Android app) offered by Datify Network
          Pvt. Ltd. (hereafter referred as &quot;We&quot; or &quot;Us&quot; or &quot;Our&quot; or
          &quot;App&quot; or &quot;Dater&quot;).
        </p>
        <p className="mb-6 font-google-sans-flex text-[16px] leading-relaxed text-text-muted">
          Please take a few moments to read these Terms before using the App or our services,
          because once you access, view or use the App, you are going to be legally bound by these
          Terms (so probably best to read them first!). They cover important information about your
          rights and responsibilities when using our services. If you find any part of these terms
          or our privacy policy to be unacceptable, we ask that you do not use our website or app or
          our services. Your continued use indicates that you agree to these terms.
        </p>

        {SECTIONS.map((section) => (
          <LegalSection key={section.title} section={section} />
        ))}

        <h2 className="mb-4 mt-8 font-google-sans-flex text-[24px] font-bold text-text-primary">
          Contact Us
        </h2>
        <p className="mb-4 font-google-sans-flex text-[16px] leading-relaxed text-text-muted">
          If you have any questions regarding these Terms of Use, or if you would like to report any
          violations, please contact us at{' '}
          <a href="mailto:contact@dater.social" className="underline">
            contact@dater.social
          </a>
          . Your feedback and inquiries are important to us, and we strive to address them promptly
          and effectively. We appreciate your engagement and commitment to ensuring a safe and
          enjoyable experience on our platform.
        </p>
        <p className="mb-6 font-google-sans-flex text-[16px] leading-relaxed text-text-muted">
          Thank you for choosing Dater. We sincerely hope you have a positive and enriching
          experience on our platform. Your satisfaction is our top priority, and we are dedicated to
          continually improving our services for all users. Your contributions help us grow and
          evolve, ensuring a welcoming and safe environment for everyone.
        </p>
      </div>
    </main>
  )
}
