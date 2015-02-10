exports.main= function() {
    var contextMenu = require("sdk/context-menu");
    var selection = require("sdk/selection");
    var preferences = require("sdk/simple-prefs")
    //var request = require("sdk/request");
    var myMod = require("myModule");

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
                    contextMenu.Item({ label: "Devanagari", data: "Devanagari" }),
                    contextMenu.Item({ label: "Telugu",  data: "Telugu" }),
                    contextMenu.Item({ label: "Kannada", data: "Kannada" }),
                    contextMenu.Item({ label: "Gujarati", data: "Gujarati" }),
                    contextMenu.Item({ label: "Tamil", data: "Tamil" }),
                    contextMenu.Item({ label: "Bengali", data: "Bengali" }),
                    contextMenu.Item({ label: "Gurmukhi", data: "Gurmukhi" }),
                    contextMenu.Item({ label: "Malayalam", data: "Malayalam" }),
                    contextMenu.Item({ label: "Oriya", data: "Oriya" })
                ],
                onMessage: function (outLang) {
                    for (var subselection in selection) {
                        // detect language [to improve speed, passing 'text' instead of 'html']
                        var inpLang = myMod.detectLanguage(subselection.text);
                        if(inpLang != outLang){
                            // convert to English (ITRANS) [if selection is from a text-box, 'html' will be empty so, 'text' is used to convert]
                            var resultITRANS = myMod.convert2IndicScript(subselection.html||subselection.text, "ITRANS", inpLang, 1, 1, preferences.prefs.preferASCIIDigits);
                            if(outLang == "English"){
                                subselection.html = resultITRANS;
                            }
                            else{
                                // convert to the desired output language
                                subselection.html = myMod.convert2IndicScript(resultITRANS, "ITRANS", outLang, 1, 0, preferences.prefs.preferASCIIDigits);
                            }
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
                    contextMenu.Item({ label: "Devanagari", data: "Devanagari" }),
                    contextMenu.Item({ label: "Telugu",  data: "Telugu" }),
                    contextMenu.Item({ label: "Kannada", data: "Kannada" }),
                    contextMenu.Item({ label: "Gujarati", data: "Gujarati" }),
                    contextMenu.Item({ label: "Tamil", data: "Tamil" }),
                    contextMenu.Item({ label: "Bengali", data: "Bengali" }),
                    contextMenu.Item({ label: "Gurmukhi", data: "Gurmukhi" }),
                    contextMenu.Item({ label: "Malayalam", data: "Malayalam" }),
                    contextMenu.Item({ label: "Oriya", data: "Oriya" })
                ],
                onMessage: function (indicScript) {
                    for (var subselection in selection) {
                        subselection.html = myMod.convert2IndicScript(subselection.html||subselection.text, "ISO", indicScript, 0, 0, preferences.prefs.preferASCIIDigits);
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
                    contextMenu.Item({ label: "Devanagari", data: "Devanagari" }),
                    contextMenu.Item({ label: "Telugu",  data: "Telugu" }),
                    contextMenu.Item({ label: "Kannada", data: "Kannada" }),
                    contextMenu.Item({ label: "Gujarati", data: "Gujarati" }),
                    contextMenu.Item({ label: "Tamil", data: "Tamil" }),
                    contextMenu.Item({ label: "Bengali", data: "Bengali" }),
                    contextMenu.Item({ label: "Gurmukhi", data: "Gurmukhi" }),
                    contextMenu.Item({ label: "Malayalam", data: "Malayalam" }),
                    contextMenu.Item({ label: "Oriya", data: "Oriya" })
                ],
                onMessage: function (indicScript) {
                    for (var subselection in selection) {
                        subselection.html = myMod.convert2IndicScript(subselection.html||subselection.text, "ISO", indicScript, 1, 0, preferences.prefs.preferASCIIDigits);
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
                    contextMenu.Item({ label: "Devanagari", data: "Devanagari" }),
                    contextMenu.Item({ label: "Telugu",  data: "Telugu" }),
                    contextMenu.Item({ label: "Kannada", data: "Kannada" }),
                    contextMenu.Item({ label: "Gujarati", data: "Gujarati" }),
                    contextMenu.Item({ label: "Tamil", data: "Tamil" }),
                    contextMenu.Item({ label: "Bengali", data: "Bengali" }),
                    contextMenu.Item({ label: "Gurmukhi", data: "Gurmukhi" }),
                    contextMenu.Item({ label: "Malayalam", data: "Malayalam" }),
                    contextMenu.Item({ label: "Oriya", data: "Oriya" })
                ],
                onMessage: function (indicScript) {
                    for (var subselection in selection) {
                        subselection.html = myMod.convert2IndicScript(subselection.html||subselection.text, "IAST", indicScript, 1, 0, preferences.prefs.preferASCIIDigits);
                    }
                }
            }),
        ]
    });
    return true;
};
