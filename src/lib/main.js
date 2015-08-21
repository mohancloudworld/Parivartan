exports.main= function() {
    var contextMenu = require("sdk/context-menu");
    var selection = require("sdk/selection");
    var preferences = require("sdk/simple-prefs")
    //var request = require("sdk/request");
    var myMod = require("./myModule");

    // initialize
    myMod.init();

    var menuItem = contextMenu.Menu({
        label: "Parivartan",
        context: contextMenu.SelectionContext(),
        items: [
            contextMenu.Menu({
                label: "Indian/English(ITRANS) to",
                context: contextMenu.SelectionContext(),
                contentScript: 'self.on("click", function (node, data) {' +
                     '  self.postMessage(data);' +
                     '});',
                items: [
                    contextMenu.Item({ label: "English", data: "English" }),
                    contextMenu.Item({ label: "Devanagari (देवनागरी)", data: "Devanagari" }),
                    contextMenu.Item({ label: "Telugu (తెలుగు)",  data: "Telugu" }),
                    contextMenu.Item({ label: "Kannada (ಕನ್ನಡ)", data: "Kannada" }),
                    contextMenu.Item({ label: "Gujarati (ગુજરાતી)", data: "Gujarati" }),
                    contextMenu.Item({ label: "Tamil (தமிழ்)", data: "Tamil" }),
                    contextMenu.Item({ label: "Bengali (বাংলা)", data: "Bengali" }),
                    contextMenu.Item({ label: "Gurmukhi (ਗੁਰ੍ਮੁਖੀ)", data: "Gurmukhi" }),
                    contextMenu.Item({ label: "Malayalam (മലയാളം)", data: "Malayalam" }),
                    contextMenu.Item({ label: "Oriya (ଓଡ଼ିଆ)", data: "Oriya" }),
                    contextMenu.Item({ label: "Katapayadi sankhya", data: "Katapayadi" })
                ],
                onMessage: function (outLang) {
                    for (var subselection in selection) {
                        // if selection is from a text-box, 'html' will be empty so, 'text' is used to convert
                        var inp_data = subselection.html||subselection.text;
                        // detect language [to improve speed, passing 'text' instead of 'html']
                        var inpLang = myMod.detectLanguage(subselection.text);
                        if(outLang == "Katapayadi"){
                            var resultIndicScript;
                            if(inpLang == "English"){
                                resultIndicScript = myMod.convert2IndicScript(inp_data,
                                                                              "ITRANS",
                                                                              "Devanagari",
                                                                              1,
                                                                              0,
                                                                              preferences.prefs.preferASCIIDigits);
                            }
                            else{
                                resultIndicScript = inp_data;
                            }
                            subselection.html = myMod.convert2Katapayadi(resultIndicScript);
                        }
                        else if(inpLang != outLang){
                            // convert to English (ITRANS)
                            var resultITRANS = myMod.convert2IndicScript(inp_data,
                                                                         "ITRANS",
                                                                         inpLang,
                                                                         1,
                                                                         1,
                                                                         preferences.prefs.preferASCIIDigits);
                            if(outLang == "English"){
                                subselection.html = resultITRANS;
                            }
                            else{
                                // convert to the desired output language
                                subselection.html = myMod.convert2IndicScript(resultITRANS,
                                                                              "ITRANS",
                                                                              outLang,
                                                                              1,
                                                                              0,
                                                                              preferences.prefs.preferASCIIDigits);
                            }
                        }
                    }
                }
            }),
            contextMenu.Menu({
                label: "English (ISO 15919) to",
                context: contextMenu.SelectionContext(),
                contentScript: 'self.on("click", function (node, data) {' +
                     '  self.postMessage(data);' +
                     '});',
                items: [
                    contextMenu.Item({ label: "Devanagari (देवनागरी)", data: "Devanagari" }),
                    contextMenu.Item({ label: "Telugu (తెలుగు)",  data: "Telugu" }),
                    contextMenu.Item({ label: "Kannada (ಕನ್ನಡ)", data: "Kannada" }),
                    contextMenu.Item({ label: "Gujarati (ગુજરાતી)", data: "Gujarati" }),
                    contextMenu.Item({ label: "Tamil (தமிழ்)", data: "Tamil" }),
                    contextMenu.Item({ label: "Bengali (বাংলা)", data: "Bengali" }),
                    contextMenu.Item({ label: "Gurmukhi (ਗੁਰ੍ਮੁਖੀ)", data: "Gurmukhi" }),
                    contextMenu.Item({ label: "Malayalam (മലയാളം)", data: "Malayalam" }),
                    contextMenu.Item({ label: "Oriya (ଓଡ଼ିଆ)", data: "Oriya" }),
                    contextMenu.Item({ label: "Katapayadi sankhya", data: "Katapayadi" })
                ],
                onMessage: function (indicScript) {
                    for (var subselection in selection) {
                        if(indicScript == "Katapayadi"){
                            var resultIndicScript = myMod.convert2IndicScript(subselection.html||subselection.text,
                                                                              "ISO",
                                                                              "Devanagari",
                                                                              1,
                                                                              0,
                                                                              preferences.prefs.preferASCIIDigits);
                            subselection.html = myMod.convert2Katapayadi(resultIndicScript);
                        }
                        else {
                            subselection.html = myMod.convert2IndicScript(subselection.html||subselection.text,
                                                                          "ISO",
                                                                          indicScript,
                                                                          1,
                                                                          0,
                                                                          preferences.prefs.preferASCIIDigits);
                        }
                    }
                }
            }),
            contextMenu.Menu({
                label: "English (IAST) to",
                context: contextMenu.SelectionContext(),
                contentScript: 'self.on("click", function (node, data) {' +
                     '  self.postMessage(data);' +
                     '});',
                items: [
                    contextMenu.Item({ label: "Devanagari (देवनागरी)", data: "Devanagari" }),
                    contextMenu.Item({ label: "Telugu (తెలుగు)",  data: "Telugu" }),
                    contextMenu.Item({ label: "Kannada (ಕನ್ನಡ)", data: "Kannada" }),
                    contextMenu.Item({ label: "Gujarati (ગુજરાતી)", data: "Gujarati" }),
                    contextMenu.Item({ label: "Tamil (தமிழ்)", data: "Tamil" }),
                    contextMenu.Item({ label: "Bengali (বাংলা)", data: "Bengali" }),
                    contextMenu.Item({ label: "Gurmukhi (ਗੁਰ੍ਮੁਖੀ)", data: "Gurmukhi" }),
                    contextMenu.Item({ label: "Malayalam (മലയാളം)", data: "Malayalam" }),
                    contextMenu.Item({ label: "Oriya (ଓଡ଼ିଆ)", data: "Oriya" }),
                    contextMenu.Item({ label: "Katapayadi sankhya", data: "Katapayadi" })
                ],
                onMessage: function (indicScript) {
                    for (var subselection in selection) {
                        if(indicScript == "Katapayadi"){
                            var resultIndicScript = myMod.convert2IndicScript(subselection.html||subselection.text,
                                                                              "IAST",
                                                                              "Devanagari",
                                                                              1,
                                                                              0,
                                                                              preferences.prefs.preferASCIIDigits);
                            subselection.html = myMod.convert2Katapayadi(resultIndicScript);
                        }
                        else {
                            subselection.html = myMod.convert2IndicScript(subselection.html||subselection.text,
                                                                          "IAST",
                                                                          indicScript,
                                                                          1,
                                                                          0,
                                                                          preferences.prefs.preferASCIIDigits);
                        }
                    }
                }
            }),
            contextMenu.Menu({
                label: "General English to",
                context: contextMenu.SelectionContext(),
                contentScript: 'self.on("click", function (node, data) {' +
                     '  self.postMessage(data);' +
                     '});',
                items: [
                    contextMenu.Item({ label: "Devanagari (देवनागरी)", data: "Devanagari" }),
                    contextMenu.Item({ label: "Telugu (తెలుగు)",  data: "Telugu" }),
                    contextMenu.Item({ label: "Kannada (ಕನ್ನಡ)", data: "Kannada" }),
                    contextMenu.Item({ label: "Gujarati (ગુજરાતી)", data: "Gujarati" }),
                    contextMenu.Item({ label: "Tamil (தமிழ்)", data: "Tamil" }),
                    contextMenu.Item({ label: "Bengali (বাংলা)", data: "Bengali" }),
                    contextMenu.Item({ label: "Gurmukhi (ਗੁਰ੍ਮੁਖੀ)", data: "Gurmukhi" }),
                    contextMenu.Item({ label: "Malayalam (മലയാളം)", data: "Malayalam" }),
                    contextMenu.Item({ label: "Oriya (ଓଡ଼ିଆ)", data: "Oriya" }),
                    contextMenu.Item({ label: "Katapayadi sankhya", data: "Katapayadi" })
                ],
                onMessage: function (indicScript) {
                    for (var subselection in selection) {
                        if(indicScript == "Katapayadi"){
                            var resultIndicScript = myMod.convert2IndicScript(subselection.html||subselection.text,
                                                                              "ISO",
                                                                              "Devanagari",
                                                                              0,
                                                                              0,
                                                                              preferences.prefs.preferASCIIDigits);
                            subselection.html = myMod.convert2Katapayadi(resultIndicScript);
                        }
                        else {
                            subselection.html = myMod.convert2IndicScript(subselection.html||subselection.text,
                                                                          "ISO",
                                                                          indicScript,
                                                                          0,
                                                                          0,
                                                                          preferences.prefs.preferASCIIDigits);
                        }
                    }
                }
            })
        ]
    });
    return true;
};
