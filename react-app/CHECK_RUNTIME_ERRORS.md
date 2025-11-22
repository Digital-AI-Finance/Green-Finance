# How to Check for Runtime Errors in React App

## Method 1: Browser Developer Console

### Steps:
1. Open http://localhost:3000 in browser
2. Press **F12** (or Right-click → Inspect)
3. Click **Console** tab
4. Look for RED error messages

### What to Look For:
```
❌ RED TEXT = Runtime Error
   Examples:
   - "Uncaught TypeError: Cannot read property 'map' of undefined"
   - "Element type is invalid"
   - "Objects are not valid as a React child"

⚠️ YELLOW TEXT = Warning (usually ok)
   Examples:
   - "componentWillMount is deprecated"
   - "findDOMNode is deprecated"

✅ BLUE/BLACK TEXT = Info/Logs (ok)
```

### Common Runtime Errors in React:
1. **Undefined data:** Trying to map/access data that doesn't exist
2. **Invalid components:** Importing component incorrectly
3. **Missing dependencies:** useEffect missing dependencies
4. **Type mismatches:** Passing wrong prop types
5. **Async issues:** State updates on unmounted components

---

## Method 2: React Error Boundary (Catch All Errors)

Create error boundary to catch runtime errors:

**Create: src/components/ErrorBoundary.js**
```javascript
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Runtime Error Caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{padding: '20px', color: 'red'}}>
          <h1>Something went wrong.</h1>
          <details>
            <summary>Error Details</summary>
            <pre>{this.state.error?.toString()}</pre>
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
```

**Wrap App in index.js:**
```javascript
import ErrorBoundary from './components/ErrorBoundary';

root.render(
  <ErrorBoundary>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </ErrorBoundary>
);
```

---

## Method 3: Test Each Component Individually

### Test All Charts:
```bash
# Create test file: src/charts/__tests__/charts.test.js
```

```javascript
import { render } from '@testing-library/react';
import MarketGrowthChart from '../MarketGrowthChart';
import InformationFlowNetwork from '../InformationFlowNetwork';
// ... import all charts

test('MarketGrowthChart renders without crashing', () => {
  render(<MarketGrowthChart />);
});

test('InformationFlowNetwork renders without crashing', () => {
  render(<InformationFlowNetwork />);
});

// Test all 12 charts...
```

Run tests:
```bash
npm test
```

---

## Method 4: Build Production Bundle (Catches More Errors)

```bash
cd react-app
npm run build
```

**What happens:**
- If build succeeds → No critical errors
- If build fails → Shows exact error location

**Benefits:**
- Catches import errors
- Catches undefined exports
- Catches syntax errors
- More strict than dev mode

---

## Method 5: Check Network Tab (Data Loading Errors)

1. Open DevTools (F12)
2. Click **Network** tab
3. Reload page
4. Look for:
   - ❌ Red/Failed requests = Resource not loading
   - ✅ Green/200 = All resources loaded

---

## Method 6: Manual Component Testing

### Test Each Slide Type:
```
1. Navigate to Slide 1 (Learning Goal Title) - Does it load?
2. Navigate to Slide 2 (Framework Overview) - Does it render?
3. Navigate to Slide 3 (Chart - Network) - Does chart appear?
4. Continue through all 39 slides...
```

If any slide shows error or blank screen = Runtime error on that slide.

---

## Common Runtime Errors and Fixes

### Error 1: "Cannot read property 'map' of undefined"
**Cause:** Data not loaded before trying to render
**Fix:** Add conditional rendering
```javascript
{data && data.map(item => ...)}
// or
{data?.map(item => ...)}
```

### Error 2: "Element type is invalid"
**Cause:** Component import wrong
**Fix:** Check import statement
```javascript
// Wrong:
import MarketGrowthChart from './charts/MarketGrowthChart';
// If file exports default

// Correct:
import MarketGrowthChart from '../charts/MarketGrowthChart';
```

### Error 3: "Objects are not valid as a React child"
**Cause:** Trying to render object directly
**Fix:** Convert to string or extract value
```javascript
// Wrong:
<div>{someObject}</div>

// Correct:
<div>{someObject.value}</div>
```

### Error 4: "Cannot update component while rendering different component"
**Cause:** setState during render
**Fix:** Move to useEffect or event handler

---

## Systematic Error Check Procedure

### Run These Commands:

```bash
# 1. Stop current server
# (Ctrl+C or kill process)

# 2. Clear cache
cd react-app
rm -rf node_modules/.cache

# 3. Restart clean
npm start

# 4. Watch output for "Failed to compile" or "ERROR in"

# 5. Open browser console
# F12 → Console → Look for red errors

# 6. Try production build
npm run build
# If succeeds → Good
# If fails → Shows error locations
```

---

## Quick Diagnosis Commands

```bash
# Check for syntax errors in all JS files
cd react-app/src
find . -name "*.js" -exec node -c {} \; 2>&1 | grep -i error

# Check for missing imports
grep -r "import.*from.*undefined" src/

# List all created chart files
ls -la src/charts/*.js
```

---

## What to Check Right Now

**Open browser console (F12) and look for:**
1. Red error messages
2. Component stack traces
3. Failed to load resources

**Tell me:**
- What RED error messages do you see?
- On which slide does it crash?
- What is the exact error text?

Then I can fix the specific runtime errors.
