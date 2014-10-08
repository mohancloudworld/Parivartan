var myTable = require("myTables");

// Dictionaries to modify/extend the original dictionaries
var devanagari_dict_mod = {};
var telugu_dict_mod     = {};
var kannada_dict_mod    = {};
var gujarati_dict_mod   = {};
var tamil_dict_mod      = {};
var english_dict_mod    = {};        

var devanagari_dict_rev = {};
var telugu_dict_rev     = {};
var kannada_dict_rev    = {};
var gujarati_dict_rev   = {};
var tamil_dict_rev      = {};
var english_dict_rev    = {};

function init()
{
    // new modified/extended dictionaries
    devanagari_dict_mod = extend(myTable.devanagari_dict);
    telugu_dict_mod     = extend(myTable.telugu_dict);
    kannada_dict_mod    = extend(myTable.kannada_dict);
    gujarati_dict_mod   = extend(myTable.gujarati_dict);
    tamil_dict_mod      = extend(myTable.tamil_dict);
    english_dict_mod    = extend(myTable.english_dict);

    // reverse dictionaries
    devanagari_dict_rev = reverse(myTable.devanagari_dict);
    telugu_dict_rev     = reverse(myTable.telugu_dict);
    kannada_dict_rev    = reverse(myTable.kannada_dict);
    gujarati_dict_rev   = reverse(myTable.gujarati_dict);
    tamil_dict_rev      = reverse(myTable.tamil_dict);
    english_dict_rev    = reverse(myTable.english_dict);
}

function detectLanguage(inp_txt){
    var indx;
    var chr;
    for (indx = 0; indx <  inp_txt.length; indx++){
        chr = inp_txt.charAt(indx);
        if((array_key_exists(chr, devanagari_dict_rev["Independent_vowels"])) || (array_key_exists(chr, devanagari_dict_rev["Consonants"]))) {
            return "Devanagari";
        }
        else if((array_key_exists(chr, telugu_dict_rev["Independent_vowels"])) || (array_key_exists(chr, telugu_dict_rev["Consonants"]))) {
            return "Telugu";
        }
        else if((array_key_exists(chr, kannada_dict_rev["Independent_vowels"])) || (array_key_exists(chr, kannada_dict_rev["Consonants"]))) {
            return "Kannada";
        }
        else if((array_key_exists(chr, gujarati_dict_rev["Independent_vowels"])) || (array_key_exists(chr, gujarati_dict_rev["Consonants"]))) {
            return "Gujarati";
        }
        else if((array_key_exists(chr, tamil_dict_rev["Independent_vowels"])) || (array_key_exists(chr, tamil_dict_rev["Consonants"]))) {
            return "Tamil";
        }
    }
    return "English"; // default
}

function convert2IndicScript(inp_txt, is_IAST, indicScript, modeStrict, reverse, preferASCIIDigits)
{
    var indx=0;
    var out = "";
	var vovel_needed_p = false;
	var word_start_p = true;
	var prev_Type = "NoMatch";
	var insideTag_p = false;
        var blk, blkLen, Type;

    // Assigning the dictionary
	var lang_dict;
	if(reverse){
        if(indicScript == "Devanagari"){lang_dict = devanagari_dict_rev;}
        else if(indicScript == "Telugu"){lang_dict = telugu_dict_rev;}
        else if(indicScript == "Kannada"){lang_dict = kannada_dict_rev;}
        else if(indicScript == "Tamil"){lang_dict = tamil_dict_rev;}
    	else if(indicScript == "Gujarati"){lang_dict = gujarati_dict_rev;}
    	else {lang_dict = english_dict_rev;}        
	}
    else if(modeStrict){ // orignal dictionaries if modeStrict 
        if(indicScript == "Devanagari"){lang_dict = myTable.devanagari_dict;}
        else if(indicScript == "Telugu"){lang_dict = myTable.telugu_dict;}
    	else if(indicScript == "Kannada"){lang_dict = myTable.kannada_dict;}
    	else if(indicScript == "Tamil"){lang_dict = myTable.tamil_dict;}
    	else if(indicScript == "Gujarati"){lang_dict = myTable.gujarati_dict;}
    	else {lang_dict = myTable.english_dict;}
    } 
    else { // modified/extended dictionaries if not modeStrict
        if(indicScript == "Devanagari"){lang_dict = devanagari_dict_mod;}
        else if(indicScript == "Telugu"){lang_dict = telugu_dict_mod;}
        else if(indicScript == "Kannada"){lang_dict = kannada_dict_mod;}
    	else if(indicScript == "Tamil"){lang_dict = tamil_dict_mod;}
    	else if(indicScript == "Gujarati"){lang_dict = gujarati_dict_mod;}
    	else {lang_dict = english_dict_mod;}
    }

    // convert to ITRANS   
    if(is_IAST) {
		inp_txt = convert2ITRANS(inp_txt);
	}
	
	while (indx <  inp_txt.length){
        
        // skip space charecter "&nbsp;"
        if(inp_txt.substring(indx,indx+6) == "&nbsp;"){
            if(vovel_needed_p){
        		out += lang_dict["VIRAMA"];
    		}
    		out += "&nbsp;";
            indx += 6;
    		word_start_p = true;
            vovel_needed_p=0;
            continue;
        }	
        
        [blk, blkLen, Type, vovel_needed_p, insideTag_p] = getNxtIndicChr(lang_dict, inp_txt.substring(indx), modeStrict, word_start_p, vovel_needed_p, insideTag_p, reverse, preferASCIIDigits);
		out += blk;
		if(Type == "NoMatch"){
			//document.write( inp_txt.substring(indx, indx+blkLen)+": ***** NoMatch (blkLen)<br>");
			indx += 1;
			word_start_p = true;
		}
		else{
			//document.write( inp_txt.substring(indx, indx+blkLen)+": "+blk+" Match (blkLen)<br>");
			indx += blkLen;
			word_start_p = false;
		}
	}
	if(vovel_needed_p){
		out += lang_dict["VIRAMA"];
	}
	vovel_needed_p=0;
	//document.getElementById("out_txt").value=out;
	return out;
}

function convert2ITRANS(inp_txt)
{
    var myTab = require("myTables");
	var insideTag_p = false;
	var indx=0;
	var out = "";
	var blk, blkLen, Type, insideTag_p;
	while (indx <  inp_txt.length){
		[blk, blkLen, Type, insideTag_p] = convertNextBlk2ITRANS(myTab.iast2itrans_dict, inp_txt.substring(indx), insideTag_p);
		out += blk;
		if(Type == "NoMatch"){
			indx += 1;
		}
		else{
			indx += blkLen;
		}
	}
	return out;
}

function convertNextBlk2ITRANS(trans_dict, inp_txt, insideTag_p){
	var MAX=2; // *** set this
	var debug=0;
	var insideTag = insideTag_p;
	var Type = "NoMatch"; //default
	var out = "";
	var blk = "";
	var blkLen=MAX;
	while(blkLen > 0){
		//if(debug){document.write( inp_txt.substring(0, blkLen)+" <br>");}
		// selecting block, skip it its a TAG i.e., inside < >
		if( (!insideTag) && (inp_txt.charAt(0) == "<") ){
			insideTag = true;
			break;
		}
		else if( (insideTag) && (inp_txt.charAt(0) == ">") ){
			insideTag = false;
			break;			
		}
		else if(insideTag){
			break;			
		}
		blk= inp_txt.substring(0, blkLen);
		//if(debug){document.write( "<br>blk...:"+blk+" "+word_start+" "+vovel_needed+"<br>");}
		
		if( array_key_exists(blk, trans_dict) ){
            Type = "Match";
			out += trans_dict[blk];
			//if(debug){document.write( "5: "+"-"+blk+" "+trans_dict[blk]);}
			break;
		}
		// No match for the taken block 
		else{
			blkLen -= 1;
		}
	}
	if(Type == "NoMatch"){// no match found
    	out += inp_txt[0];
	}
	else{ 
    	//if(debug){document.write( "Match "+vovel_needed+"<br>");}
	}	
	//if(debug){document.write( "<br>returning "+out+" "+blkLen+"<br>");}
	return [out, blkLen, Type, insideTag];
};

function getNxtIndicChr(lang_dict, inp_txt, modeStrict, word_start_p, vovel_needed_p, insideTag_p, reverse, preferASCIIDigits){
	var MAX=4; // *** set this
	var debug=0;
	var out = "";
	var Type = "NoMatch"; //default
	var vovel_needed = vovel_needed_p;
	var word_start = word_start_p;
	var insideTag = insideTag_p;
	var blk = "";
	var blkLen=MAX;
	var iteration = 1; // first time 
    
    // decoding charecter-by-charecter in reverse convertion
    if(reverse){
        blkLen=1;
    }
	while(blkLen > 0){
		//if(debug){document.write( inp_txt.substring(0, blkLen)+" <br>");}
		// selecting block, skip it its a TAG i.e., inside < >
		if( (!insideTag) && (inp_txt.charAt(0) == "<") ){
			insideTag = true;
			break;
		}
		else if( (insideTag) && (inp_txt.charAt(0) == ">") ){
			insideTag = false;
			break;			
		}
		else if(insideTag){
			break;			
		}
		else if(inp_txt.length >= blkLen){ // string is longer than or equal to blkLen
			blk= inp_txt.substring(0, blkLen);
		}
		else if(inp_txt.length > 0){ // string is shorter than blkLen
			blk = inp_txt.substring(0);
		}
		else{ // string is of zero length
			break;
		}

        //if(debug){document.write( "<br>blk...:"+blk+" "+word_start+" "+vovel_needed+"<br>");}

		// if not modeStrict, convert the 1st letter of every word to lower-case		
		if((!modeStrict) && (word_start == true)){
			blk = blk.substring(0,1).toLowerCase() + blk.substring(1);
		}

        // 2nd iteration ==> working case-insensitive
        if((!modeStrict) && (iteration == 2)){
            blk = blk.toLowerCase();
        }

		// Independent vowels
		if( (vovel_needed == false) 
            && (array_key_exists(blk, lang_dict["Independent_vowels"])) ){
			Type = "Independent";
			vovel_needed=0;
			out += lang_dict["Independent_vowels"][blk];
			//if(debug){document.write( "5: "+"-"+blk+" "+lang_dict["Independent_vowels"][blk]);}
			break;
		}
		// Dependent vowels
		else if((vovel_needed) 
                && (array_key_exists(blk, lang_dict["Dependent_vowel"])) ){
			Type = "Vowel";
			vovel_needed=0;
			out += lang_dict["Dependent_vowel"][blk];
			//if(debug){document.write( "7: "+blk+" "+lang_dict["Dependent_vowel"][blk]);}
			break;
		}
		// Consonants
		else if(array_key_exists((blk), lang_dict["Consonants"])){
			if(vovel_needed){
				out += lang_dict["VIRAMA"];
			}
			Type = "Consonants";
			vovel_needed=1;
			out += lang_dict["Consonants"][blk];
			//if(debug){document.write( "8: "+blk+" "+lang_dict["Consonants"][blk]);}
			break;
		}
		// Others [Do not convert ASCII Digits if option is selected]
		else if( !((isASCIIDigit(blk) == true) && (preferASCIIDigits == true)) 
                && array_key_exists(blk, lang_dict["Others"])){
			if(vovel_needed){
				out += lang_dict["VIRAMA"];
			}
            Type = "Other";
			vovel_needed = 0;
            // nullify "a"+".h" in reverse conversion
			if(lang_dict["Others"][blk] == ".h"){
    		    out = out.substring(0, out.length-1);
			}
    		else {
        	    out += lang_dict["Others"][blk];
    		}
			//if(debug){document.write( "9: "+blk+" "+lang_dict["Others"][blk]+"<br>");}
			break;
		}
		// No match for the taken block 
		else{
            // 2nd iteration ==> repeat as case-insensitive
            if((!modeStrict) && (iteration == 1)){
                iteration += 1;
                continue;
            }
			blkLen -= 1;
		}
	}
	if(Type == "NoMatch"){ // no match found
		if(vovel_needed){
			out += lang_dict["VIRAMA"];
		}
		//if(debug){document.write( "No match "+vovel_needed+"<br>");}
		out += inp_txt[0];
		word_start = true;
		vovel_needed=0;
	}	
	else{
		//if(debug){document.write( "Match "+vovel_needed+"<br>");}
		word_start = false;
	}
	//if(debug){document.write( "<br>returning "+out+" "+blkLen+" "+Type+" "+vovel_needed+"<br>");}
	return [out, blkLen, Type, vovel_needed, insideTag];
};

function array_key_exists(key, dict)
{
    if (key in dict) return true;
	else return false;	
}

// to extend dictionaries
function extend(org_dict) {
    var ext_dict = {
        "Independent_vowels" : {
            "ee"    :   org_dict['Independent_vowels']["E"]
        },
        "Dependent_vowel" : {
            "ee"    :   org_dict['Dependent_vowel']["E"]
        },
        "Consonants" : {
            "c"     :   org_dict['Consonants']["k"],
            "f"     :   org_dict['Consonants']["ph"],
            "z"     :   org_dict['Consonants']["j"],
            
            // Modifications eto IAST/ITRANS
            "t"     :   org_dict['Consonants']["T"],
            "tt"    :   org_dict['Consonants']["Th"],
            "th"    :   org_dict['Consonants']["t"],
            "tth"   :   org_dict['Consonants']["th"],
            "d"     :   org_dict['Consonants']["D"],
            "dd"    :   org_dict['Consonants']["Dh"],
            "dh"    :   org_dict['Consonants']["d"],
            "ddh"   :   org_dict['Consonants']["dh"]
        }
    };
    
    var new_dict = cloneDict(org_dict);
    for (var property in ext_dict) {
    	for(var key in ext_dict[property]){
		    if (ext_dict[property][key]) {
    	    		new_dict[property][key] = ext_dict[property][key];
			}
		}
	}
	return new_dict;
};

// clone dictionaries
function cloneDict(dict) {
    if(typeof(dict) != 'object') return dict;
    if(dict == null) return dict;
     
    var new_dict = new Object();
     
    for(var property in dict){
        new_dict[property] = cloneDict(dict[property]);
    }
    return new_dict;
}

// to extend dictionaries
function reverse(org_dict) {
    var new_dict = new Object();
    for (var property in org_dict) {
        new_dict[property] = cloneRevDict(org_dict[property]);
    }
    
    // nullify the adding of "VIRAMA"
    new_dict["VIRAMA"] = "a"; 
    
	return new_dict;
};

// clone dictionaries
function cloneRevDict(dict) {
    if(typeof(dict) != 'object') return dict;
    if(dict == null) return dict;
     
    var new_dict = new Object();
     
    for(var property in dict){
            new_dict[dict[property]] = property;
    }
    return new_dict;
}

function isASCIIDigit(n) {
  return ((n>=0) && (n<=9));
}

exports.init = init;
exports.detectLanguage = detectLanguage;
exports.convert2IndicScript = convert2IndicScript;
