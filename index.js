const path = require("path");
const fs = require("fs");

if(!fs.existsSync(path.join(__dirname, "fonts"))) {
	fs.mkdirSync(path.join(__dirname, "fonts"));
	fs.mkdirSync(path.join(__dirname, "fonts/default"));

	var src = path.join(__dirname, "node_modules/font-awesome/fonts");
	var dst = path.join(__dirname, "fonts/default");
	var fontFiles = fs.readdirSync(src);

	for(var i = 0, ii = fontFiles.length; i < ii; i++) {
		fs.symlinkSync(path.join(src, fontFiles[i]), path.join(dst, fontFiles[i]));
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
