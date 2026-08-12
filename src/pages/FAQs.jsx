import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'

const FAQS = [
  {
    q: 'What is Dater?',
    a: 'Dater is a modern dating app designed to make discovering and connecting with people more natural and meaningful. Instead of the traditional swipe-left or swipe-right experience, Dater lets you explore profiles through a feed, learn more about someone, and send a friend request when you’re genuinely interested.',
  },
  {
    q: 'How is Dater different from other dating apps?',
    a: 'Dater takes a different approach to online dating by removing the traditional swiping system. You can discover people through a profile feed, explore their interests, prompts and other profile information, and decide how you want to express your interest. Dater also includes features such as profile comments, Stories, photo verification, Privacy Mode, and flexible discovery preferences.',
  },
  {
    q: 'Is Dater free to use?',
    a: 'Yes. Dater offers a free dating experience with optional paid features for users who want additional functionality. You can create a profile, discover people, and use the core features of Dater without being required to purchase a subscription.',
  },
  {
    q: 'Who can use Dater?',
    a: (
      <>
        Dater is intended for adults who are looking to meet people for dating, relationships, or other forms of romantic
        connection. Users must meet Dater’s minimum age requirement and agree to follow the platform’s{' '}
        <Link to="/terms" className="text-accent-blue underline hover:opacity-80">
          Terms &amp; Conditions
        </Link>
        ,{' '}
        <Link to="/community-guidelines" className="text-accent-blue underline hover:opacity-80">
          Community Guidelines
        </Link>
        , and other applicable policies.
      </>
    ),
  },
  {
    q: 'How do I create a Dater account?',
    a: 'You can create a Dater account using your mobile number. After entering your number and verifying it with an OTP, you’ll be guided through the profile setup process, where you can add your name, date of birth, gender, dating preferences, photos, interests, prompts, and other profile information.',
  },
  {
    q: 'Do I need an email address to join Dater?',
    a: 'No. You don’t need an email address to create a Dater account. Your mobile number is used for account registration and OTP verification.',
  },
  {
    q: 'How does dating work on Dater?',
    a: 'Dater uses a profile-feed experience rather than traditional swipe cards. Profiles are selected based on relevant factors such as your dating preferences, age and distance preferences, profile visibility, verification settings, and other discovery criteria. When you find someone you’re interested in, you can send them a friend request or use other available ways to express your interest.',
  },
  {
    q: 'How do I send a friend request?',
    a: 'When you discover someone you’d like to connect with, you can use the Add button on their profile to send a friend request. This allows you to express your interest directly instead of having to swipe through profiles.',
  },
  {
    q: 'Can I send a message when expressing interest in someone?',
    a: 'Yes. Dater allows you to leave a short comment on someone’s profile when expressing interest. This gives you an opportunity to say something personal or start a conversation instead of simply sending a connection request without context.',
  },
  {
    q: 'Can I control who appears in my feed?',
    a: 'Yes. Dater uses your preferences and several discovery criteria to make your feed more relevant. Depending on the available settings, you can control factors such as age, distance, dating preferences, interests, and whether you want to discover verified profiles.',
  },
  {
    q: 'Can I choose who I want to date?',
    a: 'Yes. Dater lets you set and adjust your dating preferences using the available filters. You can use these preferences to discover profiles that are more relevant to what you’re looking for.',
  },
  {
    q: 'Can I see only verified profiles?',
    a: 'Yes. Dater has a Verified Profiles Only filter that allows you to discover profiles of users who have completed Dater’s profile verification process. To use this filter, you must also have a verified profile yourself. Users can choose to verify their own profile, and successfully verified profiles display a verified badge.',
  },
  {
    q: 'What are Stories on Dater?',
    a: 'Stories allow you to share temporary photo and text updates with people who fall within your relevant dating preferences. They provide another way to show your personality, interests, activities, or everyday moments without changing your main profile.',
  },
  {
    q: 'How many photos can I add to my profile?',
    a: 'Dater requires a minimum of 2 photos to create a profile and allows you to add up to 6 profile photos. Using multiple recent and genuine photos can help other users get a better understanding of who you are.',
  },
  {
    q: 'Can I add interests and prompts to my profile?',
    a: 'Yes. You can add interests and up to 3 prompts to your profile. These details are designed to give other users more context about your personality, interests, and what you enjoy, making it easier for someone to find a reason to connect with you.',
  },
  {
    q: 'What is Privacy Mode?',
    a: 'Privacy Mode gives you greater control over who can discover your profile. When Privacy Mode is enabled, your profile is hidden from the normal discovery feed and is visible through the connection flow to people you choose to send a friend request to. This can be useful if you prefer a more private dating experience.',
  },
  {
    q: 'How do I enable Privacy Mode?',
    a: 'Privacy Mode can be enabled through the relevant settings in the Dater app. Once enabled, your profile will no longer be shown through the normal discovery experience in the same way as a standard profile. Availability of this feature may depend on your account or plan.',
  },
  {
    q: 'Can I hide my name?',
    a: 'Yes. Dater includes a Hide Name feature that allows you to display only the first letter of your name instead of your full name. This gives you an additional level of privacy while still allowing other users to identify your profile.',
  },
  {
    q: 'Can I pause my account?',
    a: 'Yes. If you want to take a break from dating without permanently deleting your account, you can pause your Dater account. You can choose to pause it for 24 hours, 72 hours, or indefinitely. While paused, your profile is not available for normal discovery until you return.',
  },
  {
    q: 'Can I change the city I’m discovering people in?',
    a: 'Yes. Dater includes a Switch City feature that allows eligible users to select another supported city for discovery. This can be useful if you’re travelling, planning a move, or simply want to explore connections in another city.',
  },
  {
    q: 'Can other users see my phone number?',
    a: 'No. Your phone number is used for account registration and verification and is not intended to be displayed on your dating profile. You should also never share your OTP or other account-security information with another user.',
  },
  {
    q: 'Can other users see my exact location?',
    a: 'Dater uses location information to provide relevant discovery and distance-based features, but your exact location is not intended to be publicly displayed to other users. The location information shown through the app is designed to support discovery rather than reveal your precise whereabouts.',
  },
  {
    q: 'Does Dater verify profiles?',
    a: 'Yes. Dater offers a photo verification process designed to help confirm that a person matches the photos associated with their profile. Verification is one of several measures Dater uses to help create a more trustworthy dating environment.',
  },
  {
    q: 'How does Dater’s verification work?',
    a: 'Dater uses a live selfie verification process along with automated image analysis to compare the person completing verification with the photos associated with their profile. If the verification process determines that the submitted selfie does not sufficiently match the profile photos, the profile may be restricted from discovery until the issue is resolved.',
  },
  {
    q: 'What does the verified badge mean?',
    a: 'The verified badge indicates that the user has successfully completed Dater’s photo verification process. It provides an additional signal that the person behind the profile has completed Dater’s verification procedure, although users should still exercise normal caution when meeting or communicating with anyone online.',
  },
  {
    q: 'Are profile photos checked for inappropriate content?',
    a: 'Yes. Dater uses automated photo moderation technology to help detect inappropriate or prohibited content. This is part of Dater’s broader approach to maintaining platform standards and creating a safer environment for users.',
  },
  {
    q: 'Can I block or report someone?',
    a: 'Yes. If another user makes you uncomfortable, behaves inappropriately, or violates Dater’s rules, you can use the available blocking and reporting tools. Blocking helps prevent further interaction, while reporting allows Dater to review potentially inappropriate or rule-breaking behaviour.',
  },
  {
    q: 'What should I do if I find a fake or suspicious profile?',
    a: 'If you believe a profile is fake, misleading, impersonating someone, or otherwise suspicious, you should report it through Dater’s reporting tools. You can also block the user if you do not want any further interaction. Providing accurate information when reporting helps Dater review the issue more effectively.',
  },
  {
    q: 'Does Dater guarantee that every profile is genuine?',
    a: 'No dating platform can guarantee that every profile or interaction is genuine. Dater uses measures such as photo verification, automated moderation, reporting, blocking, and account enforcement to help reduce fake, fraudulent, or inappropriate activity. Users should still exercise good judgment and take appropriate precautions when communicating with people online.',
  },
  {
    q: 'Is there a limit to how many messages I can send?',
    a: 'Dater may apply messaging limits to help reduce spam, unwanted messages, and low-quality interactions. Messaging availability and limits can depend on your account and the type of connection. Certain features may provide additional messaging access.',
  },
  {
    q: 'What happens if someone doesn’t reply to me?',
    a: 'Not everyone you contact will respond, and this is a normal part of online dating. A lack of response doesn’t necessarily mean something is wrong with your profile or that you’ve done anything wrong. You can continue discovering other people and focus on connections where the interest is mutual.',
  },
  {
    q: 'Why can’t I log into my account?',
    a: 'First, make sure you’re using the mobile number associated with your Dater account and that you have a stable internet connection. Check that you’re using the latest version of the app and try the login process again. If you still cannot access your account, contact Dater Support so the issue can be investigated.',
  },
  {
    q: 'What should I do if the app isn’t working properly?',
    a: 'First, check your internet connection and make sure you’re using the latest version of Dater. If the problem continues, try restarting the app or your device. If you’re still experiencing the issue, contact Dater Support and provide details such as what you were doing when the problem occurred and any error message you received.',
  },
  {
    q: 'Can I delete my Dater account?',
    a: 'Yes. You can permanently delete your Dater account through the account settings or Dater’s available account deletion process. Account deletion is different from pausing your account: pausing is temporary, while deletion is intended to permanently remove your account.',
  },
  {
    q: 'What happens to my information when I delete my account?',
    a: (
      <>
        Your information is handled according to Dater’s{' '}
        <Link to="/privacy-policy" className="text-accent-blue underline hover:opacity-80">
          Privacy Policy
        </Link>{' '}
        and applicable laws. Account deletion does not necessarily mean that every piece of information is immediately
        removed in every circumstance, as certain information may need to be retained for legal, security,
        fraud-prevention, dispute-resolution, or other legitimate purposes.
      </>
    ),
  },
  {
    q: 'Is my personal information shared with other users?',
    a: (
      <>
        Dater only displays information that is intended to be part of your dating profile or otherwise visible through
        the app. Private account information, such as your phone number, is not intended to be publicly displayed to
        other users. The information you choose to add to your profile may be visible to other users as part of the dating
        experience. For complete details about how personal information is handled, please refer to Dater’s{' '}
        <Link to="/privacy-policy" className="text-accent-blue underline hover:opacity-80">
          Privacy Policy
        </Link>
        .
      </>
    ),
  },
  {
    q: 'Should I share my personal or financial information with someone I meet on Dater?',
    a: 'No. Never share passwords, OTPs, bank account details, card information, financial credentials, or other sensitive information with another user. Be particularly cautious if someone asks you to send money, make a payment, invest, or provide financial information. Dater will never require you to share your account security information with another user.',
  },
  {
    q: 'Is it safe to meet someone from Dater in person?',
    a: 'Online dating always involves some level of risk, so take reasonable precautions before meeting someone in person. Get to know the person first, choose a public and familiar location, tell someone you trust about your plans, arrange your own transportation, and avoid sharing sensitive personal or financial information. Trust your instincts and leave if you feel uncomfortable.',
  },
  {
    q: 'What should I do if someone makes me uncomfortable?',
    a: 'You can stop communicating with the person, block their account, and report them to Dater. If the person’s behaviour involves threats, harassment, fraud, or other serious misconduct, provide as much relevant information as possible when reporting. If you believe you are in immediate danger, contact the appropriate local authorities.',
  },
  {
    q: 'What happens if someone violates Dater’s rules?',
    a: 'Dater may review reported activity and take appropriate action when a user violates the platform’s rules or policies. Depending on the circumstances, this may include removing content, restricting features, suspending an account, or permanently removing an account from Dater.',
  },
  {
    q: 'How can I contact Dater Support?',
    a: 'You can contact Dater through the support options available on the Dater website or within the app. When contacting support, include relevant details about your account and clearly explain the issue you’re experiencing. For technical problems, screenshots or error messages can also help the support team investigate the issue more efficiently.',
  },
]

export default function FAQs() {
  const [openItems, setOpenItems] = useState(() => new Set([0]))

  const toggleItem = (index) => {
    setOpenItems((current) => {
      const next = new Set(current)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  return (
    <main className="w-full">
      <PageHero title="FAQs" />

      <div data-header-surface="solid" data-header-bg="#ffffff" className="w-full">
        <div className="mt-8 px-8 text-left md:mt-16 md:text-center">
          <h2 className="font-google-sans-flex text-[23px] font-bold leading-[1.15] text-text-primary md:mx-auto md:text-[28px] md:leading-normal">
            Have questions about Dater?
          </h2>
          <p className="mt-1 max-w-lg font-google-sans-flex text-[15px] text-text-muted md:mx-auto md:mt-2">
            You can find all the answers you need right here!
          </p>
        </div>

        <div className="mx-auto max-w-4xl px-8 pb-12 pt-5 md:pb-24 md:pt-12">
        <div>
          {FAQS.map((item, i) => (
            <div key={i} className="border-b border-gray-200">
              <button
                type="button"
                onClick={() => toggleItem(i)}
                className={`flex w-full items-center justify-between text-left ${
                  openItems.has(i) ? 'py-3 pb-2 md:py-5' : 'py-3 md:py-4'
                }`}
              >
                <span className="font-google-sans-flex text-[16px] font-medium text-text-primary">
                  {item.q}
                </span>
                <span className="ml-4 shrink-0 font-google-sans-flex text-[32px] font-light leading-none text-text-muted">
                  {openItems.has(i) ? '−' : '+'}
                </span>
              </button>
              {openItems.has(i) && (
                <div className="pb-3 font-google-sans-flex text-[15px] text-text-muted md:pb-5">{item.a}</div>
              )}
            </div>
          ))}
        </div>

        <p className="mt-6 font-google-sans-flex text-[16px] text-text-muted md:mt-12">
          Need more help?{' '}
          <a href="/contact-us" className="text-[15px] font-semibold text-accent-blue underline md:text-[16px]">
            Contact us
          </a>
        </p>
        </div>
      </div>
    </main>
  )
}
