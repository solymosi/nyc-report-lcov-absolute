# nyc-report-lcov-absolute

LCOV reporter for nyc that outputs absolute file paths to lcov.info.

## Usage

Install the package:

```
npm install --save-dev nyc-report-lcov-absolute
```

Then use it either from the command line:

```
nyc --reporter nyc-report-lcov-absolute [command]
```

...or in `package.json`:

```
{
  "nyc": {
    "reporter": [
      "nyc-report-lcov-absolute"
    ]
  }
}
```
