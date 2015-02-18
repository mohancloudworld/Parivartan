// ISO 15919
var iso2itrans_dict = {
    // http://en.wikipedia.org/wiki/Wikipedia:Indic_transliteration
    // http://homepage.ntlworld.com/stone-catend/trimain1.htm
    // http://www.virtualvinodh.com/wp/character-matrix/

    "ā"     :   "A",
    //"æ"     :   "",
    //"ǣ"     :   "",
    "ī"     :   "I",
    "ū"     :   "U",
    "r̥"     :   "RRi",
    "r̥̄"     :   "RRI",
    "l̥"     :   "LLi",
    "l̥̄"     :   "LLI",
    "ĕ"     :   "a.c",  // need to check again
    "ē"     :   "E",
    "ŏ"     :   "A.c",  // need to check again
    "ō"     :   "O",
    "m̐"     :   ".N",
    "n̆"     :   ".N",   // for Telugu
    "ṃ"     :   "M",    // *** not correct for Gurmukhi ***
    "ṁ"     :   "M",
    "ḥ"     :   "H",
    "'"     :   ".a",
    "ṅ"     :   "~N",
    "c"     :   "ch",   // will also handle ch -> chh/Ch
    "ñ"     :   "~n",
    "ṭ"     :   "T",    // will also handle ṭh -> Th
    "ḍ"     :   "D",    // will also handle ḍh -> Dh
    "ṇ"     :   "N",
    "ṉ"     :   "^n",
    "ṟ"     :   "R",
    //"r̆"     :   "",
    "ḷ"     :   "L",
    //"ḻ"     :   "",
    "ś"     :   "sh",
    "ṣ"     :   "Sh",
    "q"     :   "ḳ",
    "ḵẖ"    :   "kḥ",
    "k͟h"    :   "kḥ",
    "ġ"     :   "g̣",
    "z"     :   "j̣",
    "ṛ"     :   "Ḍ",
    "ṛh"    :   "Dḥ",
    "f"     :   "pḥ",
    "ẏ"     :   "ỵ",
    "t̤"     :   "ṭ",
    "s̤"     :   "ṣ",
    "h̤"     :   "ḥ",
    "w"     :   "ṿ",
    "ṯ"     :   "t"
};

var iast2itrans_dict = {
    // http://en.wikipedia.org/wiki/International_Alphabet_of_Sanskrit_Transliteration
    // http://en.wikipedia.org/wiki/Devanagari_transliteration
    // http://www.aczoom.com/itrans/html/romancsx/node4.html

    "ā"     :   "A",
    "ī"     :   "I",
    "ū"     :   "U",
    "ṛ"     :   "RRi",
    "ṝ"     :   "RRI",
    "ḷ"     :   "LLi",
    "ḹ"     :   "LLI",
    "e"     :   "E",
    "o"     :   "O",
    "ṃ"     :   "M",
    "ḥ"     :   "H",
    "'"     :   ".a",
    "c"     :   "ch",   // will also handle ch -> chh/Ch
    "ṭ"     :   "T",    // will also handle ṭh -> Th
    "ḍ"     :   "D",    // will also handle ḍh -> Dh
    "ṅ"     :   "~N",
    "ñ"     :   "~n",
    "ṇ"     :   "N",
    "ś"     :   "sh",
    "ṣ"     :   "Sh"
};

var devanagari_dict = {
    // http://www.aczoom.com/itrans/html/dvng/node3.html

    "Independent_vowels": { // -()
        // Independent vowels
        //""    :   "\u0904", // ऄ DEVANAGARI LETTER SHORT A
        "a"     :   "\u0905", // अ DEVANAGARI LETTER A
        "A"     :   "\u0906", // आ DEVANAGARI LETTER AA
        "aa"    :   "\u0906", // आ DEVANAGARI LETTER AA
        "i"     :   "\u0907", // इ DEVANAGARI LETTER I
        "I"     :   "\u0908", // ई DEVANAGARI LETTER II
        "ii"    :   "\u0908", // ई DEVANAGARI LETTER II
        "u"     :   "\u0909", // उ DEVANAGARI LETTER U
        "U"     :   "\u090A", // ऊ DEVANAGARI LETTER UU
        "uu"    :   "\u090A", // ऊ DEVANAGARI LETTER UU
        "R^i"   :   "\u090B", // ऋ DEVANAGARI LETTER VOCALIC R
        "RRi"   :   "\u090B", // ऋ DEVANAGARI LETTER VOCALIC R
        "L^i"   :   "\u090C", // ऌ DEVANAGARI LETTER VOCALIC L
        "LLi"   :   "\u090C", // ऌ DEVANAGARI LETTER VOCALIC L
        "a.c"   :   "\u090D", // ऍ DEVANAGARI LETTER CANDRA E ** Manual Change ***
        "e"     :   "\u090E", // ऎ DEVANAGARI LETTER SHORT E • for transcribing Dravidian short e   ** Manual Change ***
        "E"     :   "\u090F", // ए DEVANAGARI LETTER E
        "ee"    :   "\u090F", // ए DEVANAGARI LETTER E
        "ai"    :   "\u0910", // ऐ DEVANAGARI LETTER AI
        "A.c"   :   "\u0911", // ऑ DEVANAGARI LETTER CANDRA O ** Manual Change ***
        "aa.c"  :   "\u0911", // ऑ DEVANAGARI LETTER CANDRA O ** Manual Change ***
        "o"     :   "\u0912", // ऒ DEVANAGARI LETTER SHORT O • for transcribing Dravidian short o   *** Manual Change ***
        "O"     :   "\u0913", // ओ DEVANAGARI LETTER O
        "oo"    :   "\u0913", // ओ DEVANAGARI LETTER O
        "au"    :   "\u0914", // औ DEVANAGARI LETTER AU


        // Independent vowel for Marathi
        //""    :   "\u0972", // ॲ DEVANAGARI LETTER CANDRA A

        // Independent vowels for Kashmiri
        //""    :   "\u0973", // ॳ DEVANAGARI LETTER OE
        //""    :   "\u0974", // ॴ DEVANAGARI LETTER OOE
        //""    :   "\u0975", // ॵ DEVANAGARI LETTER AW
        //""    :   "\u0976", // ॶ DEVANAGARI LETTER UE
        //""    :   "\u0977", // ॷ DEVANAGARI LETTER UUE

        // Additional vowels for Sanskrit
        "R^I"   :   "\u0960", // ॠ DEVANAGARI LETTER VOCALIC RR
        "RRI"   :   "\u0960", // ॠ DEVANAGARI LETTER VOCALIC RR
        "L^I"   :   "\u0961", // ॡ DEVANAGARI LETTER VOCALIC LL
        "LLI"   :   "\u0961", // ॡ DEVANAGARI LETTER VOCALIC LL

        "OM"    :   "\u0950", // ॐ DEVANAGARI OM
        "ooM"   :   "\u0950", // ॐ DEVANAGARI OM
        "AUM"   :   "\u0950"  // ॐ DEVANAGARI OM
    },

    "Dependent_vowel": { // +()
        // Dependent vowel signs for Kashmiri
        //""    :   "\u093A", // $ऺ DEVANAGARI VOWEL SIGN OE
        //""    :   "\u093B", // $ऻ DEVANAGARI VOWEL SIGN OOE

        // Dependent vowel signs
        "a"     :   "",       // ADDED
        "A"     :   "\u093E", // $ा DEVANAGARI VOWEL SIGN AA
        "aa"    :   "\u093E", // $ा DEVANAGARI VOWEL SIGN AA
        "i"     :   "\u093F", // $ि DEVANAGARI VOWEL SIGN I • stands to the left of the consonant
        "I"     :   "\u0940", // $ी DEVANAGARI VOWEL SIGN II
        "ii"    :   "\u0940", // $ी DEVANAGARI VOWEL SIGN II
        "u"     :   "\u0941", // $ु DEVANAGARI VOWEL SIGN U
        "U"     :   "\u0942", // $ू DEVANAGARI VOWEL SIGN UU
        "uu"    :   "\u0942", // $ू DEVANAGARI VOWEL SIGN UU
        "R^i"   :   "\u0943", // $ृ DEVANAGARI VOWEL SIGN VOCALIC R
        "RRi"   :   "\u0943", // $ृ DEVANAGARI VOWEL SIGN VOCALIC R
        "R^I"   :   "\u0944", // $ॄ DEVANAGARI VOWEL SIGN VOCALIC RR
        "RRI"   :   "\u0944", // $ॄ DEVANAGARI VOWEL SIGN VOCALIC RR
        "a.c"   :   "\u0945", // $ॅ DEVANAGARI VOWEL SIGN CANDRA E = candra ** Manual Change ***
        "e"     :   "\u0946", // $ॆ DEVANAGARI VOWEL SIGN SHORT E • for transcribing Dravidian vowels   ** Manual Change ***
        "E"     :   "\u0947", // $े DEVANAGARI VOWEL SIGN E
        "ee"    :   "\u0947", // $े DEVANAGARI VOWEL SIGN E
        "ai"    :   "\u0948", // $ै DEVANAGARI VOWEL SIGN AI
        "A.c"   :   "\u0949", // $ॉ DEVANAGARI VOWEL SIGN CANDRA O ** Manual Change ***
        "aa.c"  :   "\u0949", // $ॉ DEVANAGARI VOWEL SIGN CANDRA O ** Manual Change ***
        "o"     :   "\u094A", // $ॊ DEVANAGARI VOWEL SIGN SHORT O • for transcribing Dravidian vowels    ** Manual Change ***
        "O"     :   "\u094B", // $ो DEVANAGARI VOWEL SIGN O
        "oo"    :   "\u094B", // $ो DEVANAGARI VOWEL SIGN O
        "au"    :   "\u094C", // $ौ DEVANAGARI VOWEL SIGN AU

        // Dependent vowel signs
        //""    :   "\u094E", // $ॎ DEVANAGARI VOWEL SIGN PRISHTHAMATRA E • character has historic use only • combines with E to form AI, with AA to form O, and with O to form AU
        //""    :   "\u094F", // $ॏ DEVANAGARI VOWEL SIGN AW • Kashmiri Sign

        // Dependent vowel sign
        //""    :   "\u0955", // $ॕ DEVANAGARI VOWEL SIGN CANDRA LONG E • used in transliteration of Avestan Dependent vowel signs for Kashmiri
        //""    :   "\u0956", // $ॖ DEVANAGARI VOWEL SIGN UE
        //""    :   "\u0957", // $ॗ DEVANAGARI VOWEL SIGN UUE

        "L^i"   :   "\u0962", // ॢ DEVANAGARI VOWEL SIGN VOCALIC L
        "LLi"   :   "\u0962", // ॢ DEVANAGARI VOWEL SIGN VOCALIC L
        "L^I"   :   "\u0963", // ॣ DEVANAGARI VOWEL SIGN VOCALIC LL
        "LLI"   :   "\u0963"  // ॣ DEVANAGARI VOWEL SIGN VOCALIC LL
    },

    "Consonants": { // ()+
        // Consonants
        "k"     :   "\u0915", // क DEVANAGARI LETTER KA
        "kh"    :   "\u0916", // ख DEVANAGARI LETTER KHA
        "g"     :   "\u0917", // ग DEVANAGARI LETTER GA
        "gh"    :   "\u0918", // घ DEVANAGARI LETTER GHA
        "~N"    :   "\u0919", // ङ DEVANAGARI LETTER NGA
        "N^"    :   "\u0919", // ङ DEVANAGARI LETTER NGA
        "ch"    :   "\u091A", // च DEVANAGARI LETTER CA
        "chh"   :   "\u091B", // छ DEVANAGARI LETTER CHA
        "Ch"    :   "\u091B", // छ DEVANAGARI LETTER CHA
        "j"     :   "\u091C", // ज DEVANAGARI LETTER JA
        "jh"    :   "\u091D", // झ DEVANAGARI LETTER JHA
        "~n"    :   "\u091E", // ञ DEVANAGARI LETTER NYA
        "n^"    :   "\u091E", // ञ DEVANAGARI LETTER NYA
        "JN"    :   "\u091E", // ञ DEVANAGARI LETTER NYA
        "T"     :   "\u091F", // ट DEVANAGARI LETTER TTA
        "Th"    :   "\u0920", // ठ DEVANAGARI LETTER TTHA
        "D"     :   "\u0921", // ड DEVANAGARI LETTER DDA
        "Dh"    :   "\u0922", // ढ DEVANAGARI LETTER DDHA
        "N"     :   "\u0923", // ण DEVANAGARI LETTER NNA
        "t"     :   "\u0924", // त DEVANAGARI LETTER TA
        "th"    :   "\u0925", // थ DEVANAGARI LETTER THA
        "d"     :   "\u0926", // द DEVANAGARI LETTER DA
        "dh"    :   "\u0927", // ध DEVANAGARI LETTER DHA
        "n"     :   "\u0928", // न DEVANAGARI LETTER NA
        "^n"    :   "\u0929", // ऩ DEVANAGARI LETTER NNNA • for transcribing Dravidian alveolar n ≡ 0928 न  093C $़
        "p"     :   "\u092A", // प DEVANAGARI LETTER PA
        "ph"    :   "\u092B", // फ DEVANAGARI LETTER PHA
        "b"     :   "\u092C", // ब DEVANAGARI LETTER BA
        "bh"    :   "\u092D", // भ DEVANAGARI LETTER BHA
        "m"     :   "\u092E", // म DEVANAGARI LETTER MA
        "y"     :   "\u092F", // य DEVANAGARI LETTER YA
        "r"     :   "\u0930", // र DEVANAGARI LETTER RA
        "R"     :   "\u0931", // ऱ DEVANAGARI LETTER RRA • for transcribing Dravidian alveolar r • half form is represented as “Eyelash RA” ≡ 0930 र  093C $़
        "l"     :   "\u0932", // ल DEVANAGARI LETTER LA
        "L"     :   "\u0933", // ळ DEVANAGARI LETTER LLA
        //"ld"  :   "\u0933", // ळ DEVANAGARI LETTER LLA
        //""    :   "\u0934", // ऴ DEVANAGARI LETTER LLLA • for transcribing Dravidian l ≡ 0933 ळ  093C $़
        "w"     :   "\u0935", // व DEVANAGARI LETTER VA
        "v"     :   "\u0935", // व DEVANAGARI LETTER VA
        "sh"    :   "\u0936", // श DEVANAGARI LETTER SHA
        "Sh"    :   "\u0937", // ष DEVANAGARI LETTER SSA
        "shh"   :   "\u0937", // ष DEVANAGARI LETTER SSA
        "s"     :   "\u0938", // स DEVANAGARI LETTER SA
        "h"     :   "\u0939", // ह DEVANAGARI LETTER HA

        // Manually Added
        "x" :   "\u0915"+"\u094D"+"\u0937", // क्ष
        //"kSh" :   "\u0915"+"\u094D"+"\u0937", // क्ष  (redundant)
        "GY"    :   "\u091C"+"\u094D"+"\u091E", //
        //"j~n" :   "\u091C"+"\u094D"+"\u091E", // (redundant)

        // Additional consonants
        "q"     :   "\u0958", // क़ DEVANAGARI LETTER QA ≡ 0915 क  093C $़
        "K"     :   "\u0959", // ख़ DEVANAGARI LETTER KHHA ≡ 0916 ख  093C $़
        "G"     :   "\u095A", // ग़ DEVANAGARI LETTER GHHA ≡ 0917 ग  093C $़
        "z"     :   "\u095B", // ज़ DEVANAGARI LETTER ZA ≡ 091C ज  093C $़
        "J"     :   "\u095B", // ज़ DEVANAGARI LETTER ZA ≡ 091C ज  093C $़
        ".D"    :   "\u095C", // ड़ DEVANAGARI LETTER DDDHA ≡ 0921 ड  093C $़
        ".Dh"   :   "\u095D", // ढ़ DEVANAGARI LETTER RHA ≡ 0922 ढ  093C $़
        "f"     :   "\u095E"  // फ़ DEVANAGARI LETTER FA ≡ 092B फ  093C $़
        //""    :   "\u095F"  // य़ DEVANAGARI LETTER YYA ≡ 092F य  093C $़
    },

    "Others": { // ()
        // Various signs
        //""    :   "\u0900", // $ऀ DEVANAGARI SIGN INVERTED CANDRABINDU = vaidika adhomukha candrabindu
        ".N"    :   "\u0901", // $ँ DEVANAGARI SIGN CANDRABINDU = anunasika → 0310 $̐   combining candrabindu
        ".m"    :   "\u0902", // $ं DEVANAGARI SIGN ANUSVARA = bindu
        ".n"    :   "\u0902", // $ं DEVANAGARI SIGN ANUSVARA = bindu
        "M"     :   "\u0902", // $ं DEVANAGARI SIGN ANUSVARA = bindu
        "H"     :   "\u0903", // $ः DEVANAGARI SIGN VISARGA
        ".a"    :   "\u093D", // ऽ DEVANAGARI SIGN AVAGRAHA
        ".h"    :   "\u094D", // $ DEVANAGARI SIGN VIRAMA = halant (the preferred Hindi name) • suppresses inherent vowel

        // copied from Dependent vowels, for handling individual charecters
        ".c"    :   "\u0945", // $ॅ DEVANAGARI VOWEL SIGN CANDRA E = candra ** Manual Change ***

        // Various signs
        "\u0323":   "\u093C", // $़ DEVANAGARI SIGN NUKTA • for extending the alphabet to new letters

        // Vedic tone marks
        "\u030D":   "\u0951", // $॑ DEVANAGARI STRESS SIGN UDATTA = Vedic tone svarita • mostly used for svarita, with rare use for udatta • used also in Vedic texts written in other scripts → 1CDA $᳚   vedic tone double svarita
        "\u0332":   "\u0952", // $॒ DEVANAGARI STRESS SIGN ANUDATTA = Vedic tone anudatta • used also in Vedic texts written in other scripts → 1CDC $᳜   vedic tone kathaka anudatta

        // Accent marks
        "\u0300":   "\u0953", // $॓ DEVANAGARI GRAVE ACCENT → 0300 $̀   combining grave accent
        "\u0301":   "\u0954", // $॔ DEVANAGARI ACUTE ACCENT → 0301 $́   combining acute accent

        // Digits
        "0"     :   "\u0966", // ० DEVANAGARI DIGIT ZERO
        "1"     :   "\u0967", // १  DEVANAGARI DIGIT ONE
        "2"     :   "\u0968", // २ DEVANAGARI DIGIT TWO
        "3"     :   "\u0969", // ३ DEVANAGARI DIGIT THREE
        "4"     :   "\u096A", // ४ DEVANAGARI DIGIT FOUR
        "5"     :   "\u096B", // ५ DEVANAGARI DIGIT FIVE
        "6"     :   "\u096C", // ६ DEVANAGARI DIGIT SIX
        "7"     :   "\u096D", // ७ DEVANAGARI DIGIT SEVEN
        "8"     :   "\u096E", // ८ DEVANAGARI DIGIT EIGHT
        "9"     :   "\u096F", // ९ DEVANAGARI DIGIT NINE

        // Abbreviation sign
        "\u030A":   "\u0970", // ॰ DEVANAGARI ABBREVIATION SIGN • intended for Devanagari-specific abbreviations
        "\u0307":   "\u0971", // ॱ DEVANAGARI SIGN HIGH SPACING DOT

        // Additional consonants
        //""    :   "\u0979", // ॹ DEVANAGARI LETTER ZHA • used in transliteration of Avestan
        //""    :   "\u097A", // ॺ DEVANAGARI LETTER HEAVY YA • used for an affricated glide JJYA Sindhi implosives
        //""    :   "\u097B", // ॻ DEVANAGARI LETTER GGA
        //""    :   "\u097C", // ॼ DEVANAGARI LETTER JJA Glottal stop
        //""    :   "\u097D", // ॽ DEVANAGARI LETTER GLOTTAL STOP • used for writing Limbu in Devanagari • a glyph variant has the connecting top bar Sindhi implosives
        //""    :   "\u097E", // ॾ DEVANAGARI LETTER DDDA
        //""    :   "\u097F", // ॿ DEVANAGARI LETTER BBA

        //Generic punctuation for scripts of India
        ","     :   "\u0964", // । DEVANAGARI DANDA = purna viram • phrase separator
        "."     :   "\u0965"  // ॥ DEVANAGARI DOUBLE DANDA = deergh viram
    },

    // Virama
    "VIRAMA"    :   "\u094D"  // $ DEVANAGARI SIGN VIRAMA = halant (the preferred Hindi name) • suppresses inherent vowel
};

var telugu_dict = {
    //http://www.aczoom.com/itrans/html/tlgutx/node3.html

    "Independent_vowels": { // -()
        // Independent vowels
        "a"     :   "\u0C05", // అ TELUGU LETTER A
        "A"     :   "\u0C06", // ఆ TELUGU LETTER AA
        "aa"    :   "\u0C06", // ఆ TELUGU LETTER AA
        "i"     :   "\u0C07", // ఇ TELUGU LETTER I
        "I"     :   "\u0C08", // ఈ TELUGU LETTER II
        "ii"    :   "\u0C08", // ఈ TELUGU LETTER II
        "u"     :   "\u0C09", // ఉ TELUGU LETTER U
        "U"     :   "\u0C0A", // ఊ TELUGU LETTER UU
        "uu"    :   "\u0C0A", // ఊ TELUGU LETTER UU
        "R^i"   :   "\u0C0B", // ఋ TELUGU LETTER VOCALIC R
        "RRi"   :   "\u0C0B", // ఋ TELUGU LETTER VOCALIC R

            // Additional vowels for Sanskrit
        "R^I"   :   "\u0C60", // ౠ TELUGU LETTER VOCALIC RR
        "RRI"   :   "\u0C60", // ౠ TELUGU LETTER VOCALIC RR

        "L^i"   :   "\u0C0C", // ఌ TELUGU LETTER VOCALIC L
        "LLi"   :   "\u0C0C", // ఌ TELUGU LETTER VOCALIC L

            // Additional vowels for Sanskrit
        "L^I"   :   "\u0C61", // ౡ TELUGU LETTER VOCALIC LL
        "LLI"   :   "\u0C61", // ౡ TELUGU LETTER VOCALIC LL

        //""    :   "\u0C0D", // " <reserved>
        "e"     :   "\u0C0E", // ఎ TELUGU LETTER E
        "E"     :   "\u0C0F", // ఏ TELUGU LETTER EE
        "ee"    :   "\u0C0F", // ఏ TELUGU LETTER EE
        "ai"    :   "\u0C10", // ఐ TELUGU LETTER AI
        //""    :   "\u0C11", // " <reserved>
        "o"     :   "\u0C12", // ఒ TELUGU LETTER O
        "O"     :   "\u0C13", // ఓ TELUGU LETTER OO
        "oo"    :   "\u0C13", // ఓ TELUGU LETTER OO
        "au"    :   "\u0C14", // ఔ TELUGU LETTER AU

        // Sign: Manually added from Devanagari
        "OM"    :   "\u0950", // ॐ
        "ooM"   :   "\u0950", // ॐ
        "AUM"   :   "\u0950"  // ॐ
    },

    "Dependent_vowel": { // +()
        // Dependent vowel signs
        "a"     :   "",       // ADDED
        "A"     :   "\u0C3E", // ా  TELUGU VOWEL SIGN AA
        "aa"    :   "\u0C3E", // ా  TELUGU VOWEL SIGN AA
        "i"     :   "\u0C3F", // ి  TELUGU VOWEL SIGN I
        "I"     :   "\u0C40", // ీ  TELUGU VOWEL SIGN II
        "ii"    :   "\u0C40", // ీ  TELUGU VOWEL SIGN II
        "u"     :   "\u0C41", // ు  TELUGU VOWEL SIGN U
        "U"     :   "\u0C42", // ూ  TELUGU VOWEL SIGN UU
        "uu"    :   "\u0C42", // ూ  TELUGU VOWEL SIGN UU
        "R^i"   :   "\u0C43", // ృ  TELUGU VOWEL SIGN VOCALIC R
        "RRi"   :   "\u0C43", // ృ  TELUGU VOWEL SIGN VOCALIC R
        "R^I"   :   "\u0C44", // ౄ  TELUGU VOWEL SIGN VOCALIC RR
        "RRI"   :   "\u0C44", // ౄ  TELUGU VOWEL SIGN VOCALIC RR
        //""    :   "\u0C45", // " <reserved>
        "e"     :   "\u0C46", // ె  TELUGU VOWEL SIGN E
        "E"     :   "\u0C47", // ే  TELUGU VOWEL SIGN EE
        "ee"    :   "\u0C47", // ే  TELUGU VOWEL SIGN EE
        "ai"    :   "\u0C48", // ై  TELUGU VOWEL SIGN AI ≡ 0C46  $ె   0C56  $ౖ
        //""    :   "\u0C49", // " <reserved>
        "o"     :   "\u0C4A", // ొ  TELUGU VOWEL SIGN O
        "O"     :   "\u0C4B", // ో  TELUGU VOWEL SIGN OO
        "oo"    :   "\u0C4B", // ో  TELUGU VOWEL SIGN OO
        "au"    :   "\u0C4C", // ౌ  TELUGU VOWEL SIGN AU

        // Dependent vowels
        "L^i"   :   "\u0C62", // ౢ TELUGU VOWEL SIGN VOCALIC L
        "LLi"   :   "\u0C62", // ౢ TELUGU VOWEL SIGN VOCALIC L
        "L^I"   :   "\u0C63", // ౣ TELUGU VOWEL SIGN VOCALIC LL
        "LLI"   :   "\u0C63"  // ౣ TELUGU VOWEL SIGN VOCALIC LL
    },

    "Consonants": { // ()+
        // Consonants
        "k"     :   "\u0C15", // క TELUGU LETTER KA
        "kh"    :   "\u0C16", // ఖ TELUGU LETTER KHA
        "g"     :   "\u0C17", // గ TELUGU LETTER GA
        "gh"    :   "\u0C18", // ఘ TELUGU LETTER GHA
        "~N"    :   "\u0C19", // ఙ TELUGU LETTER NGA
        "N^"    :   "\u0C19", // ఙ TELUGU LETTER NGA
        "ch"    :   "\u0C1A", // చ TELUGU LETTER CA
        "chh"   :   "\u0C1B", // ఛ TELUGU LETTER CHA
        "Ch"    :   "\u0C1B", // ఛ TELUGU LETTER CHA
        "j"     :   "\u0C1C", // జ TELUGU LETTER JA
        "jh"    :   "\u0C1D", // ఝ TELUGU LETTER JHA
        "~n"    :   "\u0C1E", // ఞ TELUGU LETTER NYA
        "n^"    :   "\u0C1E", // ఞ TELUGU LETTER NYA
        "JN"    :   "\u0C1E", // ఞ TELUGU LETTER NYA
        "T"     :   "\u0C1F", // ట TELUGU LETTER TTA
        "Th"    :   "\u0C20", // ఠ TELUGU LETTER TTHA
        "D"     :   "\u0C21", // డ TELUGU LETTER DDA
        "Dh"    :   "\u0C22", // ఢ TELUGU LETTER DDHA
        "N"     :   "\u0C23", // ణ TELUGU LETTER NNA
        "t"     :   "\u0C24", // త TELUGU LETTER TA
        "th"    :   "\u0C25", // థ TELUGU LETTER THA
        "d"     :   "\u0C26", // ద TELUGU LETTER DA
        "dh"    :   "\u0C27", // ధ TELUGU LETTER DHA
        "n"     :   "\u0C28", // న TELUGU LETTER NA
        //""    :   "\u0C29", // " <reserved>
        "p"     :   "\u0C2A", // ప TELUGU LETTER PA
        "ph"    :   "\u0C2B", // ఫ TELUGU LETTER PHA
        "b"     :   "\u0C2C", // బ TELUGU LETTER BA
        "bh"    :   "\u0C2D", // భ TELUGU LETTER BHA
        "m"     :   "\u0C2E", // మ TELUGU LETTER MA
        "y"     :   "\u0C2F", // య TELUGU LETTER YA
        "r"     :   "\u0C30", // ర TELUGU LETTER RA
        "R"     :   "\u0C31", // ఱ TELUGU LETTER RRA
        "l"     :   "\u0C32", // ల TELUGU LETTER LA
        "L"     :   "\u0C33", // ళ TELUGU LETTER LLA
        //"ld"  :   "\u0C33", // ళ TELUGU LETTER LLA
        //""    :   "\u0C34", // " <reserved>
        "w"     :   "\u0C35", // వ TELUGU LETTER VA
        "v"     :   "\u0C35", // వ TELUGU LETTER VA
        "sh"    :   "\u0C36", // శ TELUGU LETTER SHA
        "Sh"    :   "\u0C37", // ష TELUGU LETTER SSA
        "shh"   :   "\u0C37", // ష TELUGU LETTER SSA
        "s"     :   "\u0C38", // స TELUGU LETTER SA
        "h"     :   "\u0C39", // హ TELUGU LETTER HA

        // Manually Added
        "x"     :   "\u0C15"+"\u0C4D"+"\u0C37", // క్ష
        //"kSh" :   "\u0C15"+"\u0C4D"+"\u0C37", // క్ష   (redundant)
        "GY"    :   "\u0C1C"+"\u0C4D"+"\u0C1E"  //
        //"j~n" :   "\u0C1C"+"\u0C4D"+"\u0C1E", // (redundant)

    },

    "Others": { // ()
            // Various signs
        ".N"    :   "\u0C01", // ఁ TELUGU SIGN CANDRABINDU
        ".m"    :   "\u0C02", // ం TELUGU SIGN ANUSVARA
        ".n"    :   "\u0C02", // ం TELUGU SIGN ANUSVARA
        "M"     :   "\u0C02", // ం TELUGU SIGN ANUSVARA
        "H"     :   "\u0C03", // ః TELUGU SIGN VISARGA
        // Addition for Sanskrit
        ".a"    :   "\u0C3D", // ఽ TELUGU SIGN AVAGRAHA
        ".h"    :   "\u0C4D", // TELUGU SIGN VIRAMA = halant (the preferred name)


        // Reserved For viram punctuation, use the generic Indic 0964 and 0965.
        //""    :   "\u0C64", // <reserved> → 0964 ।  devanagari danda
        //""    :   "\u0C65", // <reserved> → 0965 ॥  devanagari double danda

        // Digits
        "0"     :   "\u0C66", // ౦ TELUGU DIGIT ZERO
        "1"     :   "\u0C67", // ౧ TELUGU DIGIT ONE
        "2"     :   "\u0C68", // ౨ TELUGU DIGIT TWO
        "3"     :   "\u0C69", // ౩ TELUGU DIGIT THREE
        "4"     :   "\u0C6A", // ౪ TELUGU DIGIT FOUR
        "5"     :   "\u0C6B", // ౫ TELUGU DIGIT FIVE
        "6"     :   "\u0C6C", // ౬ TELUGU DIGIT SIX
        "7"     :   "\u0C6D", // ౭ TELUGU DIGIT SEVEN
        "8"     :   "\u0C6E", // ౮ TELUGU DIGIT EIGHT
        "9"     :   "\u0C6F", // ౯ TELUGU DIGIT NINE

        // Telugu fractions and weights
        //""    :   "\u0C78", // ౸ TELUGU FRACTION DIGIT ZERO FOR ODD POWERS OF FOUR
        //""    :   "\u0C79", // ౹ TELUGU FRACTION DIGIT ONE FOR ODD POWERS OF FOUR
        //""    :   "\u0C7A", // ౺ TELUGU FRACTION DIGIT TWO FOR ODD POWERS OF FOUR
        //""    :   "\u0C7B", // ౻ TELUGU FRACTION DIGIT THREE FOR ODD POWERS OF FOUR
        //""    :   "\u0C7C", // ౼ TELUGU FRACTION DIGIT ONE FOR EVEN POWERS OF FOUR
        //""    :   "\u0C7D", // ౽ TELUGU FRACTION DIGIT TWO FOR EVEN POWERS OF FOUR
        //""    :   "\u0C7E", // ౾ TELUGU FRACTION DIGIT THREE FOR EVEN POWERS OF FOUR
        //""    :   "\u0C7F", // ౿ TELUGU SIGN TUUMU

        // Various signs
        //""    :   "\u0C55", // ౕ  TELUGU LENGTH MARK
        //""    :   "\u0C56", // ౖ  TELUGU AI LENGTH MARK

        // Historic phonetic variants
        //""    :   "\u0C58", // ౘ TELUGU LETTER TSA
        //""    :   "\u0C59", // ౙ TELUGU LETTER DZA

        // Sign: Manually added from Devanagari
        ","     :   "\u0964", // । DEVANAGARI DANDA = purna viram • phrase separator
        "."     :   "\u0965"  // ॥ DEVANAGARI DOUBLE DANDA = deergh viram
    },

    // Virama
    "VIRAMA"    :   "\u0C4D"  // TELUGU SIGN VIRAMA = halant (the preferred name)
};

var gujarati_dict = {
    // http://www.aczoom.com/itrans/html/gujdoc/node4.html
    // **** incomplete *** last table from the link...

    "Independent_vowels": { // -()
        // Independent vowels
        "a"     :   "\u0A85", // અ GUJARATI LETTER A
        "A"     :   "\u0A86", // આ GUJARATI LETTER AA
        "aa"    :   "\u0A86", // આ GUJARATI LETTER AA
        "i"     :   "\u0A87", // ઇ GUJARATI LETTER I
        "I"     :   "\u0A88", // ઈ GUJARATI LETTER II
        "ii"    :   "\u0A88", // ઈ GUJARATI LETTER II
        "u"     :   "\u0A89", // ઉ GUJARATI LETTER U
        "U"     :   "\u0A8A", // ઊ GUJARATI LETTER UU
        "uu"    :   "\u0A8A", // ઊ GUJARATI LETTER UU
        "R^i"   :   "\u0A8B", // ઋ GUJARATI LETTER VOCALIC R
        "RRi"   :   "\u0A8B", // ઋ GUJARATI LETTER VOCALIC R
        "L^i"   :   "\u0A8C", // ઌ GUJARATI LETTER VOCALIC L • used with Sanskrit text
        "LLi"   :   "\u0A8C", // ઌ GUJARATI LETTER VOCALIC L • used with Sanskrit text
        "a.c"   :   "\u0A8D", // ઍ GUJARATI VOWEL CANDRA E ** Manual Change ***
        //""    :   "\u0A8E", // " <reserved>
        "e"     :   "\u0A8F", // એ GUJARATI LETTER E ** Manual Change ***
        "E"     :   "\u0A8F", // એ GUJARATI LETTER E
        "ee"    :   "\u0A8F", // એ GUJARATI LETTER E
        "ai"    :   "\u0A90", // ઐ GUJARATI LETTER AI
        "A.c"   :   "\u0A91", // ઑ GUJARATI VOWEL CANDRA O ** Manual Change ***
        "aa.c"  :   "\u0A91", // ઑ GUJARATI VOWEL CANDRA O ** Manual Change ***
        //""    :   "\u0A92", // " <reserved>
        "o"     :   "\u0A93", // ઓ GUJARATI LETTER O ** Manual Change ***
        "O"     :   "\u0A93", // ઓ GUJARATI LETTER O
        "oo"    :   "\u0A93", // ઓ GUJARATI LETTER O
        "au"    :   "\u0A94", // ઔ GUJARATI LETTER AU

        // Additional vowels for Sanskrit
        "R^I"   :   "\u0AE0", // ૠ GUJARATI LETTER VOCALIC RR
        "RRI"   :   "\u0AE0", // ૠ GUJARATI LETTER VOCALIC RR
        "L^I"   :   "\u0AE1", // ૡ GUJARATI LETTER VOCALIC LL
        "LLI"   :   "\u0AE1", // ૡ GUJARATI LETTER VOCALIC LL

        // Various signs
        "OM"    :   "\u0AD0", // ૐ GUJARATI OM
        "ooM"   :   "\u0AD0", // ૐ GUJARATI OM
        "AUM"   :   "\u0AD0"  // ૐ GUJARATI OM
    },

    "Dependent_vowel": { // +()
        // Dependent vowel signs
        "a"     :   "",       // ADDED
        "A"     :   "\u0ABE", // $ા GUJARATI VOWEL SIGN AA
        "aa"    :   "\u0ABE", // $ા GUJARATI VOWEL SIGN AA
        "i"     :   "\u0ABF", // $િ GUJARATI VOWEL SIGN I • stands to the left of the consonant
        "I"     :   "\u0AC0", // $ી GUJARATI VOWEL SIGN II
        "ii"    :   "\u0AC0", // $ી GUJARATI VOWEL SIGN II
        "u"     :   "\u0AC1", // $ુ GUJARATI VOWEL SIGN U
        "U"     :   "\u0AC2", // $ૂ GUJARATI VOWEL SIGN UU
        "uu"    :   "\u0AC2", // $ૂ GUJARATI VOWEL SIGN UU
        "R^i"   :   "\u0AC3", // $ૃ GUJARATI VOWEL SIGN VOCALIC R
        "RRi"   :   "\u0AC3", // $ૃ GUJARATI VOWEL SIGN VOCALIC R
        "R^I"   :   "\u0AC4", // $ૄ GUJARATI VOWEL SIGN VOCALIC RR
        "RRI"   :   "\u0AC4", // $ૄ GUJARATI VOWEL SIGN VOCALIC RR
        "a.c"   :   "\u0AC5", // $ૅ GUJARATI VOWEL SIGN CANDRA E ** Manual Change ***
        //""    :   "\u0AC6", // " <reserved>
        "e"     :   "\u0AC7", // $ે GUJARATI VOWEL SIGN E ** Manual Change ***
        "E"     :   "\u0AC7", // $ે GUJARATI VOWEL SIGN E
        "ee"    :   "\u0AC7", // $ે GUJARATI VOWEL SIGN E
        "ai"    :   "\u0AC8", // $ૈ GUJARATI VOWEL SIGN AI
        "A.c"   :   "\u0AC9", // $ૉ GUJARATI VOWEL SIGN CANDRA O ** Manual Change ***
        "aa.c"  :   "\u0AC9", // $ૉ GUJARATI VOWEL SIGN CANDRA O ** Manual Change ***
        //""    :   "\u0ACA", // " <reserved>
        "o"     :   "\u0ACB", // $ો GUJARATI VOWEL SIGN O ** Manual Change ***
        "O"     :   "\u0ACB", // $ો GUJARATI VOWEL SIGN O
        "oo"    :   "\u0ACB", // $ો GUJARATI VOWEL SIGN O
        "au"    :   "\u0ACC", // $ૌ GUJARATI VOWEL SIGN AU

        // Additional vowels for Sanskrit
        "L^i"   :   "\u0AE2", // $ૢ GUJARATI VOWEL SIGN VOCALIC L
        "LLi"   :   "\u0AE2", // $ૢ GUJARATI VOWEL SIGN VOCALIC L
        "L^I"   :   "\u0AE3", // $ૣ GUJARATI VOWEL SIGN VOCALIC LL
        "LLI"   :   "\u0AE3"  // $ૣ GUJARATI VOWEL SIGN VOCALIC LL
    },

    "Consonants": { // ()+
        // Consonants
        "k"     :   "\u0A95", // ક GUJARATI LETTER KA
        "kh"    :   "\u0A96", // ખ GUJARATI LETTER KHA
        "g"     :   "\u0A97", // ગ GUJARATI LETTER GA
        "gh"    :   "\u0A98", // ઘ GUJARATI LETTER GHA
        "~N"    :   "\u0A99", // ઙ GUJARATI LETTER NGA
        "N^"    :   "\u0A99", // ઙ GUJARATI LETTER NGA
        "ch"    :   "\u0A9A", // ચ GUJARATI LETTER CA
        "chh"   :   "\u0A9B", // છ GUJARATI LETTER CHA
        "Ch"    :   "\u0A9B", // છ GUJARATI LETTER CHA
        "j"     :   "\u0A9C", // જ GUJARATI LETTER JA
        "jh"    :   "\u0A9D", // ઝ GUJARATI LETTER JHA
        "~n"    :   "\u0A9E", // ઞ GUJARATI LETTER NYA
        "n^"    :   "\u0A9E", // ઞ GUJARATI LETTER NYA
        "JN"    :   "\u0A9E", // ઞ GUJARATI LETTER NYA
        "T"     :   "\u0A9F", // ટ GUJARATI LETTER TTA
        "Th"    :   "\u0AA0", // ઠ GUJARATI LETTER TTHA
        "D"     :   "\u0AA1", // ડ GUJARATI LETTER DDA
        "Dh"    :   "\u0AA2", // ઢ GUJARATI LETTER DDHA
        "N"     :   "\u0AA3", // ણ GUJARATI LETTER NNA
        "t"     :   "\u0AA4", // ત GUJARATI LETTER TA
        "th"    :   "\u0AA5", // થ GUJARATI LETTER THA
        "d"     :   "\u0AA6", // દ GUJARATI LETTER DA
        "dh"    :   "\u0AA7", // ધ GUJARATI LETTER DHA
        "n"     :   "\u0AA8", // ન GUJARATI LETTER NA
        //""    :   "\u0AA9", // " <reserved>
        "p"     :   "\u0AAA", // પ GUJARATI LETTER PA
        "ph"    :   "\u0AAB", // ફ GUJARATI LETTER PHA
        "b"     :   "\u0AAC", // બ GUJARATI LETTER BA
        "bh"    :   "\u0AAD", // ભ GUJARATI LETTER BHA
        "m"     :   "\u0AAE", // મ GUJARATI LETTER MA
        "y"     :   "\u0AAF", // ય GUJARATI LETTER YA
        "r"     :   "\u0AB0", // ર GUJARATI LETTER RA
        //""    :   "\u0AB1", // " <reserved>
        "l"     :   "\u0AB2", // લ GUJARATI LETTER LA
        "L"     :   "\u0AB3", // ળ GUJARATI LETTER LLA
        //"ld"  :   "\u0AB3", // ળ GUJARATI LETTER LLA
        //""    :   "\u0AB4", // " <reserved>
        "w"     :   "\u0AB5", // વ GUJARATI LETTER VA
        "v"     :   "\u0AB5", // વ GUJARATI LETTER VA
        "sh"    :   "\u0AB6", // શ GUJARATI LETTER SHA
        "Sh"    :   "\u0AB7", // ષ GUJARATI LETTER SSA
        "shh"   :   "\u0AB7", // ષ GUJARATI LETTER SSA
        "s"     :   "\u0AB8", // સ GUJARATI LETTER SA
        "h"     :   "\u0AB9", // હ GUJARATI LETTER HA

        // Manually Added
        "x"     :   "\u0A95"+"\u0ACD"+"\u0AB7", // క్ష
        //"kSh" :   "\u0A95"+"\u0ACD"+"\u0AB7", // క్ష   (redundant)
        "GY"    :   "\u0A9C"+"\u0ACD"+"\u0A9E"  //
        //"j~n" :   "\u0A9C"+"\u0ACD"+"\u0A9E", // (redundant)
    },

    "Others": { // ()
        // copied from Dependent vowels, for handling individual charecters
        ".c"    :   "\u0AC5", // $ૅ GUJARATI VOWEL SIGN CANDRA E ** Manual Change ***

        // Various signs
        ".N"    :   "\u0A81", // $ઁ GUJARATI SIGN CANDRABINDU
        ".m"    :   "\u0A82", // $ં GUJARATI SIGN ANUSVARA
        ".n"    :   "\u0A82", // $ં GUJARATI SIGN ANUSVARA
        "M"     :   "\u0A82", // $ં GUJARATI SIGN ANUSVARA
        "H"     :   "\u0A83", // $ઃ GUJARATI SIGN VISARGA
        ".a"    :   "\u0ABD", // ઽ GUJARATI SIGN AVAGRAHA
        ".h"    :   "\u0ACD", // $ GUJARATI SIGN VIRAMA

        // Various signs
        "\u0323":   "\u0ABC", // $઼ GUJARATI SIGN NUKTA • for extending the alphabet to new letters

        // Reserved // For viram punctuation, use the generic Indic 0964 and 0965.
        //""    :   "\u0AE4", // " <reserved> → 0964 ।  devanagari danda
        //""    :   "\u0AE5", // " <reserved> → 0965 ॥  devanagari double danda

        // Digits
        "0"     :   "\u0AE6", // ૦ GUJARATI DIGIT ZERO
        "1"     :   "\u0AE7", // ૧ GUJARATI DIGIT ONE
        "2"     :   "\u0AE8", // ૨ GUJARATI DIGIT TWO
        "3"     :   "\u0AE9", // ૩ GUJARATI DIGIT THREE
        "4"     :   "\u0AEA", // ૪ GUJARATI DIGIT FOUR
        "5"     :   "\u0AEB", // ૫ GUJARATI DIGIT FIVE
        "6"     :   "\u0AEC", // ૬ GUJARATI DIGIT SIX
        "7"     :   "\u0AED", // ૭ GUJARATI DIGIT SEVEN
        "8"     :   "\u0AEE", // ૮ GUJARATI DIGIT EIGHT
        "9"     :   "\u0AEF", // ૯ GUJARATI DIGIT NINE

        // Abbreviation sign
        //""    :   "\u0AF0", // ૰ GUJARATI ABBREVIATION SIGN

        // Currency sign
        //""    :   "\u0AF1", // ૱ GUJARATI RUPEE SIGN • preferred spelling is 0AB0 ર   0AC2 $ૂ   0AF0 ૰

        // Sign: Manually added from Devanagari
        ","     :   "\u0964", // । DEVANAGARI DANDA = purna viram • phrase separator
        "."     :   "\u0965"  // ॥ DEVANAGARI DOUBLE DANDA = deergh viram
    },

    // Virama
    "VIRAMA"    :   "\u0ACD"  // $ GUJARATI SIGN VIRAMA
};

var tamil_dict = {
    // http://www.aczoom.com/itrans/html/tamil/node5.html

    "Independent_vowels": { // -()
        // Independent vowels
        "a"     :   "\u0B85", // அ TAMIL LETTER A
        "A"     :   "\u0B86", // ஆ TAMIL LETTER AA
        "aa"    :   "\u0B86", // ஆ TAMIL LETTER AA
        "i"     :   "\u0B87", // இ TAMIL LETTER I
        "I"     :   "\u0B88", // ஈ TAMIL LETTER II
        "ii"    :   "\u0B88", // ஈ TAMIL LETTER II
        "u"     :   "\u0B89", // உ TAMIL LETTER U
        "U"     :   "\u0B8A", // ஊ TAMIL LETTER UU
        "uu"    :   "\u0B8A", // ஊ TAMIL LETTER UU
        //""    :   "\u0B8B", // " <reserved>
        //""    :   "\u0B8C", // " <reserved>
        //""    :   "\u0B8D", // " <reserved>
        "e"     :   "\u0B8E", // எ TAMIL LETTER E
        "E"     :   "\u0B8F", // ஏ TAMIL LETTER EE
        "ee"    :   "\u0B8F", // ஏ TAMIL LETTER EE
        "ai"    :   "\u0B90", // ஐ TAMIL LETTER AI
        //""    :   "\u0B91", // " <reserved>
        "o"     :   "\u0B92", // ஒ TAMIL LETTER O
        "O"     :   "\u0B93", // ஓ TAMIL LETTER OO
        "oo"    :   "\u0B93", // ஓ TAMIL LETTER OO
        "au"    :   "\u0B94", // ஔ TAMIL LETTER AU ≡ 0B92 ஒ   0BD7 $ௗ

        // Various signs
        "OM"    :   "\u0BD0", // ௐ TAMIL OM
        "ooM"   :   "\u0BD0", // ௐ TAMIL OM
        "AUM"   :   "\u0BD0"  // ௐ TAMIL OM
    },

    "Dependent_vowel": { // +()
        // Dependent vowel signs
        "a"     :   "",       // ADDED
        "A"     :   "\u0BBE", // $ா TAMIL VOWEL SIGN AA
        "aa"    :   "\u0BBE", // $ா TAMIL VOWEL SIGN AA
        "i"     :   "\u0BBF", // $ி TAMIL VOWEL SIGN I
        "I"     :   "\u0BC0", // $ீ TAMIL VOWEL SIGN II
        "ii"    :   "\u0BC0", // $ீ TAMIL VOWEL SIGN II
        "u"     :   "\u0BC1", // $ு TAMIL VOWEL SIGN U
        "U"     :   "\u0BC2", // $ூ TAMIL VOWEL SIGN UU
        "uu"    :   "\u0BC2", // $ூ TAMIL VOWEL SIGN UU
        //""    :   "\u0BC3", // " <reserved>
        //""    :   "\u0BC4", // " <reserved>
        //""    :   "\u0BC5", // " <reserved>
        "e"     :   "\u0BC6", // $ெ TAMIL VOWEL SIGN E • stands to the left of the consonant
        "E"     :   "\u0BC7", // $ே TAMIL VOWEL SIGN EE • stands to the left of the consonant
        "ee"    :   "\u0BC7", // $ே TAMIL VOWEL SIGN EE • stands to the left of the consonant
        "ai"    :   "\u0BC8", // $ை TAMIL VOWEL SIGN AI • stands to the left of the consonant

        // Two-part dependent vowel signs
        // These vowel signs have glyph pieces which stand on both sides of the consonant; they follow the consonant in logical order, and should be handled as a unit for most processing.
        "o"     :   "\u0BCA", // $ொ TAMIL VOWEL SIGN O ≡ 0BC6   $ெ   0BBE $ா
        "O"     :   "\u0BCB", // $ோ TAMIL VOWEL SIGN OO ≡ 0BC7   $ே   0BBE $ா
        "oo"    :   "\u0BCB", // $ோ TAMIL VOWEL SIGN OO ≡ 0BC7   $ே   0BBE $ா
        "au"    :   "\u0BCC"  // $ௌ TAMIL VOWEL SIGN AU ≡ 0BC6   $ெ   0BD7 $ௗ
    },

    "Consonants": { // ()+
        // Consonants
        "k"     :   "\u0B95", // க TAMIL LETTER KA
        "kh"    :   "\u0B95", // க TAMIL LETTER KA
        "g"     :   "\u0B95", // க TAMIL LETTER KA
        "gh"    :   "\u0B95", // க TAMIL LETTER KA
        //""    :   "\u0B96", // " <reserved>
        //""    :   "\u0B97", // " <reserved>
        //""    :   "\u0B98", // " <reserved>
        "~N"    :   "\u0B99", // ங TAMIL LETTER NGA
        "N^"    :   "\u0B99", // ங TAMIL LETTER NGA
        "ch"    :   "\u0B9A", // ச TAMIL LETTER CA
        "Ch"    :   "\u0B9A", // ச TAMIL LETTER CA
        "chh"   :   "\u0B9A", // ச TAMIL LETTER CA
        //""    :   "\u0B9B", // " <reserved>
        "j"     :   "\u0B9C", // ஜ TAMIL LETTER JA
        "jh"    :   "\u0B9C", // ஜ TAMIL LETTER JA
        //""    :   "\u0B9D", // " <reserved>
        "~n"    :   "\u0B9E", // ஞ TAMIL LETTER NYA
        "n^"    :   "\u0B9E", // ஞ TAMIL LETTER NYA
        "JN"    :   "\u0B9E", // ஞ TAMIL LETTER NYA
        "T"     :   "\u0B9F", // ட TAMIL LETTER TTA
        "Th"    :   "\u0B9F", // ட TAMIL LETTER TTA
        "D"     :   "\u0B9F", // ட TAMIL LETTER TTA
        "Dh"    :   "\u0B9F", // ட TAMIL LETTER TTA
        //""    :   "\u0BA0", // " <reserved>
        //""    :   "\u0BA1", // " <reserved>
        //""    :   "\u0BA2", // " <reserved>
        "N"     :   "\u0BA3", // ண TAMIL LETTER NNA
        "t"     :   "\u0BA4", // த TAMIL LETTER TA
        "th"    :   "\u0BA4", // த TAMIL LETTER TA
        "d"     :   "\u0BA4", // த TAMIL LETTER TA
        "dh"    :   "\u0BA4", // த TAMIL LETTER TA
        //""    :   "\u0BA5", // " <reserved>
        //""    :   "\u0BA6", // " <reserved>
        //""    :   "\u0BA7", // " <reserved>
        "n"     :   "\u0BA8", // ந TAMIL LETTER NA
        "^n"    :   "\u0BA9", // ன TAMIL LETTER NNNA
        "p"     :   "\u0BAA", // ப TAMIL LETTER PA
        "ph"    :   "\u0BAA", // ப TAMIL LETTER PA
        "b"     :   "\u0BAA", // ப TAMIL LETTER PA
        "bh"    :   "\u0BAA", // ப TAMIL LETTER PA
        //""    :   "\u0BAB", // " <reserved>
        //""    :   "\u0BAC", // " <reserved>
        //""    :   "\u0BAD", // " <reserved>
        "m"     :   "\u0BAE", // ம TAMIL LETTER MA
        "y"     :   "\u0BAF", // ய TAMIL LETTER YA
        "r"     :   "\u0BB0", // ர TAMIL LETTER RA
        "R"     :   "\u0BB1", // ற TAMIL LETTER RRA
        "l"     :   "\u0BB2", // ல TAMIL LETTER LA
        "L"     :   "\u0BB3", // ள TAMIL LETTER LLA
        //"ld"  :   "\u0BB3", // ள TAMIL LETTER LLA
        //""    :   "\u0BB4", // ழ TAMIL LETTER LLLA
        "w"     :   "\u0BB5", // வ TAMIL LETTER VA
        "v"     :   "\u0BB5", // வ TAMIL LETTER VA
        "sh"    :   "\u0BB6", // ஶ TAMIL LETTER SHA
        "Sh"    :   "\u0BB7", // ஷ TAMIL LETTER SSA
        "shh"   :   "\u0BB7", // ஷ TAMIL LETTER SSA
        "s"     :   "\u0BB8", // ஸ TAMIL LETTER SA
        "h"     :   "\u0BB9", // ஹ TAMIL LETTER HA
        // Manually Added
        "x"     :   "\u0B95"+"\u0BCD"+"\u0BB7", // క్ష
        //"kSh" :   "\u0B95"+"\u0BCD"+"\u0BB7", // క్ష   (redundant)
        "GY"    :   "\u0B9C"+"\u0BCD"+"\u0B9E"  //
        //"j~n" :   "\u0B9C"+"\u0BCD"+"\u0B9E", // (redundant)
    },

    "Others": { // ()
        // Various signs
        // The anusvara should not be confused with the use of a circular glyph for the pulli.
        ".m"    :   "\u0B82", // $ஂ TAMIL SIGN ANUSVARA • not used in Tamil
        ".n"    :   "\u0B82", // $ஂ TAMIL SIGN ANUSVARA • not used in Tamil
        "M"     :   "\u0B82", // $ஂ TAMIL SIGN ANUSVARA • not used in Tamil
        "H"     :   "\u0B83", // ஃ TAMIL SIGN VISARGA = aytham • in fonts which display the Tamil pulli as a ring shape, the glyph for aytham also uses rings
        ".a"    :   "\u0B85", // அ TAMIL LETTER A // ADDED
        ".h"    :   "\u0BCD", // $் TAMIL SIGN VIRAMA = pulli

        // Various signs
        //""    :   "\u0BD1", // " <reserved>
        //""    :   "\u0BD2", // " <reserved>
        //""    :   "\u0BD3", // " <reserved>
        //""    :   "\u0BD4", // " <reserved>
        //""    :   "\u0BD5", // " <reserved>
        //""    :   "\u0BD6", // " <reserved>
        //""    :   "\u0BD7", // $ௗ TAMIL AU LENGTH MARK

        // Reserved
        //For viram punctuation, use the generic Indic 0964 and 0965.
        //""    :   "\u0BE4", // " <reserved> → 0964 ।  devanagari danda
        //""    :   "\u0BE5", // " <reserved> → 0965 ॥  devanagari double danda

        // Digits
        "0"     :   "\u0BE6", // ௦ TAMIL DIGIT ZERO
        "1"     :   "\u0BE7", // ௧ TAMIL DIGIT ONE
        "2"     :   "\u0BE8", // ௨ TAMIL DIGIT TWO
        "3"     :   "\u0BE9", // ௩ TAMIL DIGIT THREE
        "4"     :   "\u0BEA", // ௪ TAMIL DIGIT FOUR
        "5"     :   "\u0BEB", // ௫ TAMIL DIGIT FIVE
        "6"     :   "\u0BEC", // ௬ TAMIL DIGIT SIX
        "7"     :   "\u0BED", // ௭ TAMIL DIGIT SEVEN
        "8"     :   "\u0BEE", //௮ TAMIL DIGIT EIGHT
        "9"     :   "\u0BEF", // ௯ TAMIL DIGIT NINE

        // Tamil numerics
        //""    :   "\u0BF0", // ௰ TAMIL NUMBER TEN
        //""    :   "\u0BF1", // ௱ TAMIL NUMBER ONE HUNDRED
        //""    :   "\u0BF2", // ௲ TAMIL NUMBER ONE THOUSAND

        // Tamil symbols
        //""    :   "\u0BF3", // ௳ TAMIL DAY SIGN = naal
        //""    :   "\u0BF4", // ௴ TAMIL MONTH SIGN = maatham
        //""    :   "\u0BF5", // ௵ TAMIL YEAR SIGN = varudam
        //""    :   "\u0BF6", // ௶ TAMIL DEBIT SIGN = patru
        //""    :   "\u0BF7", // ௷ TAMIL CREDIT SIGN = varavu
        //""    :   "\u0BF8", // ௸ TAMIL AS ABOVE SIGN = merpadi
        // Currency symbol
        //""    :   "\u0BF9", // ௹ TAMIL RUPEE SIGN = rupai

        // Tamil symbol
        //""    :   "\u0BFA", // ௺ TAMIL NUMBER SIGN = enn

        // Sign: Manually added from Devanagari
        ","     :   "\u0964", // । DEVANAGARI DANDA = purna viram • phrase separator
        "."     :   "\u0965"  // ॥ DEVANAGARI DOUBLE DANDA = deergh viram
    },

    // Virama   // The Tamil pulli usually displays as a dot above, but in some fonts displays as a ring above. Do not use 0B82 to represent a ring-shaped pulli.
    "VIRAMA"    :   "\u0BCD"  // $் TAMIL SIGN VIRAMA = pulli
};

var kannada_dict = {
    // http://www.aczoom.com/itrans/html/kantex/node2.html

    "Independent_vowels": { // -()
        // Independent vowels
        "a"     :   "\u0C85", // ಅ KANNADA LETTER A
        "A"     :   "\u0C86", // ಆ KANNADA LETTER AA
        "aa"    :   "\u0C86", // ಆ KANNADA LETTER AA
        "i"     :   "\u0C87", // ಇ KANNADA LETTER I
        "I"     :   "\u0C88", // ಈ KANNADA LETTER II
        "ii"    :   "\u0C88", // ಈ KANNADA LETTER II
        "u"     :   "\u0C89", // ಉ KANNADA LETTER U
        "U"     :   "\u0C8A", // ಊ KANNADA LETTER UU
        "uu"    :   "\u0C8A", // ಊ KANNADA LETTER UU
        "R^i"   :   "\u0C8B", // ಋ KANNADA LETTER VOCALIC R
        "RRi"   :   "\u0C8B", // ಋ KANNADA LETTER VOCALIC R
        "L^i"   :   "\u0C8C", // ಌ KANNADA LETTER VOCALIC L
        "LLi"   :   "\u0C8C", // ಌ KANNADA LETTER VOCALIC L
        //""    :   "\u0C8D", // " <reserved>
        "e"     :   "\u0C8E", // ಎ KANNADA LETTER E
        "E"     :   "\u0C8F", // ಏ KANNADA LETTER EE
        "ee"    :   "\u0C8F", // ಏ KANNADA LETTER EE
        "ai"    :   "\u0C90", // ಐ KANNADA LETTER AI
        //""    :   "\u0C91", // " <reserved>
        "o"     :   "\u0C92", // ಒ KANNADA LETTER O
        "O"     :   "\u0C93", // ಓ KANNADA LETTER OO
        "oo"    :   "\u0C93", // ಓ KANNADA LETTER OO
        "au"    :   "\u0C94", // ಔ KANNADA LETTER AU

        // Additional vowels for Sanskrit
        "R^I"   :   "\u0CE0", // ೠ KANNADA LETTER VOCALIC RR
        "RRI"   :   "\u0CE0", // ೠ KANNADA LETTER VOCALIC RR
        "L^I"   :   "\u0CE1", // ೡ KANNADA LETTER VOCALIC LL
        "LLI"   :   "\u0CE1", // ೡ KANNADA LETTER VOCALIC LL

        // Sign: Manually added from Devanagari
        "OM"    :   "\u0950", // ॐ
        "ooM"   :   "\u0950", // ॐ
        "AUM"   :   "\u0950"  // ॐ
    },

    "Dependent_vowel": { // +()
        // Dependent vowel signs
        "a"     :   "",       // ADDED
        "A"     :   "\u0CBE", // $ಾ KANNADA VOWEL SIGN AA
        "aa"    :   "\u0CBE", // $ಾ KANNADA VOWEL SIGN AA
        "i"     :   "\u0CBF", // $ಿ KANNADA VOWEL SIGN I
        "I"     :   "\u0CC0", // $ೀ KANNADA VOWEL SIGN II ≡ 0CBF $ಿ  0CD5 $ೕ
        "ii"    :   "\u0CC0", // $ೀ KANNADA VOWEL SIGN II ≡ 0CBF $ಿ  0CD5 $ೕ
        "u"     :   "\u0CC1", // $ು KANNADA VOWEL SIGN U
        "U"     :   "\u0CC2", // $ೂ KANNADA VOWEL SIGN UU
        "uu"    :   "\u0CC2", // $ೂ KANNADA VOWEL SIGN UU
        "R^i"   :   "\u0CC3", // $ೃ KANNADA VOWEL SIGN VOCALIC R
        "RRi"   :   "\u0CC3", // $ೃ KANNADA VOWEL SIGN VOCALIC R
        "R^I"   :   "\u0CC4", // $ೄ KANNADA VOWEL SIGN VOCALIC RR
        "RRI"   :   "\u0CC4", // $ೄ KANNADA VOWEL SIGN VOCALIC RR
        //""    :   "\u0CC5", // " <reserved>
        "e"     :   "\u0CC6", // $ೆ KANNADA VOWEL SIGN E
        "E"     :   "\u0CC7", // $ೇ KANNADA VOWEL SIGN EE ≡ 0CC6 $ೆ   0CD5 $ೕ
        "ee"    :   "\u0CC7", // $ೇ KANNADA VOWEL SIGN EE ≡ 0CC6 $ೆ   0CD5 $ೕ
        "ai"    :   "\u0CC8", // $ೈ KANNADA VOWEL SIGN AI ≡ 0CC6 $ೆ   0CD6 $ೖ
        //""    :   "\u0CC9", // " <reserved>
        "o"     :   "\u0CCA", // $ೊ KANNADA VOWEL SIGN O ≡ 0CC6 $ೆ   0CC2 $ೂ
        "O"     :   "\u0CCB", // $ೋ KANNADA VOWEL SIGN OO ≡ 0CCA $ೊ  0CD5 $ೕ
        "oo"    :   "\u0CCB", // $ೋ KANNADA VOWEL SIGN OO ≡ 0CCA $ೊ  0CD5 $ೕ
        "au"    :   "\u0CCC", // $ೌ KANNADA VOWEL SIGN AU

        // Dependent vowels
        "L^i"   :   "\u0CE2", // ೢ KANNADA VOWEL SIGN VOCALIC L
        "LLi"   :   "\u0CE2", // ೢ KANNADA VOWEL SIGN VOCALIC L
        "L^I"   :   "\u0CE3", // ೣ KANNADA VOWEL SIGN VOCALIC LL
        "LLI"   :   "\u0CE3"  // ೣ KANNADA VOWEL SIGN VOCALIC LL
    },

    "Consonants": { // ()+
        // Consonants
        "k"     :   "\u0C95", // ಕ KANNADA LETTER KA
        "kh"    :   "\u0C96", // ಖ KANNADA LETTER KHA
        "g"     :   "\u0C97", // ಗ KANNADA LETTER GA
        "gh"    :   "\u0C98", // ಘ KANNADA LETTER GHA
        "~N"    :   "\u0C99", // ಙ KANNADA LETTER NGA
        "N^"    :   "\u0C99", // ಙ KANNADA LETTER NGA
        "ch"    :   "\u0C9A", // ಚ KANNADA LETTER CA
        "Ch"    :   "\u0C9B", // ಛ KANNADA LETTER CHA
        "chh"   :   "\u0C9B", // ಛ KANNADA LETTER CHA
        "j"     :   "\u0C9C", // ಜ KANNADA LETTER JA
        "jh"    :   "\u0C9D", // ಝ KANNADA LETTER JHA
        "~n"    :   "\u0C9E", // ಞ KANNADA LETTER NYA
        "n^"    :   "\u0C9E", // ಞ KANNADA LETTER NYA
        "JN"    :   "\u0C9E", // ಞ KANNADA LETTER NYA
        "T"     :   "\u0C9F", // ಟ KANNADA LETTER TTA
        "Th"    :   "\u0CA0", // ಠ KANNADA LETTER TTHA
        "D"     :   "\u0CA1", // ಡ KANNADA LETTER DDA
        "Dh"    :   "\u0CA2", // ಢ KANNADA LETTER DDHA
        "N"     :   "\u0CA3", // ಣ KANNADA LETTER NNA
        "t"     :   "\u0CA4", // ತ KANNADA LETTER TA
        "th"    :   "\u0CA5", // ಥ KANNADA LETTER THA
        "d"     :   "\u0CA6", // ದ KANNADA LETTER DA
        "dh"    :   "\u0CA7", // ಧ KANNADA LETTER DHA
        "n"     :   "\u0CA8", // ನ KANNADA LETTER NA
        //""    :   "\u0CA9", // " <reserved>
        "p"     :   "\u0CAA", // ಪ KANNADA LETTER PA
        "ph"    :   "\u0CAB", // ಫ KANNADA LETTER PHA
        "b"     :   "\u0CAC", // ಬ KANNADA LETTER BA
        "bh"    :   "\u0CAD", // ಭ KANNADA LETTER BHA
        "m"     :   "\u0CAE", // ಮ KANNADA LETTER MA
        "y"     :   "\u0CAF", // ಯ KANNADA LETTER YA
        "r"     :   "\u0CB0", // ರ KANNADA LETTER RA
        "R"     :   "\u0CB1", // ಱ KANNADA LETTER RRA
        "l"     :   "\u0CB2", // ಲ KANNADA LETTER LA
        "L"     :   "\u0CB3", // ಳ KANNADA LETTER LLA
        //"ld"  :   "\u0CB3", // ಳ KANNADA LETTER LLA
        //""    :   "\u0CB4", // " <reserved>
        "w"     :   "\u0CB5", // ವ KANNADA LETTER VA
        "v"     :   "\u0CB5", // ವ KANNADA LETTER VA
        "sh"    :   "\u0CB6", // ಶ KANNADA LETTER SHA
        "Sh"    :   "\u0CB7", // ಷ KANNADA LETTER SSA
        "shh"   :   "\u0CB7", // ಷ KANNADA LETTER SSA
        "s"     :   "\u0CB8", // ಸ KANNADA LETTER SA
        "h"     :   "\u0CB9", // ಹ KANNADA LETTER HA

        // Manually Added
        "x"     :   "\u0C95"+"\u0CCD"+"\u0CB7", // క్ష
        //"kSh" :   "\u0C95"+"\u0CCD"+"\u0CB7", // క్ష   (redundant)
        "GY"    :   "\u0C9C"+"\u0CCD"+"\u0C9E"  //
        //"j~n" :   "\u0C9C"+"\u0CCD"+"\u0C9E", // (redundant)
    },

    "Others": { // ()
        // Various signs
        ".m"    :   "\u0C82", // $ಂ KANNADA SIGN ANUSVARA
        ".n"    :   "\u0C82", // $ಂ KANNADA SIGN ANUSVARA
        "M"     :   "\u0C82", // $ಂ KANNADA SIGN ANUSVARA
        "H"     :   "\u0C83", // $ಃ KANNADA SIGN VISARGA
        ".a"    :   "\u0CBD", // ಽ KANNADA SIGN AVAGRAHA
        ".h"    :   "\u0CCD", // $ KANNADA SIGN VIRAMA • preferred name is halant

        // Various signs
        "\u0323":   "\u0CBC", // $಼ KANNADA SIGN NUKTA

        // Various signs
        //""    :   "\u0CD5", // $ೕ KANNADA LENGTH MARK
        //""    :   "\u0CD6", // $ೖ KANNADA AI LENGTH MARK

        // Additional consonants
        //""    :   "\u0CDE", // ೞ KANNADA LETTER FA ※ KANNADA LETTER LLLA • obsolete historic letter • name is a mistake for LLLA

        // Reserved
        // For viram punctuation, use the generic Indic 0964 and 0965.
        //""    :   "\u0CE4", // " <reserved> → 0964 ।  devanagari danda
        //""    :   "\u0CE5", // " <reserved> → 0965 ॥  devanagari double danda

        // Digits
        "0"     :   "\u0CE6", // ೦ KANNADA DIGIT ZERO
        "1"     :   "\u0CE7", // ೧ KANNADA DIGIT ONE
        "2"     :   "\u0CE8", // ೨ KANNADA DIGIT TWO
        "3"     :   "\u0CE9", // ೩ KANNADA DIGIT THREE
        "4"     :   "\u0CEA", // ೪ KANNADA DIGIT FOUR
        "5"     :   "\u0CEB", // ೫ KANNADA DIGIT FIVE
        "6"     :   "\u0CEC", // ೬ KANNADA DIGIT SIX
        "7"     :   "\u0CED", // ೭ KANNADA DIGIT SEVEN
        "8"     :   "\u0CEE", // ೮ KANNADA DIGIT EIGHT
        "9"     :   "\u0CEF", // ೯ KANNADA DIGIT NINE

        // Signs used in Sanskrit
        //""    :   "\u0CF1", // ೱ KANNADA SIGN JIHVAMULIYA → 1CF5 ᳵ  vedic sign jihvamuliya
        //""    :   "\u0CF2", // ೲ KANNADA SIGN UPADHMANIYA → 1CF6 ᳶ  vedic sign upadhmaniya

        // Sign: Manually added from Devanagari
        ","     :   "\u0964", // । DEVANAGARI DANDA = purna viram • phrase separator
        "."     :   "\u0965"  // ॥ DEVANAGARI DOUBLE DANDA = deergh viram
    },

    // Virama
    "VIRAMA"    :   "\u0CCD" // $ KANNADA SIGN VIRAMA • preferred name is halant
};

var bengali_dict = {
    //http://www.aczoom.com/itrans/html/beng/node4.html
    "Independent_vowels": { // -()
        // Independent vowels
        "a"     :   "\u0985", // অ BENGALI LETTER A
        "A"     :   "\u0986", // আ BENGALI LETTER AA
        "aa"    :   "\u0986", // আ BENGALI LETTER AA
        "i"     :   "\u0987", // ই BENGALI LETTER I
        "I"     :   "\u0988", // ঈ BENGALI LETTER II
        "ii"    :   "\u0988", // ঈ BENGALI LETTER II
        "u"     :   "\u0989", // উ BENGALI LETTER U
        "U"     :   "\u098A", // ঊ BENGALI LETTER UU
        "uu"    :   "\u098A", // ঊ BENGALI LETTER UU
        "R^i"   :   "\u098B", // ঋ BENGALI LETTER VOCALIC R
        "RRi"   :   "\u098B", // ঋ BENGALI LETTER VOCALIC R
        "L^i"   :   "\u098C", // ঌ BENGALI LETTER VOCALIC L
        "LLi"   :   "\u098C", // ঌ BENGALI LETTER VOCALIC L
        //""    :   "\u098D", // " <reserved>
        //""    :   "\u098E", // " <reserved>
        "e"     :   "\u098F", // এ BENGALI LETTER E ** Manual Change ***
        "E"     :   "\u098F", // এ BENGALI LETTER E
        "ee"    :   "\u098F", // এ BENGALI LETTER E
        "ai"    :   "\u0990", // ঐ BENGALI LETTER AI
        //""    :   "\u0991", // " <reserved>
        //""    :   "\u0992", // " <reserved>
        "o"     :   "\u0993", // ও BENGALI LETTER O ** Manual Change ***
        "O"     :   "\u0993", // ও BENGALI LETTER O
        "oo"    :   "\u0993", // ও BENGALI LETTER O
        "au"    :   "\u0994", // ঔ BENGALI LETTER AU

        // Additional vowels for Sanskrit
        "R^I"   :   "\u09E0", // ৠ BENGALI LETTER VOCALIC RR
        "RRI"   :   "\u09E0", // ৠ BENGALI LETTER VOCALIC RR
        "L^I"   :   "\u09E1", // ৡ BENGALI LETTER VOCALIC LL
        "LLI"   :   "\u09E1", // ৡ BENGALI LETTER VOCALIC LL

        // Sign: Manually added from Devanagari
        "OM"    :   "\u0950", // ॐ
        "ooM"   :   "\u0950", // ॐ
        "AUM"   :   "\u0950"  // ॐ
    },

    "Dependent_vowel": { // +()
        "a"     :   "",       // ADDED
        "A"     :   "\u09BE", // $া BENGALI VOWEL SIGN AA
        "aa"    :   "\u09BE", // $া BENGALI VOWEL SIGN AA
        "i"     :   "\u09BF", // $ি BENGALI VOWEL SIGN I • stands to the left of the consonant
        "I"     :   "\u09C0", // $ী BENGALI VOWEL SIGN II
        "ii"    :   "\u09C0", // $ী BENGALI VOWEL SIGN II
        "u"     :   "\u09C1", // $ু BENGALI VOWEL SIGN U
        "U"     :   "\u09C2", // $ূ BENGALI VOWEL SIGN UU
        "uu"    :   "\u09C2", // $ূ BENGALI VOWEL SIGN UU
        "R^i"   :   "\u09C3", // $ৃ BENGALI VOWEL SIGN VOCALIC R
        "RRi"   :   "\u09C3", // $ৃ BENGALI VOWEL SIGN VOCALIC R
        "R^I"   :   "\u09C4", // $ৄ BENGALI VOWEL SIGN VOCALIC RR
        "RRI"   :   "\u09C4", // $ৄ BENGALI VOWEL SIGN VOCALIC RR
        //""    :   "\u09C5", // " <reserved>
        //""    :   "\u09C6", // " <reserved>
        "e"     :   "\u09C7", // $ে BENGALI VOWEL SIGN E • stands to the left of the consonant ** Manual Change ***
        "E"     :   "\u09C7", // $ে BENGALI VOWEL SIGN E • stands to the left of the consonant
        "ee"    :   "\u09C7", // $ে BENGALI VOWEL SIGN E • stands to the left of the consonant
        "ai"    :   "\u09C8", // $ৈ BENGALI VOWEL SIGN AI • stands to the left of the consonant

        // Sign
        "au"    :   "\u09D7", // $ৗ BENGALI AU LENGTH MARK

        // Additional vowels for Sanskrit
        "L^i"   :   "\u09E2", // $ৢ BENGALI VOWEL SIGN VOCALIC L
        "LLi"   :   "\u09E2", // $ৢ BENGALI VOWEL SIGN VOCALIC L
        "L^I"   :   "\u09E3", // $ৣ BENGALI VOWEL SIGN VOCALIC LL
        "LLI"   :   "\u09E3", // $ৣ BENGALI VOWEL SIGN VOCALIC LL

        // Two-part dependent vowel signs These vowel signs have glyph pieces which stand on both sides of the consonant; they follow the consonant in logical order, and should be handled as a unit for most processing.
        "o"     :   "\u09CB", // $ো BENGALI VOWEL SIGN O ≡ 09C7   $ে   09BE  $া   ** Manual Change ***
        "O"     :   "\u09CB", // $ো BENGALI VOWEL SIGN O ≡ 09C7   $ে   09BE  $া
        "oo"     :   "\u09CB", // $ো BENGALI VOWEL SIGN O ≡ 09C7   $ে   09BE  $া
        "au"    :   "\u09CC"  // $ৌ BENGALI VOWEL SIGN AU ≡ 09C7   $ে   09D7  $ৗ
    },

    "Consonants": { // ()+
        "k"     :   "\u0995", // ক BENGALI LETTER KA
        "kh"    :   "\u0996", // খ BENGALI LETTER KHA
        "g"     :   "\u0997", // গ BENGALI LETTER GA
        "gh"    :   "\u0998", // ঘ BENGALI LETTER GHA
        "~N"    :   "\u0999", // ঙ BENGALI LETTER NGA
        "N^"    :   "\u0999", // ঙ BENGALI LETTER NGA
        "ch"    :   "\u099A", // চ BENGALI LETTER CA
        "chh"   :   "\u099B", // ছ BENGALI LETTER CHA
        "j"     :   "\u099C", // জ BENGALI LETTER JA
        "jh"    :   "\u099D", // ঝ BENGALI LETTER JHA
        "~n"    :   "\u099E", // ঞ BENGALI LETTER NYA
        "n^"    :   "\u099E", // ঞ BENGALI LETTER NYA
        "JN"    :   "\u099E", // ঞ BENGALI LETTER NYA
        "T"     :   "\u099F", // ট BENGALI LETTER TTA
        "Th"    :   "\u09A0", // ঠ BENGALI LETTER TTHA
        "D"     :   "\u09A1", // ড BENGALI LETTER DDA
        "Dh"    :   "\u09A2", // ঢ BENGALI LETTER DDHA
        "N"     :   "\u09A3", // ণ BENGALI LETTER NNA
        "t"     :   "\u09A4", // ত BENGALI LETTER TA
        "th"    :   "\u09A5", // থ BENGALI LETTER THA
        "d"     :   "\u09A6", // দ BENGALI LETTER DA
        "dh"    :   "\u09A7", // ধ BENGALI LETTER DHA
        "n"     :   "\u09A8", // ন BENGALI LETTER NA
        //""    :   "\u09A9", // " <reserved>
        "p"     :   "\u09AA", // প BENGALI LETTER PA
        "ph"    :   "\u09AB", // ফ BENGALI LETTER PHA
        "w"     :   "\u09AC", // ব BENGALI LETTER BA = Bengali va, wa
        "v"     :   "\u09AC", // ব BENGALI LETTER BA = Bengali va, wa
        "b"     :   "\u09AC", // ব BENGALI LETTER BA = Bengali va, wa
        "bh"    :   "\u09AD", // ভ BENGALI LETTER BHA
        "m"     :   "\u09AE", // ম BENGALI LETTER MA
        "J"     :   "\u09AF", // য BENGALI LETTER YA
        "y"     :   "\u09AF", // য BENGALI LETTER YA
        "r"     :   "\u09B0", // র BENGALI LETTER RA
        //""    :   "\u09B1", // " <reserved>
        "l"     :   "\u09B2", // ল BENGALI LETTER LA
        //""    :   "\u09B3", // " <reserved>
        //""    :   "\u09B4", // " <reserved>
        //""    :   "\u09B5", // " <reserved>
        "sh"    :   "\u09B6", // শ BENGALI LETTER SHA
        "Sh"    :   "\u09B7", // ষ BENGALI LETTER SSA
        "ssh"   :   "\u09B7", // ষ BENGALI LETTER SSA
        "s"     :   "\u09B8", // স BENGALI LETTER SA
        "h"     :   "\u09B9", // হ BENGALI LETTER HA

        // Additional consonants
        "R"     :   "\u09DC", // ড় BENGALI LETTER RRA ≡ 09A1  ড   09BC  $়
        ".D"    :   "\u09DC", // ড় BENGALI LETTER RRA ≡ 09A1  ড   09BC  $়
        ".Dh"   :   "\u09DD", // ঢ় BENGALI LETTER RHA ≡ 09A2  ঢ   09BC  $়
        //""    :   "\u09DE", // " <reserved>
        "Y"     :   "\u09DF", // য় BENGALI LETTER YYA ≡ 09AF  য   09BC  $়

        // Additions for Assamese
        //""    :   "\u09F0", // ৰ BENGALI LETTER RA WITH MIDDLE DIAGONAL
        //""    :   "\u09F1", // ৱ BENGALI LETTER RA WITH LOWER DIAGONAL = bengali letter va with lower diagonal (1.0)

        // Manually Added
        "x"     :   "\u0995"+"\u09CD"+"\u09B7", // क्ष
        //"kSh" :   "\u0995"+"\u09CD"+"\u09B7", // क्ष  (redundant)
        "GY"    :   "\u099C"+"\u09CD"+"\u099E"  //
        //"j~n" :   "\u099C"+"\u09CD"+"\u099E", // (redundant)
    },

    "Others": { // ()
        // Various signs
        ".N"    :   "\u0981", // $ঁ BENGALI SIGN CANDRABINDU
        ".m"    :   "\u0982", // $ং BENGALI SIGN ANUSVARA
        ".n"    :   "\u0982", // $ং BENGALI SIGN ANUSVARA
        "M"     :   "\u0982", // $ং BENGALI SIGN ANUSVARA
        "H"     :   "\u0983", // $ঃ BENGALI SIGN VISARGA
        ".a"    :   "\u09BD", // ঽ BENGALI SIGN AVAGRAHA
        ".h"    :   "\u09CD", // $ BENGALI SIGN VIRAMA

        // Various signs
        "\u0323":   "\u09BC", // $় BENGALI SIGN NUKTA • for extending the alphabet to new letters

        // Additional consonant
        "t"     :  "\u09CE",  // ৎ BENGALI LETTER KHANDA TA • a dead consonant form of ta, without implicit vowel, used in some sequences

        // Reserved For viram punctuation, use the generic Indic 0964 and 0965.
        //""    :   "\u09E4", // " <reserved> → 0964  ।   devanagari danda
        //""    :   "\u09E5", // " <reserved> → 0965  ॥   devanagari double danda

        // Digits
        "0"     :   "\u09E6", // ০ BENGALI DIGIT ZERO
        "1"     :   "\u09E7", // ১ BENGALI DIGIT ONE
        "2"     :   "\u09E8", // ২ BENGALI DIGIT TWO
        "3"     :   "\u09E9", // ৩ BENGALI DIGIT THREE
        "4"     :   "\u09EA", // ৪ BENGALI DIGIT FOUR
        "5"     :   "\u09EB", // ৫ BENGALI DIGIT FIVE
        "6"     :   "\u09EC", // ৬ BENGALI DIGIT SIX
        "7"     :   "\u09ED", // ৭ BENGALI DIGIT SEVEN
        "8"     :   "\u09EE", // ৮ BENGALI DIGIT EIGHT
        "9"     :   "\u09EF", // ৯ BENGALI DIGIT NINE

        // Currency signs
        //""    :   "\u09F2", // ৲ BENGALI RUPEE MARK = taka • historic currency sign
        //""    :   "\u09F3", // ৳ BENGALI RUPEE SIGN = Bangladeshi taka

        // Historic currency sign
        //""    :   "\u09FB", // ৻ BENGALI GANDA MARK

        // Historic symbols for fractional values The use of these signs is not limited to currency, despite the character names.
        //""    :   "\u09F4", // ৴ BENGALI CURRENCY NUMERATOR ONE • not in current usage
        //""    :   "\u09F5", // ৵ BENGALI CURRENCY NUMERATOR TWO • not in current usage
        //""    :   "\u09F6", // ৶ BENGALI CURRENCY NUMERATOR THREE • not in current usage
        //""    :   "\u09F7", // ৷ BENGALI CURRENCY NUMERATOR FOUR
        //""    :   "\u09F8", // ৸ BENGALI CURRENCY NUMERATOR ONE LESS THAN THE DENOMINATOR
        //""    :   "\u09F9", // ৹ BENGALI CURRENCY DENOMINATOR SIXTEEN

        // Sign
        //""    :   "\u09FA", // ৺ BENGALI ISSHAR = ishvar • represents the name of a deity = svargiya • written before the name of a deceased person

        // Sign: Manually added from Devanagari
        ","     :   "\u0964", // । DEVANAGARI DANDA = purna viram • phrase separator
        "."     :   "\u0965"  // ॥ DEVANAGARI DOUBLE DANDA = deergh viram
    },

    // Virama
    "VIRAMA"    :   "\u09CD"  // $ BENGALI SIGN VIRAMA = hasant (Bengali term for halant)
};

var gurmukhi_dict = {
    "Independent_vowels": { // -()
        // Independent vowels
        "a"     :   "\u0A05", // ਅ GURMUKHI LETTER A = aira
        "A"     :   "\u0A06", // ਆ GURMUKHI LETTER AA
        "aa"    :   "\u0A06", // ਆ GURMUKHI LETTER AA
        "i"     :   "\u0A07", // ਇ GURMUKHI LETTER I
        "I"     :   "\u0A08", // ਈ GURMUKHI LETTER II
        "ii"    :   "\u0A08", // ਈ GURMUKHI LETTER II
        "u"     :   "\u0A09", // ਉ GURMUKHI LETTER U
        "U"     :   "\u0A0A", // ਊ GURMUKHI LETTER UU
        "uu"    :   "\u0A0A", // ਊ GURMUKHI LETTER UU
        //""    :   "\u0A0B", // " <reserved>
        //""    :   "\u0A0C", // " <reserved>
        //""    :   "\u0A0D", // " <reserved>
        //""    :   "\u0A0E", // " <reserved>
        "e"     :   "\u0A0F", // ਏ GURMUKHI LETTER EE
        "E"     :   "\u0A0F", // ਏ GURMUKHI LETTER EE
        "ee"    :   "\u0A0F", // ਏ GURMUKHI LETTER EE
        "ai"    :   "\u0A10", // ਐ GURMUKHI LETTER AI
        //""    :   "\u0A11", // " <reserved>
        //""    :   "\u0A12", // " <reserved>
        "o"     :   "\u0A13", // ਓ GURMUKHI LETTER OO
        "O"     :   "\u0A13", // ਓ GURMUKHI LETTER OO
        "oo"    :   "\u0A13", // ਓ GURMUKHI LETTER OO
        "au"    :   "\u0A14", // ਔ GURMUKHI LETTER AU

        // Sign: Manually added from Devanagari
        "OM"    :   "\u0950", // ॐ
        "ooM"   :   "\u0950", // ॐ
        "AUM"   :   "\u0950"  // ॐ
    },

    "Dependent_vowel": { // +()
        // Dependent vowel signs
        "a"     :   "",       // ADDED
        "A"     :   "\u0A3E", // $ਾ GURMUKHI VOWEL SIGN AA = kanna
        "aa"    :   "\u0A3E", // $ਾ GURMUKHI VOWEL SIGN AA = kanna
        "i"     :   "\u0A3F", // $ਿ GURMUKHI VOWEL SIGN I = sihari • stands to the left of the consonant
        "I"     :   "\u0A40", // $ੀ GURMUKHI VOWEL SIGN II = bihari
        "ii"    :   "\u0A40", // $ੀ GURMUKHI VOWEL SIGN II = bihari
        "u"     :   "\u0A41", // $ੁ GURMUKHI VOWEL SIGN U = aunkar
        "U"     :   "\u0A42", // $ੂ GURMUKHI VOWEL SIGN UU = dulainkar
        "uu"    :   "\u0A42", // $ੂ GURMUKHI VOWEL SIGN UU = dulainkar
        //""    :   "\u0A43", // " <reserved>
        //""    :   "\u0A44", // " <reserved>
        //""    :   "\u0A45", // " <reserved>
        //""    :   "\u0A46", // " <reserved>
        "e"     :   "\u0A47", // $ੇ GURMUKHI VOWEL SIGN EE = lanvan
        "E"     :   "\u0A47", // $ੇ GURMUKHI VOWEL SIGN EE = lanvan
        "ee"    :   "\u0A47", // $ੇ GURMUKHI VOWEL SIGN EE = lanvan
        "ai"    :   "\u0A48", // $ੈ GURMUKHI VOWEL SIGN AI = dulanvan
        //""    :   "\u0A49", // " <reserved>
        //""    :   "\u0A4A", // " <reserved>
        "o"     :   "\u0A4B", // $ੋ GURMUKHI VOWEL SIGN OO = hora
        "O"     :   "\u0A4B", // $ੋ GURMUKHI VOWEL SIGN OO = hora
        "oo"    :   "\u0A4B", // $ੋ GURMUKHI VOWEL SIGN OO = hora
        "au"    :   "\u0A4C"  // $ ੌ GURMUKHI VOWEL SIGN AU = kanaura
    },

    "Consonants": { // ()+
        // Consonants
        "k"     :   "\u0A15", // ਕ GURMUKHI LETTER KA
        "kh"    :   "\u0A16", // ਖ GURMUKHI LETTER KHA
        "g"     :   "\u0A17", // ਗ GURMUKHI LETTER GA
        "gh"    :   "\u0A18", // ਘ GURMUKHI LETTER GHA
        "~N"    :   "\u0A19", // ਙ GURMUKHI LETTER NGA
        "N^"    :   "\u0A19", // ਙ GURMUKHI LETTER NGA
        "ch"    :   "\u0A1A", // ਚ GURMUKHI LETTER CA
        "chh"   :   "\u0A1B", // ਛ GURMUKHI LETTER CHA
        "Ch"    :   "\u0A1B", // ਛ GURMUKHI LETTER CHA
        "j"     :   "\u0A1C", // ਜ GURMUKHI LETTER JA
        "jh"    :   "\u0A1D", // ਝ GURMUKHI LETTER JHA
        "~n"    :   "\u0A1E", // ਞ GURMUKHI LETTER NYA
        "n^"    :   "\u0A1E", // ਞ GURMUKHI LETTER NYA
        "JN"    :   "\u0A1E", // ਞ GURMUKHI LETTER NYA
        "T"     :   "\u0A1F", // ਟ GURMUKHI LETTER TTA
        "Th"    :   "\u0A20", // ਠ GURMUKHI LETTER TTHA
        "D"     :   "\u0A21", // ਡ GURMUKHI LETTER DDA
        "Dh"    :   "\u0A22", // ਢ GURMUKHI LETTER DDHA
        "N"     :   "\u0A23", // ਣ GURMUKHI LETTER NNA
        "t"     :   "\u0A24", // ਤ GURMUKHI LETTER TA
        "th"    :   "\u0A25", // ਥ GURMUKHI LETTER THA
        "d"     :   "\u0A26", // ਦ GURMUKHI LETTER DA
        "dh"    :   "\u0A27", // ਧ GURMUKHI LETTER DHA
        "n"     :   "\u0A28", // ਨ GURMUKHI LETTER NA
        //""    :   "\u0A29", // " <reserved>
        "p"     :   "\u0A2A", // ਪ GURMUKHI LETTER PA
        "ph"    :   "\u0A2B", // ਫ GURMUKHI LETTER PHA
        "b"     :   "\u0A2C", // ਬ GURMUKHI LETTER BA
        "bh"    :   "\u0A2D", // ਭ GURMUKHI LETTER BHA
        "m"     :   "\u0A2E", // ਮ GURMUKHI LETTER MA
        "y"     :   "\u0A2F", // ਯ GURMUKHI LETTER YA
        "r"     :   "\u0A30", // ਰ GURMUKHI LETTER RA
        //""    :   "\u0A31 " <reserved>
        "l"     :   "\u0A32", // ਲ GURMUKHI LETTER LA
        "L"     :   "\u0A33", // ਲ਼ GURMUKHI LETTER LLA ≡ 0A32  ਲ   0A3C  $਼
        //""    :   "\u0A34", // " <reserved>
        "w"     :   "\u0A35", // ਵ GURMUKHI LETTER VA
        "v"     :   "\u0A35", // ਵ GURMUKHI LETTER VA
        "sh"    :   "\u0A36", // ਸ਼ GURMUKHI LETTER SHA ≡ 0A38  ਸ   0A3C  $਼
        "Sh"    :   "\u0A36", // ਸ਼ GURMUKHI LETTER SHA ≡ 0A38  ਸ   0A3C  $਼
        "ssh"   :   "\u0A36", // ਸ਼ GURMUKHI LETTER SHA ≡ 0A38  ਸ   0A3C  $਼
        //""    :   "\u0A37", // " <reserved>
        "s"     :   "\u0A38", // ਸ GURMUKHI LETTER SA
        "h"     :   "\u0A39"  // ਹ GURMUKHI LETTER HA

        // Additional consonants
        //""    :   "\u0A59", // ਖ਼ GURMUKHI LETTER KHHA ≡ 0A16  ਖ   0A3C  $਼
        //""    :   "\u0A5A", // ਗ਼ GURMUKHI LETTER GHHA ≡ 0A17  ਗ   0A3C  $਼
        //""    :   "\u0A5B", // ਜ਼ GURMUKHI LETTER ZA ≡ 0A1C  ਜ   0A3C  $਼
        //""    :   "\u0A5C", // ੜ GURMUKHI LETTER RRA
        //""    :   "\u0A5D", // " <reserved>
        //""    :   "\u0A5E", // ਫ਼ GURMUKHI LETTER FA ≡ 0A2B  ਫ   0A3C  $਼
    },

    "Others": { // ()
        // Various signs
        ".N"    :   "\u0A01", // $ਁ GURMUKHI SIGN ADAK BINDI
        ".m"    :   "\u0A02", // $ਂ GURMUKHI SIGN BINDI
        ".n"    :   "\u0A02", // $ਂ GURMUKHI SIGN BINDI
        "M"     :   "\u0A02", // $ਂ GURMUKHI SIGN BINDI
        "H"     :   "\u0A03", // $ਃ GURMUKHI SIGN VISARGA
        ".a"    :   "\u0A05", // ਅ GURMUKHI LETTER A = aira // ADDED
        ".h"    :   "\u0A4D", // $ GURMUKHI SIGN VIRAMA

        // Various signs
        "\u0323":   "\u0A3C", // $਼ GURMUKHI SIGN NUKTA = pairin bindi • for extending the alphabet to new letters
        // Sign
        "\u030D":   "\u0A51", // $ੑ GURMUKHI SIGN UDAAT (See: Page 6 of http://www.unicode.org/L2/L2005/05344-gurmukhi3.pdf)

        // Reserved For viram punctuation, use the generic Indic 0964 and 0965.
        //""    :   "\u0A64", // " <reserved> → 0964  ।   devanagari danda
        //""    :   "\u0A65", // " <reserved> → 0965  ॥   devanagari double danda

        // Digits
        "0"     :   "\u0A66", // ੦ GURMUKHI DIGIT ZERO
        "1"     :   "\u0A67", // ੧ GURMUKHI DIGIT ONE
        "2"     :   "\u0A68", // ੨ GURMUKHI DIGIT TWO
        "3"     :   "\u0A69", // ੩ GURMUKHI DIGIT THREE
        "4"     :   "\u0A6A", // ੪ GURMUKHI DIGIT FOUR
        "5"     :   "\u0A6B", // ੫ GURMUKHI DIGIT FIVE
        "6"     :   "\u0A6C", // ੬ GURMUKHI DIGIT SIX
        "7"     :   "\u0A6D", // ੭ GURMUKHI DIGIT SEVEN
        "8"     :   "\u0A6E", // ੮ GURMUKHI DIGIT EIGHT
        "9"     :   "\u0A6F", // ੯ GURMUKHI DIGIT NINE

        // Gurmukhi-specific additions
        //""    :   "\u0A70", // $ੰ GURMUKHI TIPPI • nasalization
        //""    :   "\u0A71", // $ੱ GURMUKHI ADDAK • doubles following consonant
        //""    :   "\u0A72", // ੲ GURMUKHI IRI • base for vowels
        //""    :   "\u0A73", // ੳ GURMUKHI URA • base for vowels
        //""    :   "\u0A74", // ੴ GURMUKHI EK ONKAR • God is One
        //""    :   "\u0A75", // $ੵ GURMUKHI SIGN YAKASH

        // Sign: Manually added from Devanagari
        ","     :   "\u0964", // । DEVANAGARI DANDA = purna viram • phrase separator
        "."     :   "\u0965"  // ॥ DEVANAGARI DOUBLE DANDA = deergh viram
    },

    // Virama
    "VIRAMA"    :   "\u0A4D"  // $ GURMUKHI SIGN VIRAMA
};

var malayalam_dict = {
    "Independent_vowels": { // -()
        // Independent vowels
        "a"     :   "\u0D05", // അ MALAYALAM LETTER A
        "A"     :   "\u0D06", // ആ MALAYALAM LETTER AA
        "aa"    :   "\u0D06", // ആ MALAYALAM LETTER AA
        "i"     :   "\u0D07", // ഇ MALAYALAM LETTER I
        "I"     :   "\u0D08", // ഈ MALAYALAM LETTER II
        "ii"    :   "\u0D08", // ഈ MALAYALAM LETTER II
        "u"     :   "\u0D09", // ഉ MALAYALAM LETTER U
        "U"     :   "\u0D0A", // ഊ MALAYALAM LETTER UU
        "uu"    :   "\u0D0A", // ഊ MALAYALAM LETTER UU
        "R^i"   :   "\u0D0B", // ഋ MALAYALAM LETTER VOCALIC R
        "RRi"   :   "\u0D0B", // ഋ MALAYALAM LETTER VOCALIC R
        "L^i"   :   "\u0D0C", // ഌ MALAYALAM LETTER VOCALIC L
        "LLi"   :   "\u0D0C", // ഌ MALAYALAM LETTER VOCALIC L
        //""    :   "\u0D0D", // " <reserved>
        "e"     :   "\u0D0E", // എ MALAYALAM LETTER E
        "E"     :   "\u0D0F", // ഏ MALAYALAM LETTER EE
        "ee"    :   "\u0D0F", // ഏ MALAYALAM LETTER EE
        "ai"    :   "\u0D10", // ഐ MALAYALAM LETTER AI
        //""    :   "\u0D11", // " <reserved>
        "o"     :   "\u0D12", // ഒ MALAYALAM LETTER O
        "O"     :   "\u0D13", // ഓ MALAYALAM LETTER OO
        "oo"    :   "\u0D13", // ഓ MALAYALAM LETTER OO
        "au"    :   "\u0D14", // ഔ MALAYALAM LETTER AU

        // Additional vowels for Sanskrit
        "R^I"   :   "\u0D60", // ൠ MALAYALAM LETTER VOCALIC RR
        "RRI"   :   "\u0D60", // ൠ MALAYALAM LETTER VOCALIC RR
        "L^I"   :   "\u0D61", // ൡ MALAYALAM LETTER VOCALIC LL
        "LLI"   :   "\u0D61", // ൡ MALAYALAM LETTER VOCALIC LL

        // Sign: Manually added from Devanagari
        "OM"    :   "\u0950", // ॐ
        "ooM"   :   "\u0950", // ॐ
        "AUM"   :   "\u0950"  // ॐ
    },

    "Dependent_vowel": { // +()
        // Dependent vowel signs
        "a"     :   "",       // ADDED
        "aa"    :   "\u0D3E", // $ ാ MALAYALAM VOWEL SIGN AA
        "i"     :   "\u0D3F", // $ ി MALAYALAM VOWEL SIGN I
        "I"     :   "\u0D40", // $ ീ MALAYALAM VOWEL SIGN II
        "ii"    :   "\u0D40", // $ ീ MALAYALAM VOWEL SIGN II
        "u"     :   "\u0D41", // $ ു MALAYALAM VOWEL SIGN U
        "U"     :   "\u0D42", // $ ൂ MALAYALAM VOWEL SIGN UU
        "uu"    :   "\u0D42", // $ ൂ MALAYALAM VOWEL SIGN UU
        "R^i"   :   "\u0D43", // $ ൃ MALAYALAM VOWEL SIGN VOCALIC R
        "RRi"   :   "\u0D43", // $ ൃ MALAYALAM VOWEL SIGN VOCALIC R
        "R^I"   :   "\u0D44", // $ ൄ MALAYALAM VOWEL SIGN VOCALIC RR
        "RRI"   :   "\u0D44", // $ ൄ MALAYALAM VOWEL SIGN VOCALIC RR
        //""    :   "\u0D45", // " <reserved>
        "e"     :   "\u0D46", // $ െ MALAYALAM VOWEL SIGN E • stands to the left of the consonant
        "E"     :   "\u0D47", // $ േ MALAYALAM VOWEL SIGN EE • stands to the left of the consonant
        "ee"    :   "\u0D47", // $ േ MALAYALAM VOWEL SIGN EE • stands to the left of the consonant
        "ai"    :   "\u0D48", // $ ൈ MALAYALAM VOWEL SIGN AI • stands to the left of the consonant

        // Two-part dependent vowel signs
        // These vowel signs have glyph pieces which stand on both sides of the consonant; they follow the consonant in logical order, and should be handled as a unit for most processing.
        "o"     :   "\u0D4A", // $ ൊ MALAYALAM VOWEL SIGN O ≡ 0D46  $ െ   0D3E  $ ാ
        "O"     :   "\u0D4B", // $ ോ MALAYALAM VOWEL SIGN OO ≡ 0D47  $ േ   0D3E  $ ാ
        "oo"    :   "\u0D4B", // $ ോ MALAYALAM VOWEL SIGN OO ≡ 0D47  $ േ   0D3E  $ ാ
        "au"    :   "\u0D4C", // $ ൌ MALAYALAM VOWEL SIGN AU • archaic form of the /au/ dependent vowel → 0D57  $ ൗ  malayalam au length mark ≡ 0D46  $ െ   0D57  $ ൗ

        // Dependent vowels
        "L^i"   :   "\u0D62", // $ ൢ MALAYALAM VOWEL SIGN VOCALIC L
        "LLi"   :   "\u0D62", // $ ൢ MALAYALAM VOWEL SIGN VOCALIC L
        "L^I"   :   "\u0D63", // $ ൣ MALAYALAM VOWEL SIGN VOCALIC LL
        "LLI"   :   "\u0D63"  // $ ൣ MALAYALAM VOWEL SIGN VOCALIC LL
    },

    "Consonants": { // ()+
        // Consonants
        // Alternate romanizations are shown as aliases for some letters to clarify their identity.
        "k"     :   "\u0D15", // ക MALAYALAM LETTER KA
        "kh"    :   "\u0D16", // ഖ MALAYALAM LETTER KHA
        "g"     :   "\u0D17", // ഗ MALAYALAM LETTER GA
        "gh"    :   "\u0D18", // ഘ MALAYALAM LETTER GHA
        "~N"    :   "\u0D19", // ങ MALAYALAM LETTER NGA
        "N^"    :   "\u0D19", // ങ MALAYALAM LETTER NGA
        "ch"    :   "\u0D1A", // ച MALAYALAM LETTER CA = cha
        "chh"   :   "\u0D1B", // ഛ MALAYALAM LETTER CHA = chha
        "Ch"    :   "\u0D1B", // ഛ MALAYALAM LETTER CHA = chha
        "j"     :   "\u0D1C", // ജ MALAYALAM LETTER JA
        "jh"    :   "\u0D1D", // ഝ MALAYALAM LETTER JHA
        "~n"    :   "\u0D1E", // ഞ MALAYALAM LETTER NYA = nha
        "n^"    :   "\u0D1E", // ഞ MALAYALAM LETTER NYA = nha
        "JN"    :   "\u0D1E", // ഞ MALAYALAM LETTER NYA = nha
        "T"     :   "\u0D1F", // ട MALAYALAM LETTER TTA = ta
        "Th"    :   "\u0D20", // ഠ MALAYALAM LETTER TTHA = tta
        "D"     :   "\u0D21", // ഡ MALAYALAM LETTER DDA = hard da
        "Dh"    :   "\u0D22", // ഢ MALAYALAM LETTER DDHA = hard dda
        "N"     :   "\u0D23", // ണ MALAYALAM LETTER NNA = hard na
        "t"     :   "\u0D24", // ത MALAYALAM LETTER TA = tha
        "th"    :   "\u0D25", // ഥ MALAYALAM LETTER THA = ttha
        "d"     :   "\u0D26", // ദ MALAYALAM LETTER DA = soft da
        "dh"    :   "\u0D27", // ധ MALAYALAM LETTER DHA = soft dda
        "n"     :   "\u0D28", // ന MALAYALAM LETTER NA
        "^n"    :   "\u0D29", // ഩ MALAYALAM LETTER NNNA • historic use only
        "p"     :   "\u0D2A", // പ MALAYALAM LETTER PA
        "ph"    :   "\u0D2B", // ഫ MALAYALAM LETTER PHA
        "b"     :   "\u0D2C", // ബ MALAYALAM LETTER BA
        "bh"    :   "\u0D2D", // ഭ MALAYALAM LETTER BHA
        "m"     :   "\u0D2E", // മ MALAYALAM LETTER MA
        "y"     :   "\u0D2F", // യ MALAYALAM LETTER YA
        "r"     :   "\u0D30", // ര MALAYALAM LETTER RA
        "R"     :   "\u0D31", // റ MALAYALAM LETTER RRA
        "l"     :   "\u0D32", // ല MALAYALAM LETTER LA
        "L"     :   "\u0D33", // ള MALAYALAM LETTER LLA
        //""    :   "\u0D34", // ഴ MALAYALAM LETTER LLLA = zha
        "w"     :   "\u0D35", // വ MALAYALAM LETTER VA
        "v"     :   "\u0D35", // വ MALAYALAM LETTER VA
        "sh"    :   "\u0D36", // ശ MALAYALAM LETTER SHA = soft sha
        "Sh"    :   "\u0D37", // ഷ MALAYALAM LETTER SSA = sha
        "shh"   :   "\u0D37", // ഷ MALAYALAM LETTER SSA = sha
        "s"     :   "\u0D38", // സ MALAYALAM LETTER SA
        "h"     :   "\u0D39"  // ഹ MALAYALAM LETTER HA
        //""    :   "\u0D3A", // ഺ MALAYALAM LETTER TTTA • historic use only
    },

    "Others": { // ()
        // Various signs
        ".m"    :   "\u0D02", // $ ം MALAYALAM SIGN ANUSVARA
        ".n"    :   "\u0D02", // $ ം MALAYALAM SIGN ANUSVARA
        "M"     :   "\u0D02", // $ ം MALAYALAM SIGN ANUSVARA
        "H"     :   "\u0D03", // $ ഃ MALAYALAM SIGN VISARGA
        // Addition for Sanskrit
        ".a"    :   "\u0D3D", // ഽ MALAYALAM SIGN AVAGRAHA = praslesham
        ".h"    :   "\u0D4D", // $ ് MALAYALAM SIGN VIRAMA = chandrakkala (the preferred name) = vowel half-u

        // Dot reph
        //""    :   "\u0D4E", // ൎ MALAYALAM LETTER DOT REPH • not used in reformed modern Malayalam orthography

        // Various signs
        //""    :   "\u0D57", // $ ൗ MALAYALAM AU LENGTH MARK • used alone to write the /au/ dependent vowel in modern texts →
        //""    :   "\u0D4C", //  $ ൌ   malayalam vowel sign au

        // Reserved For viram punctuation, use the generic Indic 0964 and 0965.
        //""    :   "\u0D64", // " <reserved> → 0964  ।   devanagari danda
        //""    :   "\u0D65", // " <reserved> → 0965  ॥   devanagari double danda

        // Digits
        "0"     :   "\u0D66", // ൦ MALAYALAM DIGIT ZERO
        "1"     :   "\u0D67", // ൧ MALAYALAM DIGIT ONE
        "2"     :   "\u0D68", // ൨ MALAYALAM DIGIT TWO
        "3"     :   "\u0D69", // ൩ MALAYALAM DIGIT THREE
        "4"     :   "\u0D6A", // ൪ MALAYALAM DIGIT FOUR
        "5"     :   "\u0D6B", // ൫ MALAYALAM DIGIT FIVE
        "6"     :   "\u0D6C", // ൬ MALAYALAM DIGIT SIX
        "7"     :   "\u0D6D", // ൭ MALAYALAM DIGIT SEVEN
        "8"     :   "\u0D6E", // ൮ MALAYALAM DIGIT EIGHT
        "9"     :   "\u0D6F", // ൯ MALAYALAM DIGIT NINE

        // Malayalam numerics
        //""    :   "\u0D70", // ൰ MALAYALAM NUMBER TEN
        //""    :   "\u0D71", // ൱ MALAYALAM NUMBER ONE HUNDRED
        //""    :   "\u0D72", // ൲ MALAYALAM NUMBER ONE THOUSAND

        // Fractions
        //""    :   "\u0D73", // ൳ MALAYALAM FRACTION ONE QUARTER
        //""    :   "\u0D74", // ൴ MALAYALAM FRACTION ONE HALF
        //""    :   "\u0D75", // ൵ MALAYALAM FRACTION THREE QUARTERS

        // Date mark
        //""    :   "\u0D79", // ൹ MALAYALAM DATE MARK

        // Chillu letters
        //""    :   "\u0D7A", // ൺ MALAYALAM LETTER CHILLU NN
        //""    :   "\u0D7B", // ൻ MALAYALAM LETTER CHILLU N
        //""    :   "\u0D7C", // ർ MALAYALAM LETTER CHILLU RR • historically derived from the full letter ra • also used for chillu r
        //""    :   "\u0D7D", // ൽ MALAYALAM LETTER CHILLU L • historically derived from the full letter ta • used for chillu t and chillu d
        //""    :   "\u0D7E", // ൾ MALAYALAM LETTER CHILLU LL
        //""    :   "\u0D7F", // ൿ MALAYALAM LETTER CHILLU K

        // Sign: Manually added from Devanagari
        ","     :   "\u0964", // । DEVANAGARI DANDA = purna viram • phrase separator
        "."     :   "\u0965"  // ॥ DEVANAGARI DOUBLE DANDA = deergh viram
    },

    // Virama
    "VIRAMA"    :   "\u0D4D"  // $ ് MALAYALAM SIGN VIRAMA = chandrakkala (the preferred name) = vowel half-u
};

var oriya_dict = {
    "Independent_vowels": { // -()
        // Independent vowels
        "a"     :   "\u0B05", // ଅ ORIYA LETTER A
        "A"     :   "\u0B06", // ଆ ORIYA LETTER AA
        "aa"    :   "\u0B06", // ଆ ORIYA LETTER AA
        "i"     :   "\u0B07", // ଇ ORIYA LETTER I
        "I"     :   "\u0B08", // ଈ ORIYA LETTER II
        "ii"    :   "\u0B08", // ଈ ORIYA LETTER II
        "u"     :   "\u0B09", // ଉ ORIYA LETTER U
        "U"     :   "\u0B0A", // ଊ ORIYA LETTER UU
        "uu"    :   "\u0B0A", // ଊ ORIYA LETTER UU
        "R^i"   :   "\u0B0B", // ଋ ORIYA LETTER VOCALIC R
        "RRi"   :   "\u0B0B", // ଋ ORIYA LETTER VOCALIC R
        "L^I"   :   "\u0B0C", // ଌ ORIYA LETTER VOCALIC L
        "LLI"   :   "\u0B0C", // ଌ ORIYA LETTER VOCALIC L
        //""    :   "\u0B0D", // " <reserved>
        //""    :   "\u0B0E", // " <reserved>
        "e"     :   "\u0B0F", // ଏ ORIYA LETTER E
        "E"     :   "\u0B0F", // ଏ ORIYA LETTER E
        "ee"    :   "\u0B0F", // ଏ ORIYA LETTER E
        "ai"    :   "\u0B10", // ଐ ORIYA LETTER AI
        //""    :   "\u0B11", // " <reserved>
        //""    :   "\u0B12", // " <reserved>
        "o"     :   "\u0B13", // ଓ ORIYA LETTER O
        "O"     :   "\u0B13", // ଓ ORIYA LETTER O
        "oo"    :   "\u0B13", // ଓ ORIYA LETTER O
        "au"    :   "\u0B14", // ଔ ORIYA LETTER AU

        // Additional vowels for Sanskrit
        "R^I"   :   "\u0B60", // ୠ ORIYA LETTER VOCALIC RR
        "RRI"   :   "\u0B60", // ୠ ORIYA LETTER VOCALIC RR
        "L^I"   :   "\u0B61", // ୡ ORIYA LETTER VOCALIC LL
        "LLI"   :   "\u0B61", // ୡ ORIYA LETTER VOCALIC LL

        // Sign: Manually added from Devanagari
        "OM"    :   "\u0950", // ॐ
        "ooM"   :   "\u0950", // ॐ
        "AUM"   :   "\u0950"  // ॐ
    },

    "Dependent_vowel": { // +()
    // Dependent vowel signs
        "a"     :   "",       // ADDED
        "A"     :   "\u0B3E", // $ା ORIYA VOWEL SIGN AA
        "aa"    :   "\u0B3E", // $ା ORIYA VOWEL SIGN AA
        "i"     :   "\u0B3F", // $ି ORIYA VOWEL SIGN I
        "I"     :   "\u0B40", // $ୀ ORIYA VOWEL SIGN II
        "ii"    :   "\u0B40", // $ୀ ORIYA VOWEL SIGN II
        "u"     :   "\u0B41", // $ୁ ORIYA VOWEL SIGN U
        "U"     :   "\u0B42", // $ୂ ORIYA VOWEL SIGN UU
        "uu"    :   "\u0B42", // $ୂ ORIYA VOWEL SIGN UU
        "R^i"   :   "\u0B43", // $ୃ ORIYA VOWEL SIGN VOCALIC R
        "RRi"   :   "\u0B43", // $ୃ ORIYA VOWEL SIGN VOCALIC R
        "R^I"   :   "\u0B44", // $ୄ ORIYA VOWEL SIGN VOCALIC RR
        "RRI"   :   "\u0B44", // $ୄ ORIYA VOWEL SIGN VOCALIC RR
        //""    :   "\u0B45", // " <reserved>
        //""    :   "\u0B46", // " <reserved>
        "e"     :   "\u0B47", // $େ ORIYA VOWEL SIGN E • stands to the left of the consonant
        "E"     :   "\u0B47", // $େ ORIYA VOWEL SIGN E • stands to the left of the consonant
        "ee"    :   "\u0B47", // $େ ORIYA VOWEL SIGN E • stands to the left of the consonant
        "ai"    :   "\u0B48", // $ୈ ORIYA VOWEL SIGN AI • pieces left of and above the consonant ≡ 0B47   $େ   0B56  $ୖ

        // Two-part dependent vowel signs These vowel signs have glyph pieces which stand on both sides of the consonant; they follow the consonant in logical order, and should be handled as a unit for most processing.
        "o"     :   "\u0B4B", // $ୋ ORIYA VOWEL SIGN O ≡ 0B47   $େ   0B3E  $ା
        "O"     :   "\u0B4B", // $ୋ ORIYA VOWEL SIGN O ≡ 0B47   $େ   0B3E  $ା
        "oo"    :   "\u0B4B", // $ୋ ORIYA VOWEL SIGN O ≡ 0B47   $େ   0B3E  $ା
        "au"    :   "\u0B4C", // $ୌ ORIYA VOWEL SIGN AU ≡ 0B47   $େ   0B57  ୗ

    // Dependent vowels
        "L^i"   :   "\u0B62", // $ୢ ORIYA VOWEL SIGN VOCALIC L
        "LLi"   :   "\u0B62", // $ୢ ORIYA VOWEL SIGN VOCALIC L
        "L^I"   :   "\u0B63", // $ୣ ORIYA VOWEL SIGN VOCALIC LL
        "LLI"   :   "\u0B63"  // $ୣ ORIYA VOWEL SIGN VOCALIC LL
    },

    "Consonants": { // ()+
        // Consonants
        "k"     :   "\u0B15", // କ ORIYA LETTER KA
        "kh"    :   "\u0B16", // ଖ ORIYA LETTER KHA
        "g"     :   "\u0B17", // ଗ ORIYA LETTER GA
        "gh"    :   "\u0B18", // ଘ ORIYA LETTER GHA
        "~N"    :   "\u0B19", // ଙ ORIYA LETTER NGA
        "N^"    :   "\u0B19", // ଙ ORIYA LETTER NGA
        "ch"    :   "\u0B1A", // ଚ ORIYA LETTER CA
        "chh"   :   "\u0B1B", // ଛ ORIYA LETTER CHA
        "Ch"    :   "\u0B1B", // ଛ ORIYA LETTER CHA
        "j"     :   "\u0B1C", // ଜ ORIYA LETTER JA
        "jh"    :   "\u0B1D", // ଝ ORIYA LETTER JHA
        "~n"    :   "\u0B1E", // ଞ ORIYA LETTER NYA
        "n^"    :   "\u0B1E", // ଞ ORIYA LETTER NYA
        "JN"    :   "\u0B1E", // ଞ ORIYA LETTER NYA
        "T"     :   "\u0B1F", // ଟ ORIYA LETTER TTA
        "Th"    :   "\u0B20", // ଠ ORIYA LETTER TTHA
        "D"     :   "\u0B21", // ଡ ORIYA LETTER DDA
        "Dh"    :   "\u0B22", // ଢ ORIYA LETTER DDHA
        "N"     :   "\u0B23", // ଣ ORIYA LETTER NNA
        "t"     :   "\u0B24", // ତ ORIYA LETTER TA
        "th"    :   "\u0B25", // ଥ ORIYA LETTER THA
        "d"     :   "\u0B26", // ଦ ORIYA LETTER DA
        "dh"    :   "\u0B27", // ଧ ORIYA LETTER DHA
        "n"     :   "\u0B28", // ନ ORIYA LETTER NA
        //""    :   "\u0B29", // " <reserved>
        "p"     :   "\u0B2A", // ପ ORIYA LETTER PA
        "ph"    :   "\u0B2B", // ଫ ORIYA LETTER PHA
        "b"     :   "\u0B2C", // ବ ORIYA LETTER BA → 0B35  ଵ   oriya letter va
        "bh"    :   "\u0B2D", // ଭ ORIYA LETTER BHA
        "m"     :   "\u0B2E", // ମ ORIYA LETTER MA
        "y"     :   "\u0B2F", // ଯ ORIYA LETTER YA = ja
        "r"     :   "\u0B30", // ର ORIYA LETTER RA
        //""    :   "\u0B31", // " <reserved>
        "l"     :   "\u0B32", // ଲ ORIYA LETTER LA
        "L"     :   "\u0B33", // ଳ ORIYA LETTER LLA
        //""    :   "\u0B34", // " <reserved>
        "w"     :   "\u0B35", // ଵ ORIYA LETTER VA → 0B2C  ବ   oriya letter ba
        "v"     :   "\u0B35", // ଵ ORIYA LETTER VA → 0B2C  ବ   oriya letter ba
        "sh"    :   "\u0B36", // ଶ ORIYA LETTER SHA
        "Sh"    :   "\u0B37", // ଷ ORIYA LETTER SSA
        "shh"   :   "\u0B37", // ଷ ORIYA LETTER SSA
        "s"     :   "\u0B38", // ସ ORIYA LETTER SA
        "h"     :   "\u0B39"  // ହ ORIYA LETTER HA

        // Additional consonants
        //""    :   "\u0B5C", // ଡ଼ ORIYA LETTER RRA = dda ≡ 0B21  ଡ   0B3C  $଼
        //""    :   "\u0B5D", // ଢ଼ ORIYA LETTER RHA = ddha ≡ 0B22  ଢ   0B3C  $଼
        //""    :   "\u0B5E", // " <reserved>
        //""    :   "\u0B5F", // ୟ ORIYA LETTER YYA = ya

        // Additional consonant
        //""    :   "\u0B71", // ୱ ORIYA LETTER WA → 0B13  ଓ   oriya letter o → 0B35  ଵ   oriya letter va

    },

    "Others": { // ()
        // Various signs
        ".N"    :   "\u0B01", // $ଁ ORIYA SIGN CANDRABINDU
        ".m"    :   "\u0B02", // $ଂ ORIYA SIGN ANUSVARA
        ".n"    :   "\u0B02", // $ଂ ORIYA SIGN ANUSVARA
        "M"     :   "\u0B02", // $ଂ ORIYA SIGN ANUSVARA
        "H"     :   "\u0B03", // $ଃ ORIYA SIGN VISARGA
        ".a"    :   "\u0B3D", // ଽ ORIYA SIGN AVAGRAHA
        ".h"    :   "\u0B4D", // $୍ ORIYA SIGN VIRAMA

        // Various signs
        "\u0323":   "\u0B3C", // $଼ ORIYA SIGN NUKTA • for extending the alphabet to new letters

        // Various signs
        //""    :   "\u0B56", // $ୖ ORIYA AI LENGTH MARK
        //""    :   "\u0B57", //  ୗ ORIYA AU LENGTH MARK

        // Reserved For viram punctuation, use the generic Indic 0964 and 0965.
        //""    :   "\u0B64", // " <reserved> → 0964  ।   devanagari danda
        //""    :   "\u0B65", // " <reserved> → 0965  ॥   devanagari double danda

        // Digits
        "0"     :   "\u0B66", // ୦ ORIYA DIGIT ZERO
        "1"     :   "\u0B67", // ୧  ORIYA DIGIT ONE
        "2"     :   "\u0B68", // ୨  ORIYA DIGIT TWO
        "3"     :   "\u0B69", // ୩ ORIYA DIGIT THREE
        "4"     :   "\u0B6A", // ୪  ORIYA DIGIT FOUR
        "5"     :   "\u0B6B", // ୫  ORIYA DIGIT FIVE
        "6"     :   "\u0B6C", // ୬  ORIYA DIGIT SIX
        "7"     :   "\u0B6D", // ୭  ORIYA DIGIT SEVEN
        "8"     :   "\u0B6E", // ୮   ORIYA DIGIT EIGHT
        "9"     :   "\u0B6F", // ୯   ORIYA DIGIT NINE

        // Sign
        //""    :   "\u0B70", // ୰ ORIYA ISSHAR

        // Fraction signs
        //""    :   "\u0B72", // ୲ ORIYA FRACTION ONE QUARTER
        //""    :   "\u0B73", // ୳ ORIYA FRACTION ONE HALF
        //""    :   "\u0B74", // ୴ ORIYA FRACTION THREE QUARTERS
        //""    :   "\u0B75", // ୵ ORIYA FRACTION ONE SIXTEENTH
        //""    :   "\u0B76", // ୶ ORIYA FRACTION ONE EIGHTH
        //""    :   "\u0B77", // ୷ ORIYA FRACTION THREE SIXTEENTHS

        // Sign: Manually added from Devanagari
        ","     :   "\u0964", // । DEVANAGARI DANDA = purna viram • phrase separator
        "."     :   "\u0965"  // ॥ DEVANAGARI DOUBLE DANDA = deergh viram
    },

    // Virama
    "VIRAMA"    :   "\u0B4D" // $୍ ORIYA SIGN VIRAMA
};

// Empty dictionary
var english_dict = {
    "Independent_vowels": { // -()
    // Independent vowels
    },

    "Dependent_vowel": { // +()
    },

    "Consonants": { // ()+
    },

    "Others": { // ()
    },

    // Virama
    "VIRAMA"    :   ""
};

exports.iso2itrans_dict  = iso2itrans_dict;
exports.iast2itrans_dict = iast2itrans_dict;
exports.devanagari_dict  = devanagari_dict;
exports.telugu_dict      = telugu_dict;
exports.kannada_dict     = kannada_dict;
exports.gujarati_dict    = gujarati_dict;
exports.tamil_dict       = tamil_dict;
exports.bengali_dict     = bengali_dict;
exports.gurmukhi_dict    = gurmukhi_dict;
exports.malayalam_dict   = malayalam_dict;
exports.oriya_dict       = oriya_dict;
exports.english_dict     = english_dict;
