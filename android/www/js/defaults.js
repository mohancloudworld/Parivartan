"use strict";

// Content shipped with the app so a new library is not empty.
//
// Both texts are the official versions published by the Ministry of Home
// Affairs, Government of India, taken from the Hindi order
// "भारत के राष्ट्रगान/राष्ट्रगीत के संबंध में आदेश" (10 July 2026),
// Annexure-II and Annexure-I respectively:
//   https://www.mha.gov.in/hi/documents/national-flag-emblem-anthem
//
// They are transcribed from that order's own Devanagari rather than converted
// from a romanisation. The engine's romanisations are faithful enough for
// ordinary text, but these are national symbols: a transliteration artefact in
// the national anthem is not an acceptable failure, so the authoritative script
// is the source and every other script is derived from it at display time.
//
// The lyrics are long out of copyright - Rabindranath Tagore died in 1941 and
// Bankim Chandra Chatterjee in 1894.
//
// Only the title, body and script are stored here. The ITRANS pivot and the
// search key are computed by makeContent() at seed time, so they cannot drift
// from whatever the conversion tables currently say.

var PARIVARTAN_DEFAULT_CONTENT = [
  {
    // Annexure-II, clause I(1): the first stanza of Tagore's "Jana Gana Mana",
    // which is the full version of the anthem. Playing time about 52 seconds.
    title: "जन गण मन (राष्ट्रगान)",
    sourceScript: "Devanagari",
    body:
      "जन-गण-मन अधिनायक जय हे\n" +
      "भारत-भाग्य-विधाता।\n" +
      "पंजाब-सिन्धु-गुजरात-मराठा\n" +
      "द्राविड़-उत्कल-बंग\n" +
      "विंध्य-हिमाचल-यमुना-गंगा\n" +
      "उच्छल-जलधि-तरंग\n" +
      "तव शुभ नामे जागे, तव शुभ आशिष मांगे\n" +
      "गाहे तव जय-गाथा।\n" +
      "जन-गण-मंगलदायक जय हे\n" +
      "भारत-भाग्य-विधाता।\n" +
      "जय हे, जय हे, जय हे,\n" +
      "जय जय जय जय हे।"
  },
  {
    // Annexure-I, clause I(1): the official version of the national song, which
    // the order prints in full rather than as the two stanzas usually sung.
    // Playing time about 3 minutes 10 seconds.
    title: "वन्दे मातरम् (राष्ट्रगीत)",
    sourceScript: "Devanagari",
    body:
      "वन्दे मातरम्, वन्दे मातरम्।\n" +
      "\n" +
      "सुजलाम् सुफलाम् मलयजशीतलाम्,\n" +
      "शस्यश्यामलाम् मातरम्।\n" +
      "वन्दे मातरम्॥\n" +
      "\n" +
      "शुभ्रज्योत्स्ना पुलकितयामिनीम्,\n" +
      "फुल्लकुसुमित द्रुमदलशोभिनीम्,\n" +
      "सुहासिनीं सुमधुरभाषिणीम्,\n" +
      "सुखदाम् वरदाम् मातरम्।\n" +
      "वन्दे मातरम्॥\n" +
      "\n" +
      "कोटि-कोटि कण्ठ कल-कल निनाद कराले,\n" +
      "कोटि-कोटि भुजैर्धृत खरकरवाले,\n" +
      "के बॉले माँ तुमि अबले,\n" +
      "बहुबलधारिणीं नमामि तारिणीम्,\n" +
      "रिपुदलवारिणीं मातरम्।\n" +
      "वन्दे मातरम्॥\n" +
      "\n" +
      "तुमि विद्या तुमि धर्म, तुमि हृदि तुमि मर्म,\n" +
      "त्वम् हि प्राणाः शरीरे, बाहुते तुमि माँ शक्ति,\n" +
      "हृदये तुमि माँ भक्ति, तोमारेइ प्रतिमा गड़ि मन्दिरे-मन्दिरे।\n" +
      "वन्दे मातरम्॥\n" +
      "\n" +
      "त्वम् हि दुर्गा दशप्रहरणधारिणी,\n" +
      "कमला कमलदलविहारिणी,\n" +
      "वाणी विद्यादायिनी, नमामि त्वाम्,\n" +
      "नमामि कमलाम् अमलाम् अतुलाम्,\n" +
      "सुजलां सुफलां मातरम्।\n" +
      "वन्दे मातरम्॥\n" +
      "\n" +
      "श्यामलाम् सरलाम् सुस्मिताम् भूषिताम्,\n" +
      "धरणीम् भरणीम् मातरम्।\n" +
      "वन्दे मातरम्, वन्दे मातरम्॥"
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { PARIVARTAN_DEFAULT_CONTENT: PARIVARTAN_DEFAULT_CONTENT };
}
