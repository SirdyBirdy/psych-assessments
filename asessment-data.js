// ── Assessment registry ──
// This is the ONLY place you need to edit when adding a new assessment.
// Add one entry to the relevant category's `items` array (or add a whole
// new category object) and the index page will render the card
// automatically — no need to touch index.html.
//
// Fields per item:
//   name : string  — display name of the assessment
//   desc : string  — short description line (item count, type, etc.)
//   url  : string  — path to the assessment's HTML file

const ASSESSMENTS = [
  {
    category: 'Depression',
    items: [
      {
        name: 'Beck Depression Inventory (BDI)',
        desc: '21 items · Self-report · Measures severity of depression',
        url: 'assessments/bdi.html',
      },
      {
        name: 'PHQ-9',
        desc: '9 items · Self-report · Patient Health Questionnaire for depression',
        url: 'assessments/phq9.html',
      },
    ],
  },
  {
    category: 'Anxiety',
    items: [
      {
        name: 'Beck Anxiety Inventory (BAI)',
        desc: '21 items · Self-report · Measures severity of anxiety symptoms',
        url: 'assessments/bai.html',
      },
      {
        name: 'GAD-7',
        desc: '7 items · Self-report · Generalised Anxiety Disorder scale',
        url: 'assessments/gad7.html',
      },
      {
        name: 'Anxiety Sensitivity Index-3 (ASI-3)',
        desc: '18 items · Self-report · Physical, cognitive & social subscales',
        url: 'assessments/asi3.html',
      },
      {
        name: 'Intolerance of Uncertainty Scale (IUS-27)',
        desc: '27 items · Self-report · Total score plus two factor subscales',
        url: 'assessments/ius.html',
      },
    ],
  },
  {
    category: 'Panic',
    items: [
      {
        name: 'Panic Disorder Severity Scale – SR (PDSS-SR)',
        desc: '7 items · Self-report · Frequency, distress & avoidance',
        url: 'assessments/pdss.html',
      },
    ],
  },
  {
    category: 'Hopelessness & Risk',
    items: [
      {
        name: 'Beck Hopelessness Scale (BHS)',
        desc: '20 items · True/False · Measures hopelessness and future outlook',
        url: 'assessments/bhs.html',
      },
    ],
  },
  {
    category: 'OCD',
    items: [
      {
        name: 'Yale-Brown Obsessive Compulsive Scale (Y-BOCS)',
        desc: '10 items · Clinician-administered · Obsessions & compulsions subscales',
        url: 'assessments/ybocs.html',
      },
    ],
  },
  {
    category: 'Trauma & Stress',
    items: [
      {
        name: 'Perceived Stress Scale (PSS-10)',
        desc: '10 items · Self-report · General perceived stress over the past month',
        url: 'assessments/pss.html',
      },
    ],
  },
];

