[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://github.com/conectate/ct-date)

# ct-date

A simple cross-platform date input component with optional time selection.

## Installation

```sh
# npm
npm i @conectate/components/ct-date

# yarn
yarn add @conectate/components/ct-date

# pnpm
pnpm i @conectate/components/ct-date
```

## Usage

### Basic Usage

```javascript
import '@conectate/components/ct-date';

// Then use in your HTML
<ct-date label="Select Date"></ct-date>
```

### Examples

> IMPORTANT: `ct-date` by default shows UTC date, if you want to show local date, you can use the `usetimezone` attribute.

```html
<!-- Basic date input -->
<ct-date label="Date"></ct-date>

<!-- Date input with time selection -->
<ct-date label="Date and Time" showhour></ct-date>

<!-- Date input without day selection (month and year only) -->
<ct-date label="Month and Year" nodd></ct-date>

<!-- Required date with validation -->
<ct-date label="Required Date" required></ct-date>

<!-- With min/max year limitations -->
<ct-date label="Limited Year Range" minYYYY="2000" maxYYYY="2030"></ct-date>

<!-- With timezone awareness -->
<ct-date label="Local Timezone" usetimezone></ct-date>
```

### Handling Date Selection

```javascript
// Listen for date selection events
const dateInput = document.querySelector('ct-date');
dateInput.addEventListener('value', (e) => {
  // e.detail contains Unix timestamp in seconds
  console.log('Selected date timestamp:', e.detail);

  // Convert to JavaScript Date object if needed
  const date = new Date(e.detail * 1000);
  console.log('Selected date:', date);
});

// Set date programmatically (using Unix timestamp in seconds)
dateInput.value = 1646137200; // March 1, 2022 UTC

// Validate the input
const isValid = dateInput.validate();
console.log('Is valid date:', isValid);

// Get the current value
const timestamp = dateInput.value;
console.log('Current timestamp:', timestamp);

// Get formatted date value
const formattedDate = dateInput.valueFormat;
console.log('Formatted date:', formattedDate); // e.g. "2022-03-01" or "2022-03-01T12:30:00Z"
```

## Paste Support

The component supports pasting date strings in various formats:

- DD/MM/YYYY
- YYYY-MM-DD
- DD/MM/YYYY HH:MM
- YYYY-MM-DD HH:MM

Simply paste the date string into the input field, and it will automatically parse and fill the appropriate fields.

## API

### Properties

| Property      | Attribute     | Type      | Default | Description                                |
| ------------- | ------------- | --------- | ------- | ------------------------------------------ |
| `label`       | `label`       | `string`  | `""`    | Label text for the input                   |
| `placeholder` | `placeholder` | `string`  | `""`    | Placeholder text for the input             |
| `nodd`        | `nodd`        | `boolean` | `false` | Hides the day input field when true        |
| `showhour`    | `showhour`    | `boolean` | `false` | Shows hour/minute input fields when true   |
| `usetimezone` | `usetimezone` | `boolean` | `false` | Uses local timezone instead of UTC         |
| `required`    | `required`    | `boolean` | `false` | Marks the input as required                |
| `hidden`      | `hidden`      | `boolean` | `false` | Hides the input                            |
| `invalid`     | `invalid`     | `boolean` | `false` | Indicates validation state                 |
| `minYYYY`     | `minYYYY`     | `number`  | `1800`  | Minimum allowed year                       |
| `maxYYYY`     | `maxYYYY`     | `number`  | `2300`  | Maximum allowed year                       |
| `value`       | -             | `number`  | -       | Timestamp value in seconds (getter/setter) |
| `valueFormat` | -             | `string`  | -       | Formatted date string (getter)             |

### Methods

| Name                | Description          | Parameters                         | Returns   |
| ------------------- | -------------------- | ---------------------------------- | --------- |
| `validate()`        | Validates the input  | -                                  | `boolean` |
| `loadValue()`       | Loads a date value   | `value: number\|string\|undefined` | -         |
| `plainTextToDate()` | Parses a date string | `data?: string`                    | -         |

### Events

| Event Name | Detail                    | Description                         |
| ---------- | ------------------------- | ----------------------------------- |
| `value`    | Unix timestamp in seconds | Fires when a valid date is selected |

## Styling

The component uses `ct-input-container` and inherits its styling options. It can be customized with standard CSS.

## Follow me

[![Herberth Obregón](https://user-images.githubusercontent.com/6503845/74269077-8bc2e100-4cce-11ea-8a6f-1ba34b8b5cf2.jpg)](https://x.com/herberthobregon)

[https://x.com/herberthobregon](https://x.com/herberthobregon)

[https://dev.to/herberthobregon](https://dev.to/herberthobregon)

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

- v1.0.0 Initial Release

## License

See [LICENSE](/LICENSE)
