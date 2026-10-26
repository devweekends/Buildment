01.02-start-from-the-problem#1 | B | high | Asking about past behavior yields reliable facts over hypothetical future use.
01.02-start-from-the-problem#2 | A | high | Ask about the last real occurrence to uncover the underlying problem behind a feature request.
01.02-start-from-the-problem#3 | C | high | All three stories show members struggling to find the next match's time and pitch in one place.
01.03-the-job-people-hire-it-for#1 | A | high | Giving two competing sections equal weight forces the user to figure out which part applies to them.
01.03-the-job-people-hire-it-for#2 | D | high | Follows the "When... I want to... so that..." job-to-be-done structure.
01.03-the-job-people-hire-it-for#3 | B | high | Prioritizes Ghadeer's urgent morning coffee pickup job on the home screen.
01.04-fit-the-scope-to-the-time#1 | A | high | Nice-to-have items are built last and only if time remains.
01.04-fit-the-scope-to-the-time#2 | C | high | Product page and checkout fulfill the core job within the 10-hour budget (9 hours total).
01.04-fit-the-scope-to-the-time#3 | A | high | Clear refusal for now, existing workaround, and what takes priority first.
01.05-know-if-it-worked#1 | B | high | The conversion rate dropped from 50% (5/10) to 8% (8/100).
01.05-know-if-it-worked#2 | B | high | Task completion rate and time on first try directly measure whether the booking flow works.
01.05-know-if-it-worked#3 | D | high | Three of four failing at the first screen points to a clear usability issue to fix and retest.
01.07-quiz#1 | C | high | Solves the actual problem (finding start time and changes) within the 3-hour budget and verifies it.
01.07-quiz#2 | A | high | Relies on demographics and hypothetical survey questions rather than actual past moments of struggle.
01.07-quiz#3 | D | high | Directly addresses checking last-minute match time and pitch changes on the way.
01.07-quiz#4 | B | high | Covers the core job (form + confirmation) plus the usability check in 7 hours (under the 8-hour limit).
01.07-quiz#5 | C | high | Conversion rate dropped from 50% to 15%, warranting observation of users trying to book.
02.02-one-thing-first#1 | B | high | When all lines have equal size and weight, nothing stands out in a squint test.
02.02-one-thing-first#2 | B | high | Make the primary action ('Order now') filled and visually dominant while quieting secondary actions.
02.03-type-that-reads-on-a-phone#1 | A | high | A line height around 1.5 makes body text much easier to track across lines than 1.0.
02.03-type-that-reads-on-a-phone#2 | C | high | Containers must expand with scaled text (200%) so controls like Register are not clipped.
02.04-space-does-the-grouping#1 | A | high | Space between groups must be larger than space inside groups to create visual grouping.
02.04-space-does-the-grouping#2 | A | high | Making internal spacing (4) smaller than external spacing (12) clearly separates each product group.
02.05-colour-with-a-job#1 | B | high | #777777 on white is ~4.48:1, just below the 4.5:1 WCAG AA requirement for normal text.
02.05-colour-with-a-job#2 | D | high | Contrast is measured against the actual background (#F3F4F6 gives 4.13:1, below 4.5:1).
02.05-colour-with-a-job#3 | B | high | Adding text labels ('Open'/'Closed') ensures status is not conveyed by colour alone.
02.07-quiz#1 | C | high | Filling the primary action button and unbolding the hours establishes clear hierarchy without adding text sizes.
02.07-quiz#2 | A | high | 140 characters per line is too wide; constraining line width to 45 to 90 characters improves readability.
02.07-quiz#3 | D | high | 8 inside and 24 between uses multiples of the 8-unit step and clearly separates groups.
02.07-quiz#4 | B | high | #777777 on white is 4.48:1, failing the 4.5:1 AA threshold for 15 px regular text.
02.07-quiz#5 | C | high | The 13 px hint needs 4.5:1 (at 3.54:1 it fails), whereas the 24 px bold heading is large text (needs 3:1).
03.02-empty-loading-error#1 | A | high | Waits under ~1 second do not need a loading indicator; showing one causes a distracting flash.
03.02-empty-loading-error#2 | B | high | Never show an empty state while data is still loading; show a loading state until the request resolves.
03.02-empty-loading-error#3 | D | high | For waits over 10 seconds, show progress or an estimate of how long the wait will take.
03.03-forms-people-finish#1 | B | high | Validate when the user leaves the field (on blur), not while they are still typing a valid prefix.
03.03-forms-people-finish#2 | A | high | Placeholders disappear on input; persistent visible labels above each field prevent memory burden.
03.03-forms-people-finish#3 | C | high | Validate on field exit to avoid premature errors, and clear the error once fixed.
03.04-everyone-can-use-it#1 | A | high | Decorative dividers should have empty alt text or be hidden so screen readers skip them.
03.04-everyone-can-use-it#2 | D | high | 20px with 1px gap fails the 24x24 CSS px AA minimum, and touch targets should ideally be 44 to 48px.
03.04-everyone-can-use-it#3 | B | high | Informative images need full text alternatives (menu items and prices); decorative images get empty alt.
03.05-motion-with-a-reason#1 | B | high | Reduced motion removes movement, not feedback; confirm the action clearly with words/state change.
03.05-motion-with-a-reason#2 | C | high | Auto-scrolling content lasting over 5 seconds alongside other content requires pause/stop/hide (WCAG 2.2.2 Level A).
03.05-motion-with-a-reason#3 | A | high | Keep the confirmation feedback ('You joined' and tick) in place without the sliding motion.
03.06-the-first-run#1 | A | high | Users typically skip multi-step upfront tours or forget them before acting.
03.06-the-first-run#2 | B | high | Let users start directly on the core task (tutors and Book button) with contextual guidance.
03.06-the-first-run#3 | D | high | Treat activation metrics from other apps as a hypothesis/goal to track and validate with your own users.
03.08-quiz#1 | C | high | Showing 'No bookings today' at 3 seconds while data is still loading is a false empty state.
03.08-quiz#2 | A | high | Form B combines visible labels, validation on blur, and preserving user input on error.
03.08-quiz#3 | D | high | 30x30px meets WCAG 2.2 AA (24x24px minimum), but 44 to 48px is recommended for comfortable thumb tapping.
03.08-quiz#4 | B | high | Perpetual pulsing is distracting without purpose, and respecting reduced motion is essential to test.
03.08-quiz#5 | C | high | Replace the dead-end empty state with an explanation and a direct call to action ('Add your first expense').
04.02-four-levels#1 | B | high | Functional usability and accessibility checks come before superficial visual polish on the quality scale.
04.02-four-levels#2 | C | high | Meets accessibility and state standards (Good), but lacks visual hierarchy, user testing, and a specific point of view.
04.02-four-levels#3 | B | high | Task completion evidence (5/5 vs 3/5) shows Screen 2 performs better while Screen 1 obscures the Pay action.
