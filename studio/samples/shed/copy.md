# Shed fixed copy

This invented product’s fixed language belongs here, including document titles, accessible names, fixed image alternatives and outbound messages. Fixtures hold typed values and user-authored content; placeholders join them to these strings. Reach is authored from the model’s actual states and setups, not from somewhere a string might eventually appear.

| Key | Copy | Shown when |
|---|---|---|
| home.title | Find a tool for the weekend | home |
| home.documentTitle | Home · Shed | home |
| home.aria.navigation | Main navigation | home |
| home.aria.main | Main content | home |
| home.alt.productMark | Shed mark | home |
| home.start | Browse nearby tools | home |
| home.upcoming | Your next pickup | home · Ready; home · Account menu open; home · Loading; home · Long content |
| home.priceUnit | ${fee} a day | home |
| home.viewRental | View rental | home · Ready; home · Account menu open; home · Loading; home · Long content |
| home.firstVisit | Rent a tool from a neighbor, by the day. | home · First visit |
| home.account.open | Open account menu | home |
| home.account.settings | Settings | home · Account menu open |
| home.account.signOut | Sign out | home · Account menu open |
| home.account.close | Close account menu | home · Account menu open |
| nav.home | Home | home; catalog; toolDetail; checkout; receipt; rentals; thread; settings; lendTool |
| nav.catalog | Tools | home; catalog; toolDetail; checkout; receipt; rentals; thread; settings; lendTool |
| nav.rentals | Rentals | home; catalog; toolDetail; checkout; receipt; rentals; thread; settings; lendTool |
| nav.thread | Messages | home; catalog; toolDetail; checkout; receipt; rentals; thread; settings; lendTool |
| nav.settings | Settings | home; catalog; toolDetail; checkout; receipt; rentals; thread; settings; lendTool |
| catalog.title | Tools near you | catalog |
| catalog.documentTitle | Tools near you · Shed | catalog |
| catalog.aria.navigation | Main navigation | catalog |
| catalog.aria.main | Main content | catalog |
| catalog.alt.productMark | Shed mark | catalog |
| catalog.priceUnit | ${fee} a day | catalog · Populated; catalog · Filters open; catalog · Loading; catalog · Long content |
| catalog.availability.available | Available | catalog · Populated; catalog · Filters open; catalog · Loading; catalog · Long content |
| catalog.availability.rented | Already rented | catalog · Populated; catalog · Filters open; catalog · Loading |
| catalog.availability.away | Lender away | catalog · Populated; catalog · Filters open; catalog · Loading |
| catalog.inspect | View tool | catalog · Populated; catalog · Filters open; catalog · Loading; catalog · Long content |
| catalog.queryLabel | Search tools | catalog |
| catalog.search.placeholder | Drill, ladder or pressure washer | catalog |
| catalog.filter.distance | Distance | catalog · Filters open |
| catalog.filter.availability | Available Saturday | catalog · Filters open |
| catalog.filter.open | Filters | catalog |
| catalog.filter.apply | Apply filters | catalog · Filters open |
| catalog.filter.close | Close filters | catalog · Filters open |
| catalog.filter.clear | Clear filters | catalog · No matches; catalog · Filters open |
| catalog.empty.noMatches.title | No tools match these filters | catalog · No matches |
| catalog.empty.noMatches.body | Try a wider distance or remove the Saturday availability filter. | catalog · No matches |
| catalog.empty.noMatches.action | Clear filters | catalog · No matches |
| catalog.empty.noTools.title | No tools nearby yet | catalog · No tools |
| catalog.empty.noTools.body | Search a wider area to find a neighbor with the tool you need. | catalog · No tools |
| catalog.empty.noTools.action | Widen the search | catalog · No tools |
| catalog.recovery.title | Tools could not be loaded | catalog · Failed |
| catalog.recovery.body | Your search is still here. Try loading it again. | catalog · Failed |
| catalog.recovery.retry | Try again | catalog · Failed |
| toolDetail.title | Tool details | toolDetail |
| toolDetail.documentTitle | Tool details · Shed | toolDetail |
| toolDetail.aria.navigation | Main navigation | toolDetail |
| toolDetail.aria.main | Main content | toolDetail |
| toolDetail.alt.productMark | Shed mark | toolDetail |
| toolDetail.priceUnit | ${fee} a day | toolDetail · Available; toolDetail · Tool notes open; toolDetail · Request pending; toolDetail · Request sent; toolDetail · Request toast shown; toolDetail · Request failed; toolDetail · Long content |
| toolDetail.lender | Lent by {lenderName} | toolDetail |
| toolDetail.pickup.label | Pickup date | toolDetail · Available; toolDetail · Tool notes open; toolDetail · Request pending; toolDetail · Request sent; toolDetail · Request toast shown; toolDetail · Request failed; toolDetail · Long content |
| toolDetail.return.label | Return date | toolDetail · Available; toolDetail · Tool notes open; toolDetail · Request pending; toolDetail · Request sent; toolDetail · Request toast shown; toolDetail · Request failed; toolDetail · Long content |
| toolDetail.request | Request rental | toolDetail · Available; toolDetail · Tool notes open; toolDetail · Long content |
| toolDetail.backToResults | Back to nearby tools | toolDetail |
| toolDetail.message | Message lender | toolDetail · Request sent; toolDetail · Request toast shown |
| toolDetail.unavailable | This tool is already rented. | toolDetail · Unavailable |
| toolDetail.away | This lender is away. | toolDetail · Lender away |
| toolDetail.findAlternative | Find another tool | toolDetail · Unavailable; toolDetail · Lender away |
| toolDetail.summary | Tool care and pickup notes | toolDetail |
| toolDetail.facts.safety | Bring the protective equipment required for your project. Ask the lender about unfamiliar controls before using the tool. | toolDetail · Tool notes open |
| toolDetail.facts.close | Hide tool notes | toolDetail · Tool notes open |
| toolDetail.outcome.pending | Sending your rental request… | toolDetail · Request pending |
| toolDetail.outcome.sent | Request sent. The lender still needs to approve it. | toolDetail · Request sent; toolDetail · Request toast shown |
| toolDetail.outcome.view | View request | toolDetail · Request sent; toolDetail · Request toast shown |
| toolDetail.outcome.failed | Your request was not sent. Your dates are still here. | toolDetail · Request failed |
| toolDetail.outcome.retry | Send request again | toolDetail · Request failed |
| toolDetail.outcome.toast | Your request is saved. | toolDetail · Request toast shown |
| toolDetail.outcome.dismiss | Dismiss notification | toolDetail · Request toast shown |
| toolDetail.status | Sending request… | toolDetail · Request pending |
| checkout.title | Review and pay | checkout |
| checkout.documentTitle | Review and pay · Shed | checkout |
| checkout.aria.navigation | Main navigation | checkout |
| checkout.aria.main | Main content | checkout |
| checkout.alt.productMark | Shed mark | checkout |
| checkout.total | Total: ${total} | checkout |
| checkout.priceUnit | ${fee} a day | checkout |
| checkout.payAmount | Pay ${total} with the provider | checkout · Ready; checkout · Long content |
| checkout.paymentBoundary | Payment details are entered with the hosted provider, not in Shed. | checkout |
| checkout.cancel | Back to rental | checkout |
| checkout.pending | Opening secure payment… | checkout · Handoff pending |
| checkout.declined | Payment was declined. You were not charged. | checkout · Declined |
| checkout.retry | Try payment again | checkout · Declined; checkout · Returned without paying |
| checkout.unknown | We are checking whether the payment completed. Do not pay again yet. | checkout · Unknown result |
| checkout.reconcile | Check payment status | checkout · Unknown result |
| checkout.returned | Payment was not completed. Your rental is still here. | checkout · Returned without paying |
| checkout.status | Checking payment status… | checkout · Unknown result |
| receipt.title | Rental receipt | receipt |
| receipt.documentTitle | Rental receipt · Shed | receipt |
| receipt.aria.navigation | Main navigation | receipt |
| receipt.aria.main | Main content | receipt |
| receipt.alt.productMark | Shed mark | receipt |
| receipt.delivery.pending | Your confirmation email is still being sent. This receipt is saved. | receipt · Email pending |
| receipt.outcome | Payment complete | receipt |
| receipt.reference | Rental {reference} | receipt |
| receipt.nextSteps | Message {lenderName} to confirm pickup arrangements. Return the tool by {returnDate}. | receipt |
| receipt.pickup | Pickup: {pickupDate} | receipt |
| receipt.return | Return by: {returnDate} | receipt |
| receipt.record.open | Open this rental | receipt |
| receipt.record.save | Save receipt | receipt |
| receipt.support | Questions about pickup? Message the lender. | receipt |
| receipt.support.action | Message lender | receipt |
| rentals.title | Rentals | rentals |
| rentals.documentTitle | Rentals · Shed | rentals |
| rentals.aria.navigation | Main navigation | rentals |
| rentals.aria.main | Main content | rentals |
| rentals.alt.productMark | Shed mark | rentals |
| rentals.pickup | Pickup {pickupDate} | rentals · Upcoming and active; rentals · Cancel rental confirmation; rentals · Cancellation pending; rentals · Cancelled; rentals · Cancellation failed; rentals · Long content; rentals · Rental history |
| rentals.return | Return by {returnDate} | rentals · Upcoming and active; rentals · Cancel rental confirmation; rentals · Cancellation pending; rentals · Cancelled; rentals · Cancellation failed; rentals · Long content; rentals · Rental history |
| rentals.message | Message lender | rentals · Upcoming and active; rentals · Cancel rental confirmation; rentals · Cancellation pending; rentals · Cancelled; rentals · Cancellation failed; rentals · Long content; rentals · Rental history |
| rentals.trigger | Cancel rental | rentals · Upcoming and active; rentals · Cancel rental confirmation; rentals · Cancellation failed; rentals · Long content; rentals · Rental history |
| rentals.status.pending | Pending approval | rentals · Rental history |
| rentals.status.approved | Approved | home · Ready; home · Account menu open; home · Loading; home · Long content; rentals · Upcoming and active; rentals · Cancel rental confirmation; rentals · Cancellation pending; rentals · Cancellation failed; rentals · Long content; rentals · Rental history |
| rentals.status.active | Active | home · Ready; home · Account menu open; home · Loading; rentals · Upcoming and active; rentals · Cancel rental confirmation; rentals · Rental history |
| rentals.status.returned | Returned | rentals · Rental history |
| rentals.status.cancelled | Cancelled | rentals · Cancelled; rentals · Rental history |
| rentals.empty.title | No rentals yet | rentals · Empty |
| rentals.empty.body | Find a nearby tool for your next project. | rentals · Empty |
| rentals.empty.action | Browse tools | rentals · Empty |
| rentals.recovery.title | Rentals could not be loaded | rentals · Failed |
| rentals.recovery.retry | Try again | rentals · Failed |
| rentals.confirmation.title | Cancel rental of {toolName}? | rentals · Cancel rental confirmation |
| rentals.confirmation.impact | The lender is notified at once. You cannot undo this cancellation. | rentals · Cancel rental confirmation |
| rentals.confirmation.confirm | Cancel rental | rentals · Cancel rental confirmation |
| rentals.confirmation.close | Keep rental | rentals · Cancel rental confirmation |
| rentals.outcome.pending | Cancelling rental… | rentals · Cancellation pending |
| rentals.outcome.cancelled | Rental cancelled. The lender has been notified. | rentals · Cancelled |
| rentals.outcome.failed | The rental was not cancelled. Try again or message the lender. | rentals · Cancellation failed |
| thread.title | Messages | thread |
| thread.documentTitle | Messages · Shed | thread |
| thread.aria.navigation | Main navigation | thread |
| thread.aria.main | Main content | thread |
| thread.alt.productMark | Shed mark | thread |
| thread.composer.label | Message to the lender | thread |
| thread.composer.placeholder | Ask about pickup or the tool | thread |
| thread.send | Send | thread |
| thread.aria.messages | Rental conversation | thread |
| thread.pending | Sending message… | thread · Sending |
| thread.recovery | Your message was not sent. Your draft is still here. | thread · Failed |
| thread.retry | Send again | thread · Failed |
| thread.empty | No messages yet. Send the lender a question about this rental. | thread · Empty |
| settings.title | Settings | settings |
| settings.documentTitle | Settings · Shed | settings |
| settings.aria.navigation | Main navigation | settings |
| settings.aria.main | Main content | settings |
| settings.alt.productMark | Shed mark | settings |
| settings.save | Save preferences | settings |
| settings.cancel | Cancel | settings |
| settings.status.saving | Saving preferences… | settings · Saving |
| settings.status.saved | Preferences saved. | settings · Saved |
| settings.recovery | Preferences were not saved. Your changes are still here. | settings · Failed |
| settings.section.rentals | Rentals | settings |
| settings.section.notifications | Notifications | settings |
| settings.searchDistance | Search distance | settings |
| settings.distance.near | Within 2 miles | settings |
| settings.distance.wide | Within 5 miles | settings |
| settings.pickupWindow | Preferred pickup window | settings |
| settings.pickup.morning | Morning | settings |
| settings.pickup.afternoon | Afternoon | settings |
| settings.rememberArea | Remember my search area | settings |
| settings.emailConfirmation | Email rental confirmations | settings |
| settings.pushApproval | Push request approvals | settings |
| settings.pushReturn | Remind me before a tool is due back | settings |
| signIn.title | Sign in | signIn |
| signIn.documentTitle | Sign in · Shed | signIn |
| signIn.aria.main | Main content | signIn |
| signIn.alt.productMark | Shed mark | signIn |
| signIn.email.label | Email address | signIn · Address entry; signIn · Email address invalid; signIn · Sending code; signIn · Code delivery failed |
| signIn.email.placeholder | Email address | signIn · Address entry; signIn · Email address invalid; signIn · Sending code; signIn · Code delivery failed |
| signIn.continue | Send sign-in code | signIn · Address entry; signIn · Email address invalid; signIn · Code delivery failed |
| signIn.start | Continue to Shed | signIn · Signed in |
| signIn.code.label | Sign-in code | signIn · Code sent; signIn · Verifying; signIn · Expired; signIn · Failed |
| signIn.verify | Verify code | signIn · Code sent; signIn · Failed |
| signIn.code.sent | Check your email for a sign-in code. | signIn · Code sent |
| signIn.status | Verifying code… | signIn · Verifying |
| signIn.expired | That code has expired. Request a new one. | signIn · Expired |
| signIn.recover | Send a new code | signIn · Code sent; signIn · Expired; signIn · Failed; signIn · Code delivery failed |
| signIn.changeAddress | Use another email address | signIn · Code sent; signIn · Expired; signIn · Failed; signIn · Code delivery failed |
| signIn.exit | Back to browsing | signIn |
| signIn.failed | We could not verify that code. Your rental has not changed. | signIn · Failed |
| signIn.email.invalid | Enter an email address in the usual format. | signIn · Email address invalid |
| notFound.title | Page not found | notFound |
| notFound.documentTitle | Page not found · Shed | notFound |
| notFound.aria.main | Main content | notFound |
| notFound.alt.productMark | Shed mark | notFound |
| notFound.explanation | We cannot find a tool or rental at this address. | notFound |
| notFound.browse | Browse nearby tools | notFound |
| notFound.rentals | Open your rentals | notFound |
| notFound.dataStatus | This page does not change your rentals or payments. | notFound |
| emailRentalConfirmed.subject | Your rental of {toolName} is confirmed | emailRentalConfirmed |
| emailRentalConfirmed.body | Rental {reference} is paid. Pickup is {pickupDate}; return the tool by {returnDate}. Message {lenderName} in Shed to arrange pickup. | emailRentalConfirmed |
| emailRentalConfirmed.action | Open in Shed | emailRentalConfirmed |
| emailRentalConfirmed.preheader | Pickup and return details for your rental | emailRentalConfirmed |
| emailRentalConfirmed.footer | You received this service message because you rented a tool with Shed. | emailRentalConfirmed |
| emailRentalConfirmed.alt.mark | Shed mark | emailRentalConfirmed |
| emailRentalConfirmed.linkTitle | Open the saved rental receipt | emailRentalConfirmed |
| pushRequestApproved.body | {lenderName} approved {toolName}. Open the rental to review the dates and pay before pickup. | pushRequestApproved |
| pushRequestApproved.action | Review rental | pushRequestApproved |
| pushRequestApproved.title | Rental approved | pushRequestApproved |
| pushRequestApproved.aria.action | Open the approved rental request | pushRequestApproved |
| lendTool.title | Lend a tool | lendTool |
| lendTool.documentTitle | Lend a tool · Shed | lendTool |
| lendTool.aria.navigation | Main navigation | lendTool |
| lendTool.aria.main | Main content | lendTool |
| lendTool.alt.productMark | Shed mark | lendTool |
| lendTool.name.label | Tool name | lendTool |
| lendTool.description.label | Care and safety notes | lendTool |
| lendTool.fee.label | Daily fee in USD | lendTool |
| lendTool.availability.label | Availability | lendTool |
| lendTool.save | Save tool | lendTool |
| lendTool.cancel | Cancel | lendTool |
| lendTool.status | Saving tool… | lendTool · Saving |
| home.returnDue | Return by {returnDate} | home · Ready; home · Account menu open; home · Loading; home · Long content |
| catalog.distance | {distanceMiles} miles away | catalog · Populated; catalog · Filters open; catalog · Loading; catalog · Long content |
| checkout.duration | {rentalDays} rental days | checkout |
| receipt.total | Paid: ${total} | receipt |
| thread.timestamp | Sent {sentAt} | thread · Populated; thread · Sending; thread · Message sent; thread · Failed; thread · Long content |
| thread.sent | Message sent. | thread · Message sent |
| signIn.verified | You are signed in. Continue to the rental you opened. | signIn · Signed in |
| signIn.code.sending | Requesting your sign-in code… | signIn · Sending code |
| signIn.delivery.failed | The sign-in code could not be requested. Your email address and rental destination are still here. | signIn · Code delivery failed |
| lendTool.saved | {name} is saved at ${fee} a day. | lendTool · Saved |
| lendTool.recovery | Your tool was not saved. The name, daily fee and care notes are still here; save again when you are ready. | lendTool · Failed |
| lendTool.open | View saved tool | lendTool · Saved |
| lendTool.photo.label | Tool photo | lendTool |
| lendTool.photoAlt.label | Describe the tool photo | lendTool |
