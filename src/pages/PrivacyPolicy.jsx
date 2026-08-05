import PageHero from '../components/PageHero'

const SECTIONS = [
  {
    title: '1. Introduction',
    paragraphs: [
      'At Dater, we are deeply committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy provides an in-depth overview of how we collect, utilise, and safeguard personally identifiable information (PII) when you engage with our website and application. It is crucial that you read this policy thoroughly, as it governs our practices regarding your information. All practices outlined in this document will remain in effect regardless of any changes to your membership status. By using the Dater website or app, you acknowledge and accept the terms specified in this Privacy Policy.',
    ],
  },
  {
    title: '2. Why We Collect Personal Information',
    paragraphs: [
      'In this Privacy Policy, "Personal Data" refers to any information that could potentially identify you as an individual. We process this data for several essential reasons, primarily to fulfil our contractual obligations to you. This involves assisting you in finding a suitable partner based on various criteria, such as age, gender, height, photos, interests etc. Additionally, we process Personal Data to comply with legal requirements and regulations. Furthermore, your data enables other users to view your profile, aids in analysing your browsing patterns, and facilitates partnerships with our payment and storage service providers.',
      'In certain circumstances, we require your consent to process specific types of Personal Data. For example, your explicit permission is necessary for activities such as receiving newsletters and promotional offers. Before you can register as a user, we will seek your clear consent for several actions, including but not limited to:',
    ],
    list: [
      'Placing tracking cookies on your device',
      'Processing your profile information to enhance your experience',
      'Handling data related to your partner preferences, which helps us make better matches',
      'Processing photographs that you upload for your profile',
      'Managing information related to your work and interests',
      'Processing your bio and other textual content that you include in your profile',
      'Accessing your geolocation to enhance location-based services',
      'Offering services outlined in this Privacy Policy that require your consent',
    ],
    afterList:
      'It is important to note that you have the right to withdraw your consent for processing your geolocation at any time. However, this withdrawal will not affect any prior data processing activities that have already occurred.',
  },
  {
    title: '3. Types of Personal Information We Process',
    paragraphs: [
      'Before you can utilise Dater\'s services, you must register and provide specific information. During this process, you will be asked for fundamental details such as your Name, e-mail address, Facebook credentials and Apple ID credentials. After successful registration, you will have the opportunity to create a personal Dater account, referred to as "Your Account." In this context, we encourage you to provide us with additional information, including:',
    ],
    list: [
      'Your name, which will be displayed to other users',
      'Profile pictures that represent you on the platform',
      'A personal description that helps others understand your personality',
      'Detailed information about your interests, life philosophy, and professional background',
      'Basic demographic information, such as age, height, religion, ethnicity, and place of residence',
    ],
    afterList:
      'You can choose to create Your Account using Facebook Login. By utilising this social media platform, you allow us to access the personal data you have shared with them, including your name, email address, gender, date of birth, pictures and friend information. We will process this data to enhance your experience on Dater.\n\nIf you register or sign in using your Apple ID, you allow Apple to share with us your Apple login, a name (which you can change), and an email that will be connected to your Dater account for account recovery.\n\nIt is important to mention that, in cases of overdue payments, we may retain your email address and phone number for communication purposes. This ensures that we can reach you regarding any outstanding matters related to your account.\n\nAdditionally, we will process technical data, including your IP address, login history, customer service interactions, time zone settings, device ID, browser language, and, if you have granted explicit permission, your geolocation information.',
  },
  {
    title: '4. How We Use Your Personal Data',
    paragraphs: [
      'Your Personal Data will be shared with other users only as necessary to facilitate potential friends. We will disclose your data to third parties only if legally required to do so by a relevant statutory authority. Importantly, we want to emphasise that we do not sell your Personal Data to any third parties for marketing or other purposes.',
    ],
  },
  {
    title: '5. Data on Your Account',
    paragraphs: [
      'Your Account will be visible to other users, with your first name serving as your primary identifier on our platform. The information you provide, including your personal description and basic demographic details, such as age, height etc. will be accessible to other users. Members of Dater can perform targeted searches based on the details you share on your profile. Once you have created Your Account, any data you have shared with Facebook or Apple ID will also be linked to your profile. This connection may allow you to see mutual connections with other users, provided they have also linked their accounts.',
    ],
  },
  {
    title: '6. Login Information',
    paragraphs: [
      'We will process and store your login credentials to verify your identity when you access Your Account. This is vital for ensuring your security and maintaining the integrity of your account.',
    ],
  },
  {
    title: '7. Email Address',
    paragraphs: ['Your email address will remain confidential and will not be shared with third parties. We may use your email address to:'],
    list: [
      'Inform you about your membership status and updates',
      'Notify you of any relevant activities regarding Your Account',
      'Engage you with newsletters, updates, and troubleshooting support',
    ],
  },
  {
    title: '8. SMS Notifications',
    paragraphs: [
      'By registering with Dater, you give us permission to send you SMS notifications. These messages may include important updates and alerts related to your account. If you prefer not to receive SMS notifications, please contact us at contact@dater.social.',
    ],
  },
  {
    title: '9. Geolocation',
    paragraphs: [
      'We may share your current location with other users to enhance their experience and facilitate connections with people nearby. However, we will not disclose your exact zip code to other users of Dater. You can choose to share your geolocation, which is necessary for seeing other users nearby at any given time. The geolocation data shared with other users will not be highly precise; instead, it will be limited to an approximate range of 0.5 kilometres.',
    ],
  },
  {
    title: '10. Date of Birth',
    paragraphs: [
      'Your date of birth is utilised to calculate and display your age on Your Account. This information is important for matching you with compatible users based on age criteria.',
    ],
  },
  {
    title: '11. Uploaded Photos',
    paragraphs: [
      'When creating Your Account, you will need to upload photos, including a display picture. We may utilise external face recognition tools and techniques to select the most suitable pictures for your profile. The selection criteria may include factors such as image quality, composition, and authenticity. Images uploaded by you may be modified by us to enhance their presentation on the platform.',
      'Additionally, new pictures uploaded will undergo a review process before they appear on Your Account. Your photos will be displayed to other users, and your avatar or other images may be included in email communications from Dater if we believe you could be a good friend for that user. Furthermore, your Account, including your pictures, may be featured on the Dater homepage for public viewing, without your consent.',
    ],
  },
  {
    title: '12. Chat Messages and Written Content',
    paragraphs: [
      'Your chat messages are strictly confidential and are processed solely to allow you access to your chat history. We utilise filtering software and techniques to monitor chat messages for inappropriate content, such as derogatory or aggressive language, as well as unlawful uses of our platform for advertising or spam. Following such notifications, we reserve the right to erase any offensive content. This policy also extends to other written content you post on Dater, including about me (i.e. My bio), Preset messages and Written Prompts.',
    ],
  },
  {
    title: '13. Customer Service History',
    paragraphs: [
      'If you reach out to our customer service team, we maintain records of your correspondence to enhance our service offerings and better meet your needs.',
    ],
  },
  {
    title: '14. Non-Personal Data',
    paragraphs: [
      'We may also collect and process non-personal data whenever you use our website or app. This type of data may include information such as your browser type and version, the type of computer or mobile device you are using, and technical information about your connection to our website, such as your operating system and platform, as well as the internet service providers utilised.',
    ],
  },
  {
    title: '15. Push Notifications',
    paragraphs: [
      'If you have provided explicit permission, we may send push notifications through our app to keep you informed about your membership status, new messages received, and other activities related to Your Account. We may also send promotional push notifications suggesting potential friends and other relevant materials.',
    ],
  },
  {
    title: '16. Inviting Friends',
    paragraphs: [
      'If you choose to refer a friend to Dater, you will send an invitation via email, WhatsApp, SMS, or Messenger using the contact details you provided. We assure you that we will not share these details with anyone else. By inviting a friend, you confirm that they are willing to receive the invitation and agree to indemnify Dater against any claims arising from your messages. It is crucial that you do not misuse this feature for spamming purposes.',
    ],
  },
  {
    title: '17. Protecting Your Personal Data',
    paragraphs: [
      'We take extensive measures to ensure that your Personal Data is secure from unauthorised access, alteration, disclosure, or destruction. Our services are encrypted using Secure Socket Layer (SSL) technology, and access to your data is restricted to employees who require it for legitimate business purposes. While we take all reasonable precautions to protect your data, please be aware that the transmission of information via the internet is not always completely secure. Although we implement robust security measures, we cannot guarantee the absolute security of the data you transmit to our website or app; any transmission is at your own risk.',
    ],
  },
  {
    title: '18. Data Retention Period',
    paragraphs: [
      'We will retain your Personal Data only for as long as necessary to fulfil the purposes for which it was collected or as permitted by law, whichever is shorter. If you do not log into your profile for five years, your Personal Data may be removed from our records. You can always request the deletion of your data by contacting our support team using your registered email address and mobile number.',
    ],
  },
  {
    title: '19. Changes to This Privacy Policy',
    paragraphs: [
      'We are continuously striving to improve Dater, and as a result, we may update this Privacy Policy from time to time. In the event of significant changes, you may receive a notification in the app that requires your acceptance before you can continue using Dater. This ensures that you remain informed about any alterations that may affect your privacy and data security.',
    ],
  },
  {
    title: '20. Storage and Transfer of Your Personal Data',
    paragraphs: [
      'Your Personal Data may be hosted by our partners on servers located in countries outside your residence. You have the right to view, edit, or delete your Personal Data by logging into your Dater account. To mitigate the risk of data loss resulting from unforeseen events, we may retain backup data for up to three years following account deletion. During this retention period, the account will not be visible on Dater, but your information will remain stored. After the conclusion of this retention period, all data will be permanently deleted, except for your email address and phone number, which we may keep for purposes related to payment communications. We may also store generic, non-personal data regarding your activity as a user for internal analytical purposes.',
      'Dater does not collect personal data from minors. If a member falsely claims to be over the age of 18, we strongly urge parents or guardians to notify us via email at contact@dater.social so that we can promptly delete the minor\'s data from our records.',
      'When registering, members provide their consent for their data to be shared with Dater\'s service providers and subcontractors located outside their country for operational purposes, including statistical analysis and user support. We are committed to ensuring that such transfers maintain confidentiality and security in compliance with applicable regulations.',
    ],
  },
  {
    title: '21. Disclosure of Your Personal Information',
    paragraphs: ['We may disclose your personal information under specific circumstances, which include:'],
    list: [
      'In the event of a business acquisition, merger, or sale of all or a portion of our assets',
      'To identify or take legal action against you if you violate our terms or to protect the rights of other users',
      'If our assets are acquired by a third party or if we are involved in a bankruptcy proceeding',
      'To comply with legal obligations or to enforce our terms and agreements',
    ],
  },
  {
    title: '22. Profile Verification Information (Including Biometric Data)',
    paragraphs: [
      'To enhance the safety and security of all users on our App and Sites, we require account verification for everyone. This may include requesting your phone number and, in certain cases, performing a photo verification. This process helps us confirm that users are genuine individuals, which reduces the risk of fake accounts and potential misuse.',
      'You can also choose to verify your photo voluntarily, allowing you to display a blue "verified" badge on your profile. If you opt for this, we will analyse your submitted photo using facial recognition technology to ensure it matches your profile picture, thereby verifying your identity.',
      'Please note that verification photos will not be visible on your profile. We will keep the scans for verification purposes and record-keeping, retaining them only as long as necessary, and not exceeding three years after your last interaction with us. After this period, we will securely and permanently delete the scans from our systems.',
    ],
  },
  {
    title: '23. About Us',
    paragraphs: [
      'Dater and its associated website and apps are owned and operated by Datify Network Pvt. Ltd. Having its registered office at G-26, Near Saini Shop, Vill. Wazirabad, Gurgaon, Basai Road, Gurgaon- 122001, Haryana.',
      'We reserve the right to amend the terms of use and this Privacy Policy at any time. The most recent versions of these documents will always be made available on our app and website. We recommend that you check these documents periodically for updates, as continued use of our services following revisions signifies your acceptance of the new terms.',
      'If you observe any suspicious activity or have concerns regarding the handling of your data, please notify us immediately at contact@dater.social',
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
      {section.afterList &&
        section.afterList.split('\n\n').map((p, i) => (
          <p key={`after-${i}`} className="mb-4 font-google-sans-flex text-[16px] leading-relaxed text-text-muted">
            {p}
          </p>
        ))}
    </div>
  )
}

export default function PrivacyPolicy() {
  return (
    <main className="w-full">
      <PageHero title="Privacy policy" />

      <div className="mx-auto max-w-4xl px-8 py-16">
        <h2 className="mb-2 font-google-sans-flex text-[28px] font-bold text-text-primary">Privacy policy</h2>
        <span className="mb-8 block font-google-sans-flex text-[16px] text-text-muted">
          Updated on 25 Oct, 2024
        </span>

        {SECTIONS.map((section) => (
          <LegalSection key={section.title} section={section} />
        ))}
      </div>
    </main>
  )
}
