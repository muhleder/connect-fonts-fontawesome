const path = require("path");
const fs = require("fs");

var src = path.join(__dirname, "node_modules/font-awesome/fonts");
var dst = path.join(__dirname, "fonts/default");

var fontPkgSrc = path.join(__dirname, "node_modules/font-awesome", "package.json");
var fontPkgDst = path.join(__dirname, "fonts", "package.json");

function copyFontFiles() {
	var fontFiles = fs.readdirSync(src);
	for(var i = 0, ii = fontFiles.length; i < ii; i++) {
		fs.createReadStream(path.join(src, fontFiles[i])).pipe(fs.createWriteStream(path.join(dst, fontFiles[i])));
	}

	// We copy the package.json from font-awesome. This way we can compare versions to automatically update fonts when needed.
	fs.createReadStream(fontPkgSrc).pipe(fs.createWriteStream(fontPkgDst));
}

if(!fs.existsSync(path.join(__dirname, "fonts"))) {
	// fonts subdir doesn’t exists, create it and copy files.
	fs.mkdirSync(path.join(__dirname, "fonts"));
	fs.mkdirSync(path.join(__dirname, "fonts/default"));

	copyFontFiles();
} else {
	// fonts subdir exists, compare versions of fonts & update if needed
	var fontPkgSrcVersion = require(fontPkgSrc).version;

	try {
		var fontPkgDstVersion = require(fontPkgDst).version;

		if(fontPkgSrcVersion !== fontPkgDstVersion) {
			copyFontFiles();
		}
	} catch(e) {
		// Cannot find fontPkgDst, copy files
		copyFontFiles();
	}
}

module.exports = {
	"root": path.join(__dirname, "fonts"),

	// Package info
	"package": {
		"name": "connect-fonts-fontawesome",
		"homepage": "https://github.com/kmohrf/connect-fonts-fontawesome",
		"repourl": "https://github.com/kmohrf/connect-fonts-fontawesome",
		"bugsurl": "https://github.com/kmohrf/connect-fonts-fontawesome/issues"
	},

	// Package author info
	"author": {
		"name": "Konrad Mohrfeldt",
		"emails": "konrad.mohrfeldt@farbdev.org",
		"urls": "https://konradmohrfeldt.farbdev.org",
		"github": "https://github.com/kmohrf",
		"twitter": "@kmohrf"
	},

	// package license info
	"license": {
		"name": "MIT License"
	},

	// Common font information
	"font_common": {
		"names": "fontawesome",
		"family": "FontAwesome",
		"copyright": "Copyright (c) Dave Gandy (@davegandy)"
	},


	// where to find a locale's fonts in the fonts directory
	"locale-to-subdirs": {},

	// what font types are enabled and what are the extensions of
	// the font files.
	//
	// valid types are embedded-opentype, woff, truetype, svg
	"enabled-types": [ "eot", "woff", "ttf", "svg" ],

	// The fonts. The name of the font must be the same as the font
	// in the fonts directory.
	"fonts": {
		"fontawesome-webfont": {
			"fontFamily": "FontAwesome",
			"fontStyle": "normal",
			"fontWeight": "400",
			"local": ["FontAwesome"]
		}
	}
};
