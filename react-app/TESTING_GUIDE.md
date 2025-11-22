# React App Testing Guide
## How to Catch Runtime Errors Before Deployment

---

## Quick Test Checklist

### ✅ Before Deployment - Run These Tests:

```bash
# 1. Production build test (catches most errors)
npm run build

# 2. ESLint check
npm run lint  # (if configured)

# 3. Run test suite
npm test

# 4. Manual browser testing (see below)
```

---

## Method 1: Production Build Test (MOST IMPORTANT)

**Why:** Production build is stricter than dev mode and catches more errors.

```bash
cd react-app
npm run build
```

**What to look for:**
```
✅ "Compiled successfully" = Ready to deploy
❌ "Failed to compile" = Has errors, don't deploy

✅ "The build folder is ready to be deployed" = All good
❌ Any ERROR messages = Fix before deploying
```

**Common errors caught:**
- Undefined exports/imports
- Missing dependencies
- Syntax errors
- Type mismatches
- Missing files

---

## Method 2: Browser Console Testing

### Step-by-Step:
1. Open app: http://localhost:3000
2. Press **F12** (DevTools)
3. Click **Console** tab
4. **Navigate through ALL slides** (1-30)
5. **Interact with ALL charts** (click, hover, drag)
6. **Watch for RED error messages**

### What Each Color Means:
```
🔴 RED = ERROR (must fix)
   "Uncaught TypeError..."
   "Cannot read property..."
   "Element type is invalid..."

🟡 YELLOW = WARNING (usually ok)
   "componentWillMount deprecated"
   "Missing dependency in useEffect"

🔵 BLUE = Info (ok)
   Logs, info messages
```

### Test Each Feature:
```
□ Sidebar navigation - click each goal
□ Previous/Next buttons
□ Keyboard arrows (← →)
□ All 30 slides load without errors
□ Interactive charts respond (hover/click)
□ Sliders work (Price Calculator - slide 27)
□ Checkboxes work (Goal summaries - slides 10, 20, 30)
□ Export buttons work
□ Progress saves (refresh page, check if position maintained)
```

---

## Method 3: Network Tab (Resource Loading)

### Check All Resources Load:
1. Open DevTools (F12)
2. Click **Network** tab
3. Refresh page
4. Look for:
   - ❌ RED/Failed = Resource didn't load
   - ✅ GREEN/200 = Loaded successfully

**Common issues:**
- Chart images not found
- JavaScript chunks failed to load
- CSS not loading

---

## Method 4: React DevTools (Component Errors)

### Install React DevTools Extension:
- Chrome: https://chrome.google.com/webstore (search "React Developer Tools")
- Firefox: https://addons.mozilla.org (search "React DevTools")

### Use:
1. Open DevTools (F12)
2. Click **Components** tab (new tab from extension)
3. Navigate through component tree
4. Check for:
   - ❌ Red components = Render errors
   - ⚠️ Warning icons = Issues
   - ✅ Normal = Working

---

## Method 5: Automated Testing

### Create Test File:

**src/App.test.js:**
```javascript
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders without crashing', () => {
  render(<App />);
});

test('sidebar shows 3 learning goals', () => {
  render(<App />);
  expect(screen.getByText(/Learning Goal 1/i)).toBeInTheDocument();
  expect(screen.getByText(/Learning Goal 2/i)).toBeInTheDocument();
  expect(screen.getByText(/Learning Goal 3/i)).toBeInTheDocument();
});
```

**Run tests:**
```bash
npm test
```

---

## Common Runtime Errors and How to Prevent

### Error 1: "Cannot read property 'map' of undefined"
**Prevention:**
```javascript
// Bad:
{data.map(item => ...)}

// Good:
{data && data.map(item => ...)}
// or
{data?.map(item => ...)}
```

### Error 2: "too late; already running" (D3 issue)
**Prevention:**
```javascript
useEffect(() => {
  const simulation = d3.forceSimulation(...);

  return () => {
    simulation.stop();  // Stop simulation on cleanup
    d3.select(ref.current).selectAll('*').interrupt();  // Stop transitions
  };
}, []);
```

### Error 3: "Maximum update depth exceeded"
**Prevention:**
```javascript
// Bad: setState in render
function Component() {
  setState(...);  // ❌ Causes infinite loop
  return <div>...</div>;
}

// Good: setState in useEffect or event handler
function Component() {
  useEffect(() => {
    setState(...);  // ✅ Correct
  }, []);
  return <div>...</div>;
}
```

### Error 4: "Objects are not valid as React child"
**Prevention:**
```javascript
// Bad:
<div>{someObject}</div>  // ❌ Can't render objects

// Good:
<div>{someObject.value}</div>  // ✅ Render primitives
<div>{JSON.stringify(someObject)}</div>  // ✅ Or convert to string
```

---

## Pre-Deployment Checklist

### Run All These Commands:

```bash
# 1. Clean install
rm -rf node_modules package-lock.json
npm install

# 2. Check for errors in all files
npm run build

# 3. Test in different browsers
# Open in: Chrome, Firefox, Safari, Edge

# 4. Test on mobile (responsive)
# DevTools → Device toolbar → Select mobile device

# 5. Check console for errors
# Navigate through entire app, check console for red errors

# 6. Performance check
# DevTools → Lighthouse → Run audit
```

---

## Specific Tests for This App

### Test All 30 Slides:
```bash
# Automated test script (create this):
# test/slideNavigation.test.js
```

```javascript
describe('Slide Navigation', () => {
  it('navigates through all 30 slides without errors', () => {
    const { getByText } = render(<App />);

    for (let i = 0; i < 30; i++) {
      // Click next button
      fireEvent.click(screen.getByText('Next'));
      // Check no error thrown
    }
  });
});
```

### Test Interactive Charts:
```javascript
describe('Interactive Charts', () => {
  it('MarketGrowthChart renders and is interactive', () => {
    render(<MarketGrowthChart />);
    // Check chart renders
    // Simulate hover event
    // Check tooltip appears
  });

  it('PriceSensitivityCalculator sliders work', () => {
    render(<PriceSensitivityCalculator />);
    // Move slider
    // Check price updates
  });
});
```

---

## How We Fixed Your Error

### Original Error:
```
Uncaught Error: too late; already running
    at InformationFlowNetwork.js:158
```

### Root Cause:
- D3 force simulation kept running after React unmounted component
- Transitions applied to removed/recreated DOM elements
- D3 threw error when trying to start new transition on busy element

### Fix Applied:
1. ✅ Added `.interrupt()` to stop all transitions before cleanup
2. ✅ Added `isMounted` flag to prevent updates after unmount
3. ✅ Improved cleanup function in useEffect

### Result:
✅ Error fixed - app compiles successfully

---

## Real-Time Error Monitoring

### Watch Server Output:
```bash
# Look for these in terminal:
✅ "webpack compiled with 1 warning" = OK
❌ "Failed to compile" = ERROR
❌ "ERROR in ./src/..." = ERROR
```

### Monitor Browser Console:
```bash
# Keep DevTools Console open while testing
# Any RED error = Fix immediately
# YELLOW warnings = Review (usually ok)
```

---

## Best Practices to Avoid Runtime Errors

### 1. Always Clean Up useEffect
```javascript
useEffect(() => {
  // Setup code

  return () => {
    // Cleanup: stop timers, subscriptions, simulations
  };
}, []);
```

### 2. Conditional Rendering
```javascript
{data && <Component data={data} />}
```

### 3. Error Boundaries
Wrap components that might fail:
```javascript
<ErrorBoundary>
  <RiskyComponent />
</ErrorBoundary>
```

### 4. PropTypes or TypeScript
Define expected prop types to catch type errors.

### 5. Test on Multiple Browsers
Chrome, Firefox, Safari, Edge - errors may be browser-specific.

---

## Current Status

✅ **D3 simulation error FIXED**
✅ **App compiles successfully**
✅ **Ready to test in browser**

**Next:** Open http://localhost:3000 and navigate through slides to verify no more errors.
