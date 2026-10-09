# User Guide — AI-Assisted Call Center Training Platform

## Table of Contents

1. [Overview](#overview)
2. [Getting Started](#getting-started)
   - [Accessing the Platform](#accessing-the-platform)
   - [User Accounts](#user-accounts)
   - [Adding New Users](#adding-new-users)
3. [Trainee Guide](#trainee-guide)
   - [Selecting a Scenario](#selecting-a-scenario)
   - [Voice & Language Options](#voice--language-options)
   - [Running a Training Session](#running-a-training-session)
   - [Understanding Your Score](#understanding-your-score)
   - [Reviewing Training History](#reviewing-training-history)
4. [Admin Guide](#admin-guide)
   - [Admin Dashboard](#admin-dashboard)
   - [Reviewing Trainee Performance](#reviewing-trainee-performance)
   - [Session Detail View](#session-detail-view)
   - [Managing Scenarios](#managing-scenarios)
   - [Configuring Scoring Criteria](#configuring-scoring-criteria)
5. [Training Scenarios](#training-scenarios)
   - [Sample Scenarios](#sample-scenarios)
   - [Scenario Difficulty Levels](#scenario-difficulty-levels)
6. [Tips for Effective Training](#tips-for-effective-training)

---

## Overview

The AI-Assisted Call Center Training Platform lets call center representatives practice real customer interactions using an AI-powered voice simulation. Trainees speak with an AI customer over their microphone in real time, and the system automatically scores their performance after each session.

Two roles are supported:

- **Trainee** — Practices scenarios, reviews scores, and tracks personal progress
- **Admin** — Manages trainees, scenarios, and scoring configuration

---

## Getting Started

### Accessing the Platform

Open the platform URL in **Chrome or Edge** (required for microphone/WebRTC support). You will be prompted to log in with your email and password.

> Safari and Firefox are not recommended — microphone access may not work correctly.

### User Accounts

The platform uses two role-based accounts:

| Role | Example Login | Access |
|------|--------------|--------|
| Trainee | `trainee@example.com` | Scenarios, sessions, personal scores |
| Admin | `admin@example.com` | All trainee data, scenario management, scoring config |

Accounts are created by an administrator — self-registration is disabled.

### Adding New Users

Administrators can create new trainee or admin accounts using the AWS CLI after deployment. Run the following commands, replacing the values as needed:

**Create a trainee account:**

```bash
# Create the user
aws cognito-idp admin-create-user \
  --user-pool-id <USER_POOL_ID> \
  --username "newtrainee@example.com" \
  --user-attributes Name=email,Value="newtrainee@example.com" Name=email_verified,Value=true \
  --temporary-password "TempPass123!"

# Add to trainee group
aws cognito-idp admin-add-user-to-group \
  --user-pool-id <USER_POOL_ID> \
  --username "newtrainee@example.com" \
  --group-name "trainee"
```

**Create an admin account:**

```bash
# Create the user
aws cognito-idp admin-create-user \
  --user-pool-id <USER_POOL_ID> \
  --username "newadmin@example.com" \
  --user-attributes Name=email,Value="newadmin@example.com" Name=email_verified,Value=true \
  --temporary-password "TempPass123!"

# Add to admin group
aws cognito-idp admin-add-user-to-group \
  --user-pool-id <USER_POOL_ID> \
  --username "newadmin@example.com" \
  --group-name "admin"
```

> Find your `USER_POOL_ID` in the AWS Cognito console or from the CloudFormation stack outputs (`CallCenterTraining-Web` → `UserPoolId`).

On first login, users will be prompted to set a permanent password.

**On Windows (PowerShell):**

```powershell
aws cognito-idp admin-create-user `
  --user-pool-id <USER_POOL_ID> `
  --username "newtrainee@example.com" `
  --user-attributes Name=email,Value="newtrainee@example.com" Name=email_verified,Value=true `
  --temporary-password "TempPass123!"

aws cognito-idp admin-add-user-to-group `
  --user-pool-id <USER_POOL_ID> `
  --username "newtrainee@example.com" `
  --group-name "trainee"
```

---

## Trainee Guide

Log in with your trainee credentials (e.g., `trainee@example.com`).

### Selecting a Scenario

After logging in, you will see the **Scenario Library** — a list of available training scenarios. Each scenario card shows:

- Scenario name and description
- Difficulty level (Beginner / Intermediate / Advanced)
- Customer type and situation summary

Click a scenario to open the session setup screen.

### Voice & Language Options

Before starting a session, configure the following:

**Customer Voice**
Choose from multiple male and female voice options. The default voice is pre-selected based on the customer's gender in the scenario.

**Customer Mood**
Adjust how the AI customer behaves emotionally:

| Mood | Description |
|------|-------------|
| Neutral | Calm, cooperative customer |
| Frustrated | Impatient, uses pressure tactics |
| Confused | Needs extra clarification |

**Language**
Select the language for the session. The AI customer will speak and respond in the chosen language.

| Language | Available |
|----------|-----------|
| English | ✅ |
| French | ✅ |
| Italian | ✅ |
| German | ✅ |
| Spanish | ✅ |
| Portuguese | ✅ |
| Hindi | ✅ |

> For duo (multi-character) scenarios, you can set a separate voice for each character.

### Running a Training Session

1. Allow microphone access when prompted by the browser
2. Click **Start Session**
3. Speak naturally — the AI customer will respond in real time
4. The **live transcript** panel shows both sides of the conversation as it happens
5. A **session timer** tracks the call duration
6. You can **interrupt the AI mid-sentence** (barge-in) — just start speaking
7. Click **End Session** when the conversation is complete

**Multi-character scenarios (Duo mode):**
Some scenarios involve two AI characters who hand off to each other during the call. For example, in the *Water Damage Claim* scenario, Tom Rivera opens the call and hands off to his wife Sarah when you ask to speak with her. Manage the conversation naturally — the handoff happens automatically based on what you say.

> Use headphones to prevent echo. The browser handles echo cancellation, but headphones improve audio quality significantly.

### Understanding Your Score

After ending a session, the AI (Claude) evaluates your performance and generates a scorecard. Scoring takes approximately 30–60 seconds.

**Scorecard sections:**

| Section | What It Evaluates |
|---------|------------------|
| Security | Identity verification, authorization checks |
| Professional Call Handling | Opening/closing, tone, acknowledgment |
| Complete/Correct Information | Product knowledge, accuracy of information given |
| Time Efficiency | Pacing, silence, response time |
| Scripting & Scope | Following scripts, staying within authority |
| Reducing Customer Effort | First-call resolution, clear next steps |

**Scoring breakdown:**

- **Overall score** — Weighted percentage (0–100%)
- **Letter grade** — A through F
- **Pass/Fail** — Pass requires ≥70% AND no critical failures
- **Critical failures** — Certain criteria (e.g., failing to verify identity) result in an automatic fail regardless of other scores
- **Empathy score** — Combines AI analysis of your transcript language with audio prosody analysis (pitch, pacing, vocal tone)

**Call analytics** are also shown:

- Call duration
- Silence percentage and longest silence gap
- Talk-over count (times you spoke over the customer)
- Average response time
- Hold count
- Confidence language usage (hedging phrases like "I think maybe" or "I'm not sure")

### Reviewing Training History

Click **Training History** (or your profile) to see all past sessions. Each entry shows:

- Scenario name
- Date and time
- Overall score and grade
- Pass/Fail result

Click any session to view the full scorecard and transcript for that session.

---

## Admin Guide

Log in with your admin credentials (e.g., `admin@example.com`). Admins have access to all trainee data plus management tools.

### Admin Dashboard

The dashboard shows an overview of all trainees:

- Trainee name / email
- Number of sessions completed
- Latest score and grade
- Last active date

Click any trainee row to drill into their session history.

### Reviewing Trainee Performance

On the trainee detail page, you will see a list of all sessions for that trainee, sorted by date. Each row shows the scenario, score, grade, and pass/fail result.

Click any session to open the **Session Detail View**.

### Session Detail View

The session detail view provides a complete breakdown of a single training session:

**Full Transcript**
The complete conversation with timestamps, showing both the trainee (agent) and AI customer turns. Talk-overs are highlighted in amber.

**Scoring Breakdown**
Per-criterion results across all rubric sections, including:
- Points awarded vs. maximum points
- Pass/Fail for each criterion
- AI reasoning for each score
- Critical failure details (if any)

**Call Analytics**

| Metric | Description |
|--------|-------------|
| Duration | Total call length |
| Silence % | Percentage of call where trainee was silent |
| Max silence gap | Longest single silence period |
| Silence violations | Gaps exceeding 20 seconds |
| Talk-overs | Times trainee spoke over the customer |
| Avg response time | Mean time between customer finishing and trainee responding |
| Hold count | Number of times trainee placed customer on hold |
| Confidence language | Count of hedging phrases used |

**Admin Comment**
Admins can add written feedback to any session. Comments are timestamped and attributed to the admin who wrote them.

### Managing Scenarios

Navigate to **Scenario Manager** to create, edit, or delete training scenarios.

**Creating a scenario manually:**
Fill in the scenario form with:
- Name and difficulty level
- Customer context (second-person persona description)
- Initial message (customer's opening line)
- Key challenges (what makes the call difficult)
- Success criteria (observable behaviors the trainee should demonstrate)
- Caller gender (determines default voice)

**Creating a scenario from a call transcript:**
Paste a real call transcript into the **Generate from Transcript** field. Claude will extract the customer persona, situation, key challenges, and success criteria automatically. Review and edit the generated scenario before saving.

**Duo (multi-character) scenarios:**
Enable duo mode to add multiple characters to a scenario. Each character has:
- Their own name, voice, and persona context
- A handoff trigger (natural language description of when to hand off)
- A target character to hand off to

One character must be marked as primary (speaks first).

> Duo mode is only available in the Web UI. It is not supported in Amazon Connect mode.

### Configuring Scoring Criteria

Navigate to **Criteria Config** to customize which rubric criteria are active for each scenario.

- Toggle individual criteria on or off per scenario
- Disabled criteria are excluded from scoring for that scenario
- Changes take effect immediately for all subsequent sessions

This allows you to focus evaluation on the specific skills relevant to each scenario — for example, disabling investment-related criteria for a basic identity verification scenario.

---

## Training Scenarios

### Sample Scenarios

Three sample scenarios are included out of the box to demonstrate the platform's capabilities:

---

**1. Sample Unauthorized Caller — Adult Child**
`Difficulty: Intermediate | Mood: Frustrated`

An adult daughter calls on behalf of her 82-year-old mother, who owns an annuity policy. The daughter is not an authorized party and uses emotional pressure, urgency, and implied threats to try to get account information.

Key skills tested:
- Maintaining compliance by refusing to release information to unauthorized callers
- Handling emotional appeals and complaint threats professionally
- Offering constructive alternatives (three-way call, power of attorney)

---

**2. Sample Underpaying Variable Life**
`Difficulty: Advanced | Mood: Frustrated`

A policyholder calls after receiving his annual statement showing his cash value declined — despite making monthly payments. The cause is two compounding problems: his premium ($150/month) is less than the cost of insurance ($185.32/month), and his subaccount investments lost 8% due to market performance.

Key skills tested:
- Explaining two separate but related issues clearly
- Discussing investment performance without providing financial advice
- Presenting concrete options and lapse risk timeline

---

**3. Sample Water Damage Claim — Duo**
`Difficulty: Intermediate | Mood: Concerned`

A married couple calls together to file a home insurance claim for a burst pipe. Tom Rivera (the policy owner) opens the call and handles identity verification. His wife Sarah (who discovered the damage) handles the detailed damage description and questions about the claims process. The trainee must manage handoffs between the two characters naturally.

Key skills tested:
- Verifying identity before engaging a non-policyholder
- Obtaining explicit permission before speaking with a third party
- Managing multi-party conversation with smooth handoffs
- Explaining deductibles, timelines, and temporary repair authorization

---

### Scenario Difficulty Levels

| Level | Description |
|-------|-------------|
| Beginner | Straightforward call type, cooperative customer, standard verification |
| Intermediate | Moderate complexity, some emotional pressure or multi-party elements |
| Advanced | Complex product knowledge required, high frustration, compound problems |

---

## Tips for Effective Training

- **Use headphones** — Reduces echo and improves transcript accuracy
- **Speak clearly and at a natural pace** — The AI responds to natural speech; no need to speak slowly
- **Don't rush through verification** — Identity verification is a critical criterion; failing it results in an automatic fail
- **Interrupt naturally** — Barge-in is supported; you don't need to wait for the AI to finish speaking
- **Review your transcript** — After each session, read through the transcript to identify where the conversation went off track
- **Try different moods** — Practice the same scenario with neutral and frustrated moods to build adaptability
- **Try different languages** — If your team handles multilingual calls, practice in the relevant language
- **Focus on critical criteria first** — Any critical failure overrides your overall score; prioritize compliance and security behaviors
