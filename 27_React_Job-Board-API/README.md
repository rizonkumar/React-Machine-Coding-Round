# Job Board Project

Build a job board that displays the latest job postings fetched from the Hacker News API, with each posting displaying the job title, poster, and date posted.

## Requirements

- The page should show 6 jobs on initial load with a button to load more postings.
- Clicking the "Load more" button will load the next page of 6 postings. The button does not appear if there aren't any more postings to load.
- If there's a URL field returned for the job details, make the job title a link that opens the job details page in a new window when clicked.
- The timestamp can be formatted in any way you like.

## API

Hacker News has a public API to fetch jobs by Y Combinator companies. There's no single API that fetches a list of jobs together with the data, so you will have to make separate requests to fetch the necessary data and combine them to be displayed.

### Job Stories

Fetches a list of job posting IDs.

- **URL:** `https://hacker-news.firebaseio.com/v0/jobstories.json`
- **HTTP Method:** GET
- **Content Type:** json

Sample response:

```json
[35908337, 35904973, 35900922, 35893439, 35890114, 35880345, ...]
```

### Job Details

Fetches job posting details given its ID.

- **URL:** `https://hacker-news.firebaseio.com/v0/item/{id}.json`
- **HTTP Method:** GET
- **Content Type:** json

Sample response for `https://hacker-news.firebaseio.com/v0/item/35908337.json`:

```json
{
  "by": "jamilbk",
  "id": 35908337,
  "score": 1,
  "time": 1683838872,
  "title": "Firezone (YC W22) is hiring Elixir and Rust engineers",
  "type": "job",
  "url": "https://www.ycombinator.com/companies/firezone/jobs"
}
```

## Notes

- The focus of this question is on functionality and not on styling, but feel free to beautify the page.
- To improve the user experience and avoid overfetching, you may want to limit the number of job details fetched to the number of jobs visible on the page.

# Analysis of Hacker News Jobs Board Implementation

## Table of Contents

1. [JavaScript Methods Used](#javascript-methods-used)
2. [React Hooks Used](#react-hooks-used)
3. [Spread Operator Explanation](#spread-operator-explanation)
4. [Complete Code Flow](#complete-code-flow)
5. [Multiple useEffect Explanation](#multiple-useeffect-explanation)
6. [Complete Code Breakdown](#complete-code-breakdown)

## JavaScript Methods Used

### 1. Array.map()

**Purpose**: Transform each element in an array  
**Example**:

```javascript
const jobPromises = idArr.map((id) =>
  axios.get(`${JOB_DETAILS_API}${id}.json`).then((res) => res.data)
);
```

**Why**: Converts array of IDs to array of API request promises

### 2. Array.slice()

**Purpose**: Get subset of an array  
**Example**:

```javascript
const idArr = ids.slice(start, end);
```

**Why**: Gets only the IDs needed for current page

### 3. Promise.all()

**Purpose**: Handle multiple promises concurrently  
**Example**:

```javascript
const newJobs = await Promise.all(jobPromises);
```

**Why**: Fetches all job details in parallel for efficiency

### 4. Date.toLocaleString()

**Purpose**: Format dates  
**Example**:

```javascript
date.toLocaleString("en-US", { ...options });
```

**Why**: Converts Unix timestamp to readable date format

### 5. try/catch/finally

**Purpose**: Error handling  
**Example**:

```javascript
try {
  // API calls
} catch (err) {
  // Handle error
} finally {
  // Cleanup
}
```

**Why**: Gracefully handles network errors

## React Hooks Used

### 1. useState

**Purpose**: Manage component state  
**Examples**:

```javascript
const [ids, setIds] = useState([]); // Job IDs
const [jobs, setJobs] = useState([]); // Job details
const [loading, setLoading] = useState(false); // Loading state
const [error, setError] = useState(null); // Error state
```

### 2. useEffect

**Purpose**: Side effects management  
**Examples**:

```javascript
// Initial data fetch
useEffect(() => {
  getJobIds();
}, []);

// Fetch first page when IDs load
useEffect(() => {
  if (ids.length > 0 && jobs.length === 0) {
    getJobDetails(0, PER_PAGE);
  }
}, [ids]);
```

## Spread Operator Explanation

### `setJobs(prevJobs => [...prevJobs, ...newJobs])`

**Why this pattern**:

1. **Immutability**: React state should never be mutated directly
2. **Functional Update**: Ensures we have latest state value
3. **Array Concatenation**: Combines existing jobs with new jobs

**Breakdown**:

- `prevJobs`: Current state value
- `...prevJobs`: Spreads existing jobs into new array
- `...newJobs`: Spreads newly fetched jobs into same array
- Creates new array combining both

**Alternative (problematic)**:

```javascript
setJobs([...jobs, ...newJobs]);
// Might use stale 'jobs' value if multiple updates occur quickly
```

## Complete Code Flow

1. **Component Mounts**

   - Initializes all state variables
   - First `useEffect` triggers `getJobIds()`

2. **Fetch Job IDs**

   - Makes API call to `jobstories.json`
   - On success: Updates `ids` state
   - On failure: Sets error state

3. **IDs Loaded**

   - Second `useEffect` detects `ids` change
   - If no jobs loaded yet, fetches first page (6 jobs)

4. **Fetch Job Details**

   - Takes slice of IDs (first 6 initially)
   - Creates parallel requests for each job
   - Updates `jobs` state when all complete
   - Handles errors appropriately

5. **User Interaction**

   - "Load more" button appears when more jobs available
   - Clicking it fetches next page of jobs
   - Button disabled during loading

6. **Render Cycle**
   - Maps through `jobs` to display cards
   - Formats dates properly
   - Shows loading/error states

## Multiple useEffect Explanation

### Why Two useEffect Hooks?

1. **First useEffect**:

```javascript
useEffect(() => {
  getJobIds();
}, []);
```

- **Purpose**: Initial data fetch (job IDs)
- **Dependencies**: Empty array = runs once on mount
- **Why Separate**: Job IDs only need to be fetched once

2. **Second useEffect**:

```javascript
useEffect(() => {
  if (ids.length > 0 && jobs.length === 0) {
    getJobDetails(0, PER_PAGE);
  }
}, [ids]);
```

- **Purpose**: Fetch first page of jobs when IDs are available
- **Dependencies**: Runs when `ids` changes
- **Why Separate**: Need to wait for IDs before fetching details
- **Condition**: Only runs if no jobs loaded yet (`jobs.length === 0`)

### Benefits of This Structure:

1. **Separation of Concerns**: Different triggers for different actions
2. **Proper Sequencing**: IDs must be fetched before details
3. **Performance**: Avoids unnecessary fetches
4. **Cleaner Code**: Each effect has single responsibility

## Complete Code Breakdown

### 1. Configuration Constants

```javascript
const JOB_API = "https://hacker-news.firebaseio.com/v0/jobstories.json";
const JOB_DETAILS_API = "https://hacker-news.firebaseio.com/v0/item/";
const PER_PAGE = 6;
```

- Centralizes API endpoints
- Makes page size configurable

### 2. State Management

```javascript
const [ids, setIds] = useState([]); // All job IDs
const [jobs, setJobs] = useState([]); // Jobs to display
const [loading, setLoading] = useState(false); // Loading state
const [error, setError] = useState(null); // Error handling
```

- Comprehensive state for all UI needs

### 3. Data Fetching Functions

**getJobIds**:

- Fetches all job IDs from API
- Simple error handling
- Sets loading state appropriately

**getJobDetails**:

- Takes start/end indexes for pagination
- Uses `slice` to get current page IDs
- Parallel requests with `Promise.all`
- Immutable state update
- Comprehensive error handling

### 4. Helper Functions

**loadMoreJobs**:

- Calculates next page indexes
- Calls `getJobDetails` with proper range

**formatDate**:

- Converts Unix timestamp
- Locale-aware formatting
- Consistent date display

### 5. Render Logic

- Conditional rendering of error messages
- Job cards with proper linking
- Loading state indicators
- "Load more" button with disabled state
- Clean separation of concerns in JSX

## Key Architecture Decisions

1. **Pagination**:

   - Client-side pagination for better UX
   - Loads only needed data
   - Smooth "load more" experience

2. **Error Handling**:

   - User-friendly error messages
   - Console logging for debugging
   - Doesn't break UI on errors

3. **Loading States**:

   - Prevents duplicate requests
   - Gives user feedback
   - Disables buttons during load

4. **Data Flow**:
   - Clear sequence: IDs → Details
   - Proper state dependencies
   - No race conditions
