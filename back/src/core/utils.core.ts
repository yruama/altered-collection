import axios from "axios";
import fs from "fs";

/**
 * Download image from url and save it in assets folder
 * @param {string} url
 * @param {string} filename
 * @returns {*}  {Promise<void>}
 */
const downloadImage = async (url: string, filename: string): Promise<void> => {
	console.log("'./src/assets/' + filename => ", "./src/assets/" + filename);
	const response = await axios.get(url, { responseType: "arraybuffer" });

	fs.writeFile("./src/assets/" + filename, response.data, err => {
		if (err != null) throw err;
		else return true;
	});
};

/**
 * Set error/warn logs red and add stack trace
 * @returns {*}  {boolean}
 */
const consoleErrorWithline = (): boolean => {
	const originalMethodError = console.error;
	console.error = (...args) => {
		let initiator = "unknown path";
		try {
			throw new Error();
		} catch (e: any) {
			if (typeof e.stack === "string") {
				let isFirst = true;
				for (const line of e.stack.split("\n")) {
					const matches = line.match(/^\s+at\s+(.*)/);
					if (matches) {
						if (!isFirst) {
							// first line - current function
							// second line - caller (what we are looking for)
							initiator = matches[1];
							break;
						}
						isFirst = false;
					}
				}
			}
		}
		originalMethodError.apply(console, ["\x1b[31;1m", ...args, "\n", `  at ${initiator}`, "\x1b[0m"]);
	};

	const originalMethodWarn = console.warn;
	console.warn = (...args) => {
		let initiator = "unknown path";
		try {
			throw new Error();
		} catch (e: any) {
			if (typeof e.stack === "string") {
				let isFirst = true;
				for (const line of e.stack.split("\n")) {
					const matches = line.match(/^\s+at\s+(.*)/);
					if (matches) {
						if (!isFirst) {
							// first line - current function
							// second line - caller (what we are looking for)
							initiator = matches[1];
							break;
						}
						isFirst = false;
					}
				}
			}
		}
		originalMethodWarn.apply(console, ["\x1b[31;1m", ...args, "\n", `  at ${initiator}`, "\x1b[0m"]);
	};

	return true;
};

const isJsonString = (str: string): boolean => {
	try {
	  JSON.parse(str);
	  return true;
	} catch (e) {
	  return false;
	}
  }

const parserObject = (obj: any): any => {
    if (typeof obj === 'string' && isJsonString(obj)) {
      return parserObject(JSON.parse(obj));
    } else if (typeof obj === 'object' && obj !== null) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          obj[key] = parserObject(obj[key]);
        }
      }
    }
    return obj;
  }

export { downloadImage, consoleErrorWithline, parserObject };
