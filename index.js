"use strict";

/**
 * Copyright (C) 2020, Mate Solymosi
 * Licensed under the MIT License - see the LICENSE file for more details
 */

const fs = require("fs");
const path = require("path");
const LcovReport = require("istanbul-reports/lib/lcov");
const HtmlReport = require("istanbul-reports/lib/html");
const LcovOnlyReport = require("istanbul-reports/lib/lcovonly");

class LcovOnlyAbsoluteReport extends LcovOnlyReport {
  onEnd(_, context) {
    super.onEnd();
    const file = path.resolve(context.writer.baseDir, this.file);
    const content = fs.readFileSync(file, "utf8");
    const result = content.replace(
      /(\r?\n)SF:(.*?\r?\n)/gm,
      "$1SF:" + this.projectRoot + path.sep + "$2",
    );
    fs.writeFileSync(file, result, "utf8");
  }
}

class LcovAbsoluteReport extends LcovReport {
  constructor(opts) {
    super(opts);
    this.lcov = new LcovOnlyAbsoluteReport({ file: "lcov.info", ...opts });
    this.html = new HtmlReport({ subdir: "lcov-report" });
  }
}

module.exports = LcovAbsoluteReport;
