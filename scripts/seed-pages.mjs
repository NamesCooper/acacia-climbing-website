// One-off: the words from the old Vue pages, as Sanity page documents.
// Writes public/data/pages.json, which is (1) what got imported into Sanity and
// (2) the backup the site uses if Sanity can't be reached during a build.
// Run: node scripts/seed-pages.mjs
import { writeFileSync } from 'node:fs'

let n = 0
const key = () => `k${(n++).toString(36).padStart(4, '0')}`

// Rich text: plain strings, with **bold** bits
const blocks = (...paras) =>
  paras.map((p) => ({
    _type: 'block',
    _key: key(),
    style: 'normal',
    markDefs: [],
    children: p.split(/(\*\*[^*]+\*\*)/).filter(Boolean).map((t) => ({
      _type: 'span',
      _key: key(),
      text: t.replace(/\*\*/g, ''),
      marks: t.startsWith('**') ? ['strong'] : [],
    })),
  }))

const mailto = (subject) => `mailto:hello@acaciaclimbing.org?subject=${encodeURIComponent(subject)}`
const s = (type, fields) => ({ _type: type, _key: key(), ...fields })
const card = (fields) => ({ _type: 'card', _key: key(), ...fields })

const home = {
  _id: 'page-home',
  _type: 'page',
  title: 'Home',
  slug: { _type: 'slug', current: 'home' },
  copyStatus: 'draft',
  heading: 'Home',
  showHelpBand: true,
  seoDescription: "Climbers working with councils so Australia's bouldering spots get recognised, mapped and looked after. Starting in South East Queensland.",
  sections: [
    s('heroSection', {
      label: "A friendly bunch of climbers looking after Australia's crags",
      heading: 'Keep the\ncrags open',
      body: "We work with councils so bouldering spots get recognised, mapped and looked after. We're starting in South East Queensland, it's our first go at this, and we're doing it out in the open.",
      primaryLabel: 'See the crag map',
      primaryHref: '/progress',
      secondaryLabel: 'How you can help',
      secondaryHref: '/get-involved',
    }),
    s('marqueeSection', { items: ['Australian bouldering', 'starting in SEQ', 'climbers looking after crags', '5 crags and counting', "come say g'day"] }),
    s('tabsSection', {
      tabs: [
        { _type: 'tab', _key: key(), label: 'What', heading: 'What is ACC?', body: blocks('A bunch of climbers working to get outdoor bouldering **formally recognised by councils** around Australia, so crags stay open and get the good stuff: stairs, signs and proper tracks. In Queensland we work under ACAQ.') },
        { _type: 'tab', _key: key(), label: 'How', heading: 'How does it work?', body: blocks('Research the area, chat with council and rangers, map every boulder on **KAYA**, sort out access, then get it signed off. Documented crag, protected crag.') },
        { _type: 'tab', _key: key(), label: 'Where', heading: 'Where are we?', body: blocks("We're starting in South East Queensland with **Tooheys, White Rock, Plunketts, Cedar Creek and Passchendaele**. The long game is every state. Got a spot anywhere in Australia that needs some love? Tell us about it.") },
      ],
    }),
    s('cragRegisterSection', { heading: "Where it's at" }),
  ],
}

const about = {
  _id: 'page-about',
  _type: 'page',
  title: 'About',
  slug: { _type: 'slug', current: 'about' },
  copyStatus: 'draft',
  eyebrow: 'About us',
  heading: 'Climbers, for the long *haul*',
  lede: "Acacia Climbing Coalition is a small, volunteer-run crew working to get outdoor climbing recognised and looked after across Australia. We're starting in South East Queensland, and building it in the open.",
  showHelpBand: true,
  seoDescription: 'Who we are, why we started, and how we work with councils to get outdoor climbing recognised across Australia.',
  sections: [
    s('textSection', {
      heading: 'Why we started',
      body: blocks(
        "Most councils in Australia don't have a way to formally recognise outdoor climbing. That leaves crags with unclear access, no stairs or signs, and nobody speaking for climbers when decisions get made.",
        "At the same time, more people than ever are climbing in gyms and wanting to head outside, with very little to tell them where it's okay to go and how to look after it when they get there.",
      ),
      quote: '"Documented crag, protected crag."',
      quoteBody: "A crag that's mapped, written up and known to council is a lot easier to keep open. So that's what we do, one crag at a time, and we share every step along the way.",
      quoteTone: 'wattle',
    }),
    s('stepsSection', {
      label: 'Every crag goes through the same eight steps',
      heading: 'How we do it',
      steps: [
        'Research the area, its history and its climbing',
        'Reach out to guidebook authors and locals',
        'Talk with council and park rangers',
        'Agree a plan together',
        'Site visits: GPS, photos and mapping on KAYA',
        'Sort out any access issues',
        'Final council approvals',
        'Publish the guidebook on KAYA',
      ],
      linkLabel: 'See where each crag is up to',
      linkHref: '/progress',
      band: 'sandstone',
    }),
    s('cardsSection', {
      heading: "Where we're up to",
      columns: 2,
      titleStyle: 'grotesk',
      cards: [
        card({ kicker: 'Done', chipTone: 'moss', title: 'Tooheys Forest recognised', body: 'Brisbane City Council formally recognises bouldering at Tooheys, with new stairs and signage now in.' }),
        card({ kicker: 'Underway', chipTone: 'wattle', title: 'White Rock and Plunketts', body: 'Talking with Ipswich and Logan councils about formal access, with site visits and mapping underway.' }),
        card({ kicker: 'Underway', chipTone: 'wattle', title: 'Digital guidebooks', body: 'Documenting our crags on KAYA, so every crag is properly on the record.' }),
        card({ kicker: 'Next up', chipTone: 'paper', chipDashed: true, title: 'More of Australia', body: 'Cedar Creek and Passchendaele are just getting started. After SEQ, the plan is every state.' }),
      ],
    }),
    s('cardsSection', {
      columns: 2,
      titleStyle: 'grotesk',
      cards: [
        card({
          title: "Who's behind it",
          body: "Right now Acacia is a small volunteer crew, coordinated by Cooper, who is also the bouldering representative for ACAQ, Queensland's peak climbing access body. Everything here gets done in spare hours, with a lot of help from local climbers.",
          linkLabel: 'Come be part of it',
          linkHref: '/get-involved',
        }),
        card({
          tone: 'forest',
          title: 'Working with',
          items: [
            { _type: 'cardItem', _key: key(), title: 'ACAQ', body: "Queensland's peak climbing access body. Our Queensland work happens under their umbrella." },
            { _type: 'cardItem', _key: key(), title: 'KAYA', body: 'Where our digital guidebooks live, so climbers have accurate, up-to-date info.' },
            { _type: 'cardItem', _key: key(), title: 'Local councils', body: 'Brisbane, Ipswich, Logan, Moreton Bay and Southern Downs, so far.' },
          ],
        }),
      ],
    }),
    s('statementSection', {
      heading: 'We climb on Country',
      sprig: true,
      body: blocks(
        'The crags we document sit on the lands of many Aboriginal and Torres Strait Islander peoples, including the Turrbal, Jagera, Yugarapul, Jinibara and Kabi Kabi peoples in South East Queensland. We pay our respects to Elders past and present.',
        "We want consultation with Traditional Owners to be part of how every crag is documented, not an afterthought. We're still building those relationships, and we'll share how that's going as it happens.",
      ),
    }),
  ],
}

const getInvolved = {
  _id: 'page-get-involved',
  _type: 'page',
  title: 'Get involved',
  slug: { _type: 'slug', current: 'get-involved' },
  copyStatus: 'draft',
  eyebrow: 'Lend a hand',
  heading: 'Every bit *helps*',
  lede: "We're a small crew, so a bit of help goes a long way. Pick whatever suits you, flick us an email, and we'll take it from there.",
  showHelpBand: false,
  seoDescription: 'Volunteer, report a crag issue, help with council letters or chip in. Every bit helps keep Australian crags open.',
  sections: [
    s('cardsSection', {
      columns: 2,
      titleStyle: 'display',
      cards: [
        card({ anchor: 'volunteer', kicker: 'Volunteer', chipTone: 'lichen', halftone: true, title: 'Give an hour or two', body: 'Crag clean-ups, track work, site visits and mapping. Weekends mostly, and no experience needed beyond knowing your way around a crag.', linkLabel: "I'm keen to volunteer", linkHref: mailto('Keen to volunteer'), buttonColour: 'moss' }),
        card({ anchor: 'report', kicker: 'Report', chipTone: 'wattle', halftone: true, title: 'Be our eyes on the ground', body: "Closed tracks, new signs, damage, a gate that wasn't there last week. Tell us what you've seen, where and when, and we'll log it and follow it up.", linkLabel: 'Report a crag issue', linkHref: mailto('Crag report') }),
        card({ anchor: 'council', kicker: 'Speak up', chipTone: 'sandstone', halftone: true, title: 'Help with council letters', body: "When a council is deciding something, letters from local climbers really count. We'll let you know when it matters and help with what to say.", linkLabel: 'Count me in', linkHref: mailto('Keen to help with council letters') }),
        card({ anchor: 'donate', kicker: 'Donate', chipTone: 'paper', chipDashed: true, halftone: true, title: 'Chip in for the crags', body: "Donations go straight to signage, mapping and council submissions. We're not a registered charity yet, so it isn't tax-deductible for now.", linkLabel: "I'd like to donate", linkHref: mailto('Donating to Acacia') }),
      ],
    }),
    s('ctaSection', {
      label: 'Not in South East Queensland?',
      heading: 'We want to hear from climbers everywhere',
      body: "We're starting in SEQ, but the goal is every state. If there's a crag near you with access worries, or you're already looking after one, tell us about it. It all helps shape where we go next.",
      buttonLabel: 'Tell us about your local',
      buttonHref: mailto('Climbing near me'),
      tone: 'sandstone',
    }),
  ],
}

const privacy = {
  _id: 'page-privacy',
  _type: 'page',
  title: 'Privacy and terms',
  slug: { _type: 'slug', current: 'privacy' },
  copyStatus: 'draft',
  eyebrow: 'The fine print',
  heading: 'Privacy and *terms*',
  lede: 'The short, plain-English version of how this site works and what we do with anything you send us.',
  showHelpBand: false,
  seoDescription: 'How Acacia Climbing Coalition handles your information, and the terms for using this site.',
  sections: [
    s('proseSection', {
      footnote: 'Acacia Climbing Pty Ltd · ABN 38 237 542 815 · Questions? hello@acaciaclimbing.org',
      blocks: [
        { _type: 'prosePart', _key: key(), title: 'Who we are', body: blocks('This site is run by Acacia Climbing Pty Ltd (ABN 38 237 542 815), trading as Acacia Climbing Coalition, based in Queensland, Australia.') },
        { _type: 'prosePart', _key: key(), title: 'What we collect', body: blocks("We don't have accounts, forms or newsletters on this site. If you email us, we receive your name, email address and whatever you choose to tell us.", 'Our host, Cloudflare, keeps basic technical logs (like IP addresses) to keep the site running and secure.') },
        { _type: 'prosePart', _key: key(), title: 'How we use it', body: blocks("We only use what you send us to reply to you, coordinate volunteering, and follow up crag reports. We don't sell or share your details, and we'll delete them if you ask.", 'We handle personal information in line with the Australian Privacy Principles. Email hello@acaciaclimbing.org with any questions or requests.') },
        { _type: 'prosePart', _key: key(), title: 'Climbing info on this site', body: blocks('Access status and crag details here are general information, not permission to climb. Access can change, so always check signage, local rules and any closures before you visit.', "Climbing is risky. You're responsible for your own safety and for respecting the land, other users and Traditional Owners.") },
        { _type: 'prosePart', _key: key(), title: 'Using our content', body: blocks("You're welcome to share and link to anything here with credit to Acacia Climbing Coalition. Detailed guidebook information lives on KAYA under their terms.") },
      ],
    }),
  ],
}

const pages = [home, about, getInvolved, privacy]
writeFileSync(new URL('../public/data/pages.json', import.meta.url), JSON.stringify(pages, null, 2) + '\n')
console.log(`Wrote ${pages.length} pages`)
