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
					contextMenu.Item({ label: "Tamil", data: "Tamil" })
				],
				onMessage: function (outLang) {
					for (var subselection in selection) {
                        // detect language [to improve speed, passing 'text' instead of 'html']
                        var inpLang = myMod.detectLanguage(subselection.text);
                        if(inpLang != outLang){
                            // convert to English (ITRANS) [if selection is from a text-box, 'html' will be empty so, 'text' is used to convert]
                            var resultITRANS = myMod.convert2IndicScript(subselection.html||subselection.text, 0, inpLang, 1, 1, preferences.prefs.preferASCIIDigits);
                            if(outLang == "English"){
                                subselection.html = resultITRANS;
                            }
                            else{
                                // convert to the desired output language
            			        subselection.html = myMod.convert2IndicScript(resultITRANS, 0, outLang, 1, 0, preferences.prefs.preferASCIIDigits);
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
					contextMenu.Item({ label: "Tamil", data: "Tamil" })
				],
				onMessage: function (indicScript) {
					for (var subselection in selection) {
                        subselection.html = myMod.convert2IndicScript(subselection.html||subselection.text, 1, indicScript, 0, 0, preferences.prefs.preferASCIIDigits);
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
					contextMenu.Item({ label: "Tamil", data: "Tamil" })
				],
				onMessage: function (indicScript) {
					for (var subselection in selection) {
						subselection.html = myMod.convert2IndicScript(subselection.html||subselection.text, 1, indicScript, 1, 0, preferences.prefs.preferASCIIDigits);
					}
				}
			}),
            /*contextMenu.Menu({
				label: "Google Translator",
				context: contextMenu.SelectionContext(),
				contentScript: 'self.on("click", function (node, data) {' +
					 '  self.postMessage(data);' +
					 '});',
				items: [
					contextMenu.Item({ label: "Devanagari", data: "Devanagari" }),
					contextMenu.Item({ label: "Telugu",  data: "Telugu" }),
					contextMenu.Item({ label: "Kannada", data: "Kannada" }),
					contextMenu.Item({ label: "Gujarati", data: "Gujarati" }),
					contextMenu.Item({ label: "Tamil", data: "Tamil" })
				],
				onMessage: function (indicScript) {
                    /*var langCode;
                    if(indicScript == "Devanagari"){langCode = "|hi";}
        			else if(indicScript == "Telugu"){langCode = "|te";}
            		else if(indicScript == "Kannada"){langCode = "|kn";}
            		else if(indicScript == "Gujarati"){langCode = "|gu";}
            		else if(indicScript == "Tamil"){langCode = "|en";}
        			for (var subselection in selection) {* /
                        var req = request.Request({
                            url: "http://ajax.googleapis.com/ajax/services/language/translate",
                            content:{
                                v: "1.0",
                                q: selection.text,
                                langpair: "|en"
                            },
                            onComplete: function(response){
                                selection.text = response.json.responseData.translateText;
                            }
                        });
                        req.get();                        
  					//}
				}
			})*/
		]
	});
	return true;
};