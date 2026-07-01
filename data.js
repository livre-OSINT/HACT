/* ============================================================================
   HACT — Human Adversarial Cognitive Tactics
   Dataset derived from the book "HACT — Lutter contre l'ingénierie sociale"
   by Aurélien T. (Version 2, July 2026). Educational / defensive use.

   HACT is an independent conceptual adaptation inspired by the structure of
   MITRE ATT&CK(R). It is NOT affiliated with, endorsed by, or sponsored by
   The MITRE Corporation. MITRE ATT&CK(R) is a registered trademark of
   The MITRE Corporation.
   ==========================================================================*/

const HACT_META = {
  name: "HACT",
  longName: "Human Adversarial Cognitive Tactics",
  version: "v2 — July 2026",
  author: "Aurélien T.",
  tagline: "The adversarial knowledge base for social engineering & human intelligence (HUMINT) operations."
};

/* The 13 HACT tactics, ordered as columns of the matrix (attack lifecycle). */
const TACTICS = [
  {
    id: "TA-H001",
    name: "Target Intelligence",
    attack: "TA0043 Reconnaissance",
    objective: "Collect enough information to identify the target's exploitable vulnerabilities before any contact.",
    severity: "HIGH", detection: "4/5", frequency: "Very common",
    ioh: [
      "Sudden increase in views on your LinkedIn profile.",
      "Unusual third-party queries about your contact details.",
      "Repeated presence of the same unknown person in your suggestions.",
      "Reports of a recurring stranger around your usual locations."
    ],
    countermeasures: [
      "Audit your digital footprint.",
      "Tighten profile privacy settings.",
      "Restrict publicly available biographical information."
    ],
    techniques: [
      { id: "TH-1001", name: "Passive OSINT Profiling", desc: "Analysis of public history, social networks, publications, patents and professional affiliations." },
      { id: "TH-1002", name: "Pattern of Life Analysis", desc: "Establishing habits, routines and behavioral predictabilities." },
      { id: "TH-1003", name: "Psychological Vulnerability Assessment", desc: "MICE profiling (Money, Ideology, Coercion, Ego) and mapping of cognitive biases. The MICE profile is the main deliverable of this technique and directly drives the choice of exploitation techniques in TA-H006." },
      { id: "TH-1004", name: "Network Mapping", desc: "Identification of first- and second-degree connections and gatekeepers." },
      { id: "TH-1005", name: "Technical Surveillance", desc: "Physical observation and analysis of communication metadata; also used to harvest public audio/video samples for voice/deepfake cloning." }
    ]
  },
  {
    id: "TA-H002",
    name: "Operational Preparation",
    attack: "TA0042 Resource Development",
    objective: "The attacker prepares resources before contact: cover identities, pretexts, infrastructure. The least detectable phase — it happens entirely at a distance.",
    severity: "HIGH", detection: "5/5", frequency: "Common (invisible)",
    ioh: [
      "Recently created profile with a dense professional history predating the account (retroactive construction).",
      "Shared connections cannot actually vouch for the person.",
      "Cover organizations (fake NGO, think tank, media) that cannot be independently verified."
    ],
    countermeasures: [
      "Systematic verification of new contacts.",
      "Check temporal consistency of profiles.",
      "Independently validate references."
    ],
    techniques: [
      { id: "TH-2001", name: "Legend Construction", desc: "Creation of cover identities (shallow for one-off contact, deep for long operations)." },
      { id: "TH-2002", name: "Cover Organization", desc: "Fictitious NGO, think tank or media used as a cover." },
      { id: "TH-2003", name: "Infrastructure Acquisition", desc: "Burner phones, secure emails, cover bank accounts." },
      { id: "TH-2004", name: "Pretext Script Development", desc: "Detailed conversational scripts (call transcripts, template emails, prepared answers to predictable objections) that let the operator hold the cover under pressure, including responses to the target's verification attempts." },
      { id: "TH-2005", name: "Sock Puppet Ecosystem", desc: "A network of fake profiles that validate the main operator's identity." },
      { id: "TH-2006", name: "AI Voice Cloning", desc: "Real-time voice cloning for phone calls. Emerging technique (FBI advisory, 2024). A voice can now be cloned from ~3 seconds of audio for under €10/month.", ai: true }
    ]
  },
  {
    id: "TA-H003",
    name: "Initial Contact",
    attack: "TA0001 Initial Access",
    objective: "As in cybersecurity, most operations succeed or fail at this phase. The initial access vector determines everything.",
    severity: "HIGH", detection: "3/5", frequency: "Very common",
    ioh: [
      "Unsolicited contact with an unusual request.",
      "Recent profile with no consistent history or established connections.",
      "Collaboration offer that is too attractive and too fast.",
      "Reference to common acquaintances that cannot be verified.",
      "Request to meet outside the usual channels."
    ],
    countermeasures: [
      "Train people to detect unsolicited approaches.",
      "Establish a protocol for reporting unexplained contacts."
    ],
    techniques: [
      { id: "TH-3001", name: "Cold Approach", desc: "Conference/event, engineered coincidence, direct digital outreach." },
      { id: "TH-3002", name: "Warm Introduction", desc: "Exploiting a known intermediary, name-dropping, referral chain." },
      { id: "TH-3003", name: "Digital Approach", desc: "LinkedIn targeting, professional flattery, collaboration pretext." },
      { id: "TH-3004", name: "Honey Trap", desc: "Romantic or affective approach as an extraction vector." },
      { id: "TH-3005", name: "Authority Exploitation", desc: "Hierarchical impersonation, expert authority, institutional leverage. (Used in the 2023 MGM Resorts helpdesk attack — a 10-minute call, ~$100M loss.)" },
      { id: "TH-3006", name: "AI Deepfake Approach", desc: "Video calls with AI-generated avatars. Documented case: Hong Kong 2024, $25M (Arup).", ai: true }
    ]
  },
  {
    id: "TA-H004",
    name: "Legend & Cover Maintenance",
    attack: "TA0005 Defense Evasion",
    objective: "The attacker maintains cover credibility throughout the operation, detecting and neutralizing the target's verification attempts.",
    severity: "HIGH", detection: "4/5", frequency: "Common",
    ioh: [
      "Preventive disclosures that pre-empt likely verification questions.",
      "A story that stays suspiciously consistent across every channel and over time.",
      "A preparatory message (e.g. demanding confidentiality) sent before a key interaction."
    ],
    countermeasures: [
      "Cross-check across several independent channels.",
      "Look for narrative consistency over time."
    ],
    techniques: [
      { id: "TH-4001", name: "Consistency Management", desc: "Narrative consistency over time and across all channels." },
      { id: "TH-4002", name: "Verification Neutralization", desc: "Anticipating verification questions; preventive disclosures." },
      { id: "TH-4003", name: "Counter-Surveillance", desc: "Detecting surveillance carried out by the target or their organization." }
    ]
  },
  {
    id: "TA-H005",
    name: "Rapport Engineering",
    attack: "TA0003 Persistence",
    objective: "The goal is not to keep access to a system, but to preserve influence over — or proximity to — the target over time.",
    severity: "HIGH", detection: "4/5", frequency: "Very common",
    ioh: [
      "A relationship escalating very quickly toward trust and intimacy.",
      "Progressive migration to more private channels (LinkedIn → WhatsApp → Signal).",
      "Emotional mirroring that feels natural but slightly too calibrated.",
      "A tribal / 'you and me against the others' framing."
    ],
    countermeasures: [
      "Avoid imposed migrations to private channels.",
      "Keep a third party informed of suspicious relationships."
    ],
    techniques: [
      { id: "TH-5001", name: "Multi-channel Communication", desc: "Progressive migration to more private channels (LinkedIn → WhatsApp → Signal)." },
      { id: "TH-5002", name: "Routine Harvesting", desc: "Learning the target's habits and moments of vulnerability." },
      { id: "TH-5003", name: "Emotional Mirroring", desc: "Affective synchronization to reinforce attachment." },
      { id: "TH-5004", name: "Identity Bonding", desc: "Creating a tribal or ideological bond ('you and me against the others')." }
    ]
  },
  {
    id: "TA-H006",
    name: "Psychological Exploitation",
    attack: "TA0002 Execution",
    objective: "The attacker activates the human vulnerabilities identified during Target Intelligence. This is the core of the attack.",
    severity: "HIGH", detection: "2/5", frequency: "Very common",
    ioh: [
      "Artificial urgency or unjustified time pressure.",
      "A request that suddenly accelerates in pace and tone to force a rushed decision.",
      "A fabricated story designed to lower defenses."
    ],
    countermeasures: [
      "Apply a 'cooling-off' rule before any urgent reply.",
      "Double-check via an independent channel.",
      "Train on cognitive biases."
    ],
    techniques: [
      { id: "TH-6001", name: "Emotional Triggering", desc: "Activating a strong emotional reaction to trigger action without reflection ('I need your help, it's urgent')." },
      { id: "TH-6002", name: "Tactical Storytelling", desc: "A fabricated narrative to lower defenses ('I'm working on a confidential report for an NGO')." },
      { id: "TH-6003", name: "Contextual Escalation", desc: "Accelerating pace and tone to force a hasty decision." },
      { id: "TH-6004", name: "Cognitive Bias Exploitation", desc: "Authority bias, reciprocity, halo effect, confirmation bias." },
      { id: "TH-6005", name: "LLM-Generated Elicitation", desc: "AI-automated elicitation: rapport-engineering conversations run 24/7 with hundreds of targets simultaneously. The lack of natural human signals (timing inconsistencies, fatigue, distraction) is paradoxically a detectable IoH.", ai: true }
    ]
  },
  {
    id: "TA-H007",
    name: "Access Escalation",
    attack: "TA0004 Privilege Escalation",
    objective: "Not about system privileges, but about crossing a psychological threshold that opens access to more sensitive information.",
    severity: "HIGH", detection: "4/5", frequency: "Moderate",
    ioh: [
      "An unusually exclusive relational bubble ('you're the only person I confide in').",
      "The other party sharing a 'confidence' to provoke reciprocity.",
      "Intense intellectual flattery framing you as unique."
    ],
    countermeasures: [
      "Maintain several informational anchors.",
      "Seek external assessment of unusually intense relationships."
    ],
    techniques: [
      { id: "TH-7001", name: "Simulated Intimacy", desc: "Exclusive relational bubble ('you're the only person I confide in')." },
      { id: "TH-7002", name: "Voluntary Exposure Staging", desc: "The attacker shares a 'confidence' to provoke reciprocity." },
      { id: "TH-7003", name: "Targeted Valorization", desc: "Intellectual flattery to make the target believe they are unique (favored against an Ego / 'E' MICE profile)." }
    ]
  },
  {
    id: "TA-H008",
    name: "Network Discovery",
    attack: "TA0007 Discovery",
    objective: "The attacker maps the target's informational environment: human links, tools and habits.",
    severity: "MEDIUM", detection: "4/5", frequency: "Common",
    ioh: [
      "Seemingly innocent questions that reveal relatives, colleagues and partners.",
      "Probing to deduce tools used (OS, messaging apps, applications).",
      "Interest in overlooked gaps in your digital hygiene."
    ],
    countermeasures: [
      "Strict privacy configuration.",
      "Metadata cleaning.",
      "No public links with children."
    ],
    techniques: [
      { id: "TH-8001", name: "Social Network Cartography", desc: "Identifying relatives, colleagues and partners." },
      { id: "TH-8002", name: "Device & Services Identification", desc: "Deducing the tools used (OS, messaging apps, applications)." },
      { id: "TH-8003", name: "Behavioral Pattern Analysis", desc: "Detecting routines, cycles and moments of vulnerability." },
      { id: "TH-8004", name: "Blind Spot Mapping", desc: "Neglected areas in the target's digital hygiene." }
    ]
  },
  {
    id: "TA-H009",
    name: "Social Network Traversal",
    attack: "TA0008 Lateral Movement",
    objective: "The attacker extends beyond the initial target by exploiting their connections. As in cybersecurity, one entry point can compromise the whole network.",
    severity: "HIGH", detection: "3/5", frequency: "Moderate",
    ioh: [
      "Someone contacting your relatives claiming a credible link to you.",
      "A manipulated contact being used to reach another.",
      "A third party instrumentalized to legitimize a request."
    ],
    countermeasures: [
      "Inform your circle of the risks.",
      "Separate personal and professional circles.",
      "Limit relationships visible online."
    ],
    techniques: [
      { id: "TH-9001", name: "Targeted Social Propagation", desc: "Contacting relatives while pretending to have a credible connection." },
      { id: "TH-9002", name: "Compromise Cascade", desc: "Using one manipulated contact to target another." },
      { id: "TH-9003", name: "Cross-Pressure", desc: "Instrumentalizing a third party to legitimize a request." },
      { id: "TH-9004", name: "Secondary Network Reconstruction", desc: "Building a social graph to prioritize secondary targets." }
    ]
  },
  {
    id: "TA-H010",
    name: "Intelligence Collection",
    attack: "TA0009 Collection",
    objective: "The attacker extracts the target information: personal, professional, emotional or financial data.",
    severity: "HIGH", detection: "3/5", frequency: "Very common",
    ioh: [
      "Early personal questions from a not-yet-verified contact.",
      "Requests to send documents (potential EXIF/metadata harvesting).",
      "Emotional exchanges that draw out revelations."
    ],
    countermeasures: [
      "Beware of early personal questions.",
      "Clean your metadata before sending any document."
    ],
    techniques: [
      { id: "TH-10001", name: "Emotional Exfiltration", desc: "Extracting revelations during emotional exchanges (recording without consent)." },
      { id: "TH-10002", name: "Network Leakage", desc: "Indirect revelation of one's circle through innocuous conversations." },
      { id: "TH-10003", name: "Metadata Harvesting", desc: "Extracting EXIF metadata, document author, geolocation." },
      { id: "TH-10004", name: "Screenshot Pull", desc: "Capturing exchanges for archiving or future offensive use." },
      { id: "TH-10005", name: "Secret Extraction", desc: "Obtaining high-value strategic or compromising information." }
    ]
  },
  {
    id: "TA-H011",
    name: "Handler Communication",
    attack: "TA0011 Command & Control",
    objective: "Unlike cyber C2, this is about maintaining the psychological link and relational dominance over the target.",
    severity: "MEDIUM", detection: "5/5", frequency: "Rare (mostly in state operations)",
    ioh: [
      "Imposed tempo of exchanges creating tension and dependency.",
      "Restriction to controlled, unverifiable or barely traceable channels.",
      "Alternating seduction / rejection / victimhood to disorient you."
    ],
    countermeasures: [
      "Never accept a single imposed channel.",
      "Require third-party validation.",
      "Recognize manipulative cycles."
    ],
    techniques: [
      { id: "TH-11001", name: "Imposed Rhythm", desc: "Controlling the tempo of exchanges to create tension and dependency." },
      { id: "TH-11002", name: "Channel Restriction", desc: "Limiting to controlled, unverifiable or barely traceable channels." },
      { id: "TH-11003", name: "Validation Transfer", desc: "Imposing a single frame of reference; discrediting any opposing source." },
      { id: "TH-11004", name: "Affective Gearing", desc: "Alternating seduction / rejection / victimhood to disorient the target." }
    ]
  },
  {
    id: "TA-H012",
    name: "Intelligence Exfiltration",
    attack: "TA0010 Exfiltration",
    objective: "Human exfiltration concerns verbal, emotional or behavioral information extracted from the target — unlike file exfiltration.",
    severity: "HIGH", detection: "4/5", frequency: "Common",
    ioh: [
      "Oral transfer of high-value information through manipulated exchanges.",
      "Documentation of your behaviors and reactions.",
      "Obtaining physical or digital documents through manipulation."
    ],
    countermeasures: [
      "Practice reserve with any unverified party.",
      "No premature emotional engagement online."
    ],
    techniques: [
      { id: "TH-12001", name: "Verbal Data Exfil", desc: "Oral transfer of high-value information through manipulated exchanges." },
      { id: "TH-12002", name: "Behavioral Exfil", desc: "Observing and documenting the target's behaviors and reactions." },
      { id: "TH-12003", name: "Document Exfil", desc: "Obtaining physical or digital documents through manipulation." }
    ]
  },
  {
    id: "TA-H013",
    name: "Influence & Impact",
    attack: "TA0040 Impact",
    objective: "The strategic culmination of the whole operation: producing a real, measurable effect on the target.",
    severity: "HIGH", detection: "2/5", frequency: "Common",
    ioh: [
      "Mass harassment overloading attentional and psychological resources.",
      "Reputation destruction via deepfakes, fake messages or coordinated campaigns.",
      "Physical intimidation creating a climate of insecurity."
    ],
    countermeasures: [
      "Have a predefined response plan.",
      "Identify crisis contacts in advance.",
      "Document harassment for the authorities."
    ],
    techniques: [
      { id: "TH-13001", name: "Saturation", desc: "Mass harassment to overload attentional and psychological resources." },
      { id: "TH-13002", name: "Operational Paralysis", desc: "Blocking the target's ability to work or interact digitally." },
      { id: "TH-13003", name: "Public Infamy Attack", desc: "Reputation destruction via deepfakes, fake messages, coordinated campaigns." },
      { id: "TH-13004", name: "IRL Surveillance", desc: "Physical intimidation to create a climate of insecurity." },
      { id: "TH-13005", name: "Legal Weaponization", desc: "Abusive complaints and false reports to neutralize the target." }
    ]
  }
];

/* ---- Cross-cutting reference data ------------------------------------- */

const ARCHITECTURE = [
  ["Level 1", "Tactic", "Human tactic (TA-H001 to TA-H013)"],
  ["Level 2", "Technique", "HUMINT technique (TH-XXXX)"],
  ["Level 3", "Sub-technique", "Specific implementation (TH-XXXX.YYY)"],
  ["Defense", "Mitigation", "Countermeasure (CM-HXXX)"],
  ["Detection", "Indicator of Compromise (IoC)", "Indicator of HUMINT Operation (IoH)"],
  ["Actors", "APT Groups", "Threat Actors (states, criminals, insiders)"]
];

const CVE_HVE = [
  ["Software flaw (CVE)", "Cognitive bias, psychological need (HVE)"],
  ["Exploit", "Manipulation technique (TH-XXXX)"],
  ["Payload", "Fraudulent action obtained from the target"],
  ["Lateral movement", "Propagation to the target's social network"],
  ["Persistence", "Anchoring a durable relationship of trust"],
  ["Data exfiltration", "Extraction of sensitive human information"],
  ["Command & Control", "Relational psychological control"]
];

const SCORING = {
  detection: [
    ["1/5", "Visible to any aware colleague. Basic training is enough."],
    ["2/5", "Detectable after specific training on recognizing approaches."],
    ["3/5", "Requires trained staff and structured interview protocols."],
    ["4/5", "Requires an active counter-intelligence program and behavioral monitoring."],
    ["5/5", "Detectable only after the fact, in a post-incident forensic analysis."]
  ]
};

/* The rule of three IoH */
const THREE_IOH_RULE =
  "No single IoH proves a malicious operation. If THREE distinct IoH, belonging to " +
  "DIFFERENT tactics, are observed on the same individual or contact within a 90-day " +
  "window → trigger an in-depth verification procedure. Multiple IoH on the same tactic " +
  "carry less weight than IoH spread across several tactics.";

/* Persuasion principles (PPSE) */
const PPSE = [
  ["AUTH — Authority", "People are conditioned not to question authority. The attacker impersonates a superior, an official or a recognized expert."],
  ["SP — Social Proof", "People reproduce the behavior of the majority. The attacker fabricates an illusion of collective behavior to lower vigilance."],
  ["LSD — Similarity, Liking & Deception", "The most used principle in phishing emails. People trust those they know, like, or share traits with. The attacker mimics the target's cultural, linguistic and professional codes."],
  ["CRC — Commitment, Reciprocity & Consistency", "People feel obliged to stay consistent with past commitments and to return a favor. The attacker builds psychological debt or an escalating chain of commitments."],
  ["DIS — Distraction", "Attention is limited. By focusing attention on one element (urgency, potential gain, fear), the attacker prevents rational analysis of the whole situation."]
];

/* AI-augmented threats: specific IoH tables from chapter 5.3 */
const AI_THREATS = [
  {
    id: "TH-2006", name: "AI Voice Cloning", tacticId: "TA-H002",
    summary: "Real-time voice cloning to impersonate a superior or a relative on a phone call. In 2019 a UK CFO wired €220,000 after a cloned-voice call. Tools now clone a voice from ~3s of audio for under €10/month (FBI advisory, 2024).",
    ioh: [
      ["Incoming call requesting an urgent, confidential action", "Any voice request outside the usual channel", "High"],
      ["Request not to verify by email or message", "Isolation of the verification channel", "Critical"],
      ["Slight repetitions or artifacts in the voice", "Signature of voice-synthesis models", "Moderate"],
      ["Caller does not react to shared context", "Absence of conversational memory", "Moderate"],
      ["Call from an unusual or masked number", "Bypassing caller ID", "High"]
    ],
    cm: "Personal verification code (CM-H002): agree in advance on an oral password with anyone who might make urgent financial requests. A cloning system cannot reproduce a code it does not know. If the code is not said spontaneously within the first 30 seconds of a sensitive request, the answer is always: 'I'll call you back on your usual direct line.'"
  },
  {
    id: "TH-3006", name: "AI Deepfake Video", tacticId: "TA-H003",
    summary: "Real-time face-swap enables video calls with an AI avatar. Arup, Hong Kong, Jan 2024: an employee made 15 transfers totaling $25M after a video call with deepfaked colleagues. A confidentiality email (TA-H004) preceded the call — the IoH appear BEFORE the video meeting, not during it.",
    ioh: [
      ["Prior email demanding meeting confidentiality", "Isolation before visual contact", "Critical"],
      ["Meeting organized outside the org's usual tools", "Bypassing traceable tools", "High"],
      ["Financial/sensitive request during an unplanned video call", "Urgency + video = deepfake signature", "Critical"],
      ["Slight lip-sync mismatch", "Video processing latency", "Moderate"],
      ["Slightly blurred face edges or artificially uniform lighting", "Generation artifacts", "Moderate"],
      ["Party refuses to move to an alternative verification channel", "Resistance to the countermeasure", "Critical"]
    ],
    cm: "Policy: no financial or access request may be validated in a video call alone, whatever the urgency invoked. Validation always requires written confirmation on the usual channel (corporate email or secure messaging). Even a perfect deepfake cannot write from the executive's real email address."
  },
  {
    id: "TH-6005", name: "LLM-Generated Elicitation", tacticId: "TA-H006",
    summary: "LLMs remove the bottleneck of rapport engineering: one operator can maintain hundreds of 6–8 week relationships, 24/7, with impossible-to-match consistency. Pig butchering is the most documented case. Paradoxically, the LLM's perfection (no timing gaps, no fatigue, no forgotten details) is its main IoH.",
    ioh: [
      ["Perfect availability at any hour, including nights and weekends", "Absence of human constraints", "Moderate"],
      ["Responses always with the same syntactic structure", "Algorithmic generation", "Moderate"],
      ["Perfect memory of every previously mentioned detail", "Injected LLM context", "Weak alone, significant combined"],
      ["Steady, regular escalation toward sensitive topics", "Programmed sequence", "High"],
      ["Recent online profile, few old connections, sudden activity", "Account created for the operation", "High"],
      ["No stylistic inconsistency over weeks of exchange", "Algorithmic signature", "Moderate"]
    ],
    cm: "Out-of-channel verification test: for any online relationship that quickly moves toward money, professional data or access, ask the party to confirm their identity via an unplanned video call at a last-minute time. An LLM can answer a message instantly — it cannot appear on real video. Resistance to this spontaneous video request is itself a critical IoH."
  },
  {
    id: "AI-PROFILE", name: "AI-generated fake profiles", tacticId: "TA-H002",
    summary: "AI-generated LinkedIn profiles — synthetic photo, coherent work history, generated recommendations, progressively built connections — now cost close to zero. The old tells (GAN artifacts, empty history, no shared connections) are disappearing.",
    ioh: [
      ["Photo with slightly blurred or inconsistent backgrounds", "AI generation (checkable on detection tools)", "High"],
      ["Recently created profile with a dense prior work history", "Retroactive construction", "High"],
      ["Verified mutuals do not actually know the person", "Artificially built network", "Critical"],
      ["No organic activity (likes, comments) on posted content", "Dormant profile activated for the operation", "Moderate"],
      ["Offer/request too attractive, too personalized, too fast", "Programmed sequence", "High"],
      ["Request to move to an external channel (WhatsApp, Telegram)", "Bypassing platform protections", "Critical"]
    ],
    cm: "Three-point check for any unsolicited professional contact before substantive exchange: (1) Does the profile image pass an AI-image detector? (2) Do shared connections confirm they know the person? (3) Does the person have a verifiable presence on other channels (company site, academic publication, public talk)? If at least two of the three are negative or unverifiable, treat the contact as unauthenticated."
  }
];

/* Real-world cases mapped to HACT tactics */
const CASES = [
  { title: "Arup deepfake — Hong Kong (Jan 2024)", loss: "$25,000,000", tactics: ["TA-H003","TA-H004"],
    text: "A finance employee joined a video call with the 'CFO' and colleagues — all AI deepfakes built from public footage. Reassured by familiar faces, he made 15 transfers to five accounts. The System-1 brain treated a familiar face as proof of identity." },
  { title: "MGM Resorts helpdesk vishing (Sep 2023)", loss: "~$100,000,000", tactics: ["TA-H001","TA-H003"],
    text: "Scattered Spider (UNC3944) with ALPHV/BlackCat identified a high-privilege employee on LinkedIn, then called the IT helpdesk impersonating them to reset the phone number — bypassing MFA without breaking a single system. The vulnerable element was the procedure itself: no independent identity check for high-privilege resets." },
  { title: "Lazarus 'Operation Dream Job'", loss: "$620,000,000 (Ronin/Axie, Mar 2022)", tactics: ["TA-H002","TA-H005","TA-H006"],
    text: "North Korean operators posing as tech recruiters approached crypto engineers on LinkedIn with deep-legend profiles and shared connections. After weeks of salary discussions, the target received a trojanized 'technical test'. It exploits the blind spot of professional vigilance: you don't suspect what you desire." },
  { title: "Pig butchering (romance + crypto fraud)", loss: ">$75,000,000,000 cumulative since 2020", tactics: ["TA-H005","TA-H006"],
    text: "Industrialized affective + crypto-investment fraud run from centers in Myanmar, Cambodia and Laos. Contact via a wrong-number SMS or a social request; a weeks-long affective relationship (intensive TA-H005); a crypto platform the fraudster controls; real initial withdrawals to condition the victim; then disappearance. Since 2023, LLMs automate TA-H005 — one operator, hundreds of simultaneous relationships." },
  { title: "UK CFO voice-clone fraud (2019)", loss: "€220,000", tactics: ["TA-H002","TA-H006"],
    text: "A UK subsidiary CFO received a call from his 'CEO' — perfect accent, intonation and rhythm — requesting an urgent transfer to Hungary. The tool was commercial voice-cloning software trained on the CEO's public recordings." },
  { title: "LastPass DevOps engineer (2022)", loss: "Client vault backups", tactics: ["TA-H001"],
    text: "A senior DevOps engineer, one of four holders of the vault-backup decryption keys, used a personal computer running an outdated Plex Media Server. An attacker exploited the RCE flaw to install a keylogger and captured the master password after MFA, exfiltrating vault backups for over two months. Not classic social engineering — a perimeter failure around privileged access." }
];

/* Insider threat note */
const INSIDER = {
  title: "The insider threat — outside the standard matrix",
  text: "HACT implicitly assumes an external attacker who must build a legend (TA-H002), make first contact (TA-H003) and build rapport (TA-H005) before exploiting. But per Verizon DBIR 2023, 19–34% of incidents involve an internal actor. The insider enters directly at the collection phase — the classic IoH do not fire. Detection relies on behavioral and technical signals, not the standard HACT matrix. Examples: Edward Snowden (2013, contractor with broad admin access); a US regional-bank analyst who copied 21,000 client files to a USB key within 48h of learning of his dismissal (caught by Data Leak Protection on unusual transfer volumes); and a French tax officer (Ghalia C., indicted June 2025) who consulted the sensitive 'Mira' database and sold data via Western Union — with directly traceable kidnappings of crypto investors in Jan 2026. The answer is not generalized distrust but access segmentation and traceability, independent of the trust placed in the person."
};

/* Emergency decision reflexes (chapter 6) */
const REFLEXES = [
  ["Urgency = signal", "Any request using urgency as its main argument is a DIS-type IoH. Legitimate urgency survives a two-minute check; what doesn't, probably isn't legitimate."],
  ["Unusual channel = mandatory verification", "An incoming call, an SMS from an unknown number, a request via a private channel is never a verification channel — it is precisely what must be verified."],
  ["Call back, never promise", "For any sensitive phone/video request, the standard answer is: 'I'll call you back on your usual line in five minutes.' This one sentence neutralizes TH-2006 and TH-3006."],
  ["Two IoH = suspend", "As soon as two alerts fire simultaneously — any combination — take no action before full verification. No exception for superiors. No exception for emergencies."],
  ["Report, even if you complied", "If an action was already taken and doubt arises, alert the security officer immediately. The window to limit impact is always open in the first hours. The shame of reporting a mistake costs infinitely less than silence."]
];

/* Regulatory mapping (France/EU) mapped to tactics */
const REGULATORY = [
  ["TA-H001", "Art. 5 — Purpose limitation & minimization; Art. 32 — Appropriate security measures", "Art. 21(2)(a) — Cyber risk management"],
  ["TA-H002", "Art. 32 — Security of processing (detect fake profiles / cover identities)", "Art. 21(2)(c) — Vulnerability management"],
  ["TA-H003", "Art. 32 — Confidentiality & integrity; Art. 33 — Breach notification (CNIL within 72h)", "Art. 21(2)(d) — Incident handling; Art. 23 — Incident notification"],
  ["TA-H005", "Art. 32 — Security of processing (regular training, Art. 39 DPO)", "Art. 20 — Training & awareness"],
  ["TA-H006", "Art. 25 — Data protection by design (slow-down mechanisms, dual validation)", "Art. 21(2)(a) — Risk-management policies incl. cognitive-bias training"],
  ["TA-H007", "Art. 5(1)(c) — Data minimization", "Art. 21(2)(e) — Access control (least privilege)"],
  ["TA-H010", "Art. 33 — Breach notification (CNIL within 72h)", "Art. 23 — Notification obligation"],
  ["TA-H012", "Art. 33 & 34 — Breach notification & communication to data subjects", "Art. 23 — Notification of significant incidents (ANSSI)"],
  ["TA-H013", "Art. 32 — Restoring availability; Art. 35 — Impact assessment (DPIA)", "Art. 21(2)(f) — Business continuity; Art. 21(2)(g) — Supply-chain security"]
];

const SANCTIONS = [
  ["GDPR", "€20M OR 4% of annual worldwide turnover (whichever is higher) — for breach of Art. 32 or failure to notify (Art. 33-34)."],
  ["NIS2", "Essential entities: €10M OR 2% of worldwide turnover. Important entities: €7M OR 1.4%. Personal liability of executives possible."]
];

/* Maturity model */
const MATURITY = [
  ["N1", "Unprepared", "No measures in place. No security policy covering SE. Employees have never heard of social engineering in a professional context."],
  ["N2", "Aware", "Written security policy mentioning SE risk. No active training program. Management is aware; employees are not."],
  ["N3", "Trained", "Annual staff training (at least at-risk populations). Individual checklists distributed. Dual-verification procedures for financial requests."],
  ["N4", "Drilled", "Regular phishing/vishing simulations. Documented and shared IoH. Operational reporting procedure. Red-team SE at least once a year."],
  ["N5", "Resilient", "Continuous program integrated with threat intelligence. Multi-vector exercises. Maturity metrics tracked quarterly. Systematic post-incident review. Positive, shame-free reporting culture."]
];

/* Most-targeted profiles */
const TARGETS = [
  ["New employees", "60%", "Unfamiliar with procedures, eager to please, internal network not yet established."],
  ["Contractors / partners", "44%", "Partial system access, internal security policy poorly known."],
  ["Executive assistants", "38%", "Access to strategic information and executives' calendars."],
  ["HR / Helpdesk", "33%", "Classic entry points for gathering secondary information on internal structure."]
];

const BIBLIO = [
  "Cialdini, R. B. (2007). Influence: The Psychology of Persuasion. Harper Business.",
  "Ferreira, A., Coventry, L., & Lenzini, G. (2015). Principles of Persuasion in Social Engineering and Their Use in Phishing. Univ. of Luxembourg.",
  "Ferreira, A., Bragança, H. (2021). Why social engineering works. Proc. HAISA.",
  "Gragg, D. (2003). A Multi-Level Defense Against Social Engineering. SANS Institute.",
  "MITRE Corporation. (2023). MITRE ATT&CK® Framework. https://attack.mitre.org",
  "Mitnick, K. & Simon, W. (2002). The Art of Deception. Wiley.",
  "Mouton, F. et al. (2014). Social Engineering Attack Framework. ISSA, IEEE.",
  "Mouton, F. et al. (2015). Social Engineering Attack Detection Model: SEADMv2. CW, IEEE.",
  "Stajano, F. & Wilson, P. (2011). Understanding Scam Victims: Seven Principles for Systems Security. Commun. ACM, 54(3).",
  "Syafitri, W. et al. (2022). Social Engineering Attacks Prevention: A Systematic Literature Review. IEEE Access, 10.",
  "Verizon. (2023). Data Breach Investigations Report (DBIR).",
  "Wang, Z. et al. (2021). Social Engineering in Cybersecurity. IEEE Access, 9.",
  "Schmitt, M. & Flechais, I. (2023). Digital Deception: Generative AI in Social Engineering and Phishing. SSRN.",
  "Salahdine, F. & Kaabouch, N. (2019). Social Engineering Attacks: A Survey. Future Internet.",
  "Kahneman, D. (2011). Thinking, Fast and Slow. FSG."
];

/* Key statistics */
const STATS = [
  ["74%", "of data breaches involve a human element", "Verizon DBIR 2023"],
  ["44%", "share of phishing among SE attacks", "Verizon DBIR 2023"],
  ["$1.8B", "phishing-related losses (2020)", "FBI IC3"],
  ["$50,000", "median cost per phishing attack", "Verizon 2023"]
];
