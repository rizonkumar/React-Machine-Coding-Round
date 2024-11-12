# React Stepper Component 

## Component Overview
The Stepper component is a multi-step progress indicator commonly used in forms, wizards, or multi-step processes.

## Key Components

### 1. State Management
```javascript
const [currentStep, setCurrentStep] = useState(0);
```
- Tracks the current active step
- Initialized to 0 (first step)
- Managed using React's useState hook

### 2. Navigation Functions

#### handleNext()
```javascript
const handleNext = () => {
  if (currentStep < steps.length - 1) {
    setCurrentStep(currentStep + 1);
  }
};
```
- Moves to next step if not on last step
- Prevents going beyond last step using length check

#### handleBack()
```javascript
const handleBack = () => {
  if (currentStep > 0) {
    setCurrentStep(currentStep - 1);
  }
};
```
- Moves to previous step if not on first step
- Prevents going below first step using zero check

### 3. Props Structure
```javascript
steps = [
  {
    label: "Step Name",
    content: <Component />
  }
]
```
- Array of step objects
- Each step has a label and content
- Content can be any React component

### 4. Rendering Logic

#### Step Numbers and Lines
```javascript
<div className={`step-number ${index <= currentStep ? "active" : ""}`}>
  {index + 1}
  {index < steps?.length - 1 && (
    <div className={`step-line ${index < currentStep ? "active" : ""}`}></div>
  )}
</div>
```
- Displays numbered circles for each step
- Adds 'active' class to completed steps
- Renders connecting lines between steps
- Last step doesn't have a line

#### Content Display
```javascript
<div className="stepper-content">{steps[currentStep].content}</div>
```
- Shows content of current step only
- Content changes when currentStep changes

#### Navigation Controls
```javascript
<div className="stepper-controls">
  <button onClick={handleBack}>Back</button>
  <button onClick={handleNext}>Continue</button>
</div>
```
- Back and Continue buttons
- Controls step navigation

## Usage Example
```javascript
const steps = [
  {
    label: "Personal Info",
    content: <div>Personal Information Content</div>
  },
  // ... more steps
];

<Stepper steps={steps} />
```
- Define steps array with labels and content
- Pass steps array as prop to Stepper component

