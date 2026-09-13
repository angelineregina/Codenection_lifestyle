# ReBalance by FIT2099

> **A Student Workload Sustainability App**

**Team:** See Eng Chin, Hui Qing Wong, Angeline Regina Lee  
**Problem Statement:** Stress & Workload Manager  

**Video Presentation:** [Watch our presentation](YOUR_YOUTUBE_LINK)  
**Presentation Slides:** [View our presentation](https://canva.link/iob0i8bqiqfgoaj)

---

## 1. Project Overview

### The Problem

University students often have to manage multiple academic deadlines, classes, revision sessions, extracurricular activities, social commitments, errands, and personal responsibilities at the same time.

The problem is not only having too many tasks, but also difficulty understanding whether their current workload is realistically manageable and knowing what to change when it is not.

Students may underestimate how long tasks will take, experience several deadlines within a short period, sacrifice recovery or sleep to create more working time, or continue following an unrealistic schedule even when their available capacity has changed.

This can create a cycle where students only realise they are overloaded after their schedule has already become difficult to manage.

Existing planning tools can show what needs to be completed and how much time has been scheduled, but time alone does not necessarily represent a student's ability to manage their workload.

Mental demand, physical condition, recovery, social commitments, errands, deadlines, and available time can all influence how manageable a particular day or week feels.

### Stakeholders

The primary stakeholders are **university students**, particularly those managing multiple academic and personal commitments simultaneously.

They need a practical way to:

- Understand their workload
- Identify upcoming periods of overload
- Understand why their workload may be difficult to sustain
- Determine which commitments can realistically be moved or prioritised
- Protect sufficient recovery time

---

### Existing Solution — Sunsama

One existing solution is **Sunsama**, a daily planning application that helps users organise tasks, estimate task durations, timebox work on a calendar, and identify when their planned workload exceeds a daily threshold.

Sunsama calculates its workload using the planned time assigned to tasks and allows users to defer work when they have overcommitted.

However, Sunsama's workload threshold is primarily time-based. Its daily workload capacity is configured in hours, and only tasks categorised in work contexts contribute to that threshold.

This is useful for answering:

> **"Have I scheduled too many hours of work?"**

Our identified problem is broader:

> **"Given everything affecting me today, is this workload realistically manageable, why am I at risk of overload, and what can I change?"**

---

### Our Solution

**ReBalance** evaluates workload across five dimensions rather than tracking scheduled hours alone:

- **Mental**
- **Time**
- **Physical**
- **Social**
- **Errands**

ReBalance focuses on **intervention rather than simply detection**.

When overload is identified, the system:

1. Explains the specific contributing factors
2. Suggests ways to make the day more manageable
3. Lets students test schedule changes before committing to them
4. Protects important recovery time
5. Shows the predicted effect before and after an intervention

A companion **Vibe Engine** adds a personal baseline check-in and lightweight session cues during focus sessions.

### Core Flow

**Assess → Explain → Rebalance → Simulate → Recover**

---

## Feature Set

### 1. Workload Assessment

Students add their commitments and tasks with an estimated duration and demand level.

The system combines this with deadline load and available hours to estimate workload across five dimensions:

- Mental
- Time
- Physical
- Social
- Errands

### 2. Overload Risk Detection

The system identifies and explains **why** the student may be at risk of overload.

Examples include:

- Deadline compression
- Insufficient recovery
- High mental workload
- Multiple overlapping commitments
- Insufficient available time

Instead of providing an unexplained burnout score, ReBalance shows the factors contributing to the workload result.

### 3. Save My Day

**Save My Day** provides a low-effort suggestion that can make an overloaded day more sustainable.

Suggested changes may include:

- Moving a lower-priority task
- Shortening a flexible commitment
- Adding a recovery break
- Protecting important commitments

The student reviews the proposed changes before applying them rather than having their schedule changed automatically.

### 4. What-if Simulator

The **What-if Simulator** allows students to select a specific task and experiment with:

- **Move**
- **Shorten**
- **Remove**

The system then displays a before-and-after projection of:

- Workload
- Planned demand
- Recovery time
- Workload level
- Updated daily schedule

For example:

> Moving a lower-priority task may reduce workload from **108% → 84%** before the student commits to the change.

### 5. Recovery + Before/After

Every simulated or applied change shows how the intervention affects the student's day.

The student can compare:

**Before → After**

across:

- Workload
- Planned demand
- Recovery time
- Overall workload level

This makes the benefit of an intervention visible rather than assumed.

### 6. Vibe Engine

The **Vibe Engine** is a supporting feature and does not independently determine overload or burnout.

It contains two connected modes:

#### Quick Vibe Check

A short personal check-in before a focus session.

Students provide:

- Current mood
- Current energy level

This creates a **personal reference baseline** that can be used by Focus Guard during the session.

#### Focus Guard

During a study session, Focus Guard displays supporting session cues alongside the student's earlier baseline.

It can consider signals such as:

- Session length
- Break status
- Changes from the starting reference

If the session runs for a long period without recovery, the system can recommend a short break or direct the student to **Save My Day**.

> **Important:** The Vibe Engine is a supporting signal only. It does not diagnose fatigue or burnout.

---

## 2. Ideation & Process

### 2.1 Ideas We Considered

| Idea | Decision | Reason |
|---|---|---|
| **Workload Assessment / Multidimensional Dashboard** | ✅ Kept | Directly addresses the five workload dimensions: mental, time, physical, social, and errands. |
| **Overload Risk Detection** | ✅ Kept | Helps users understand when and why their workload may become unmanageable. |
| **Save My Day / Smart Rebalancing** | ✅ Kept | Combines workload intervention concepts into an actionable way to make an overloaded day more manageable. |
| **What-if Simulator** | ✅ Kept | Allows users to test schedule changes before accepting them. |
| **Recovery + Before/After** | ✅ Kept | Integrates recovery into workload management and shows the effect of an intervention. |
| **Vibe Engine** | ✅ Kept as Secondary | Combines Quick Vibe Check and Focus Guard as supporting signals. |
| **Friend Battery Sharing / Social Support** | ✅ Kept as Secondary | Allows students to share encouragement and support without being required for the core workload flow. |
| **Personal Average Task Prediction** | ✅ Kept as Secondary | Could improve future estimates using individual task history but requires sufficient user data. |
| **Full Calendar-Based Dashboard** | ❌ Dropped / Modified | A calendar mainly represents time and does not fully capture the five workload dimensions. |
| **Public Burnout / Recovery Leaderboard** | ❌ Dropped | Competition could create additional pressure and does not directly help students rebalance workload. |
| **Fully Automatic Schedule Changes** | ❌ Dropped | Automatic changes could reduce user control, so students review recommendations before accepting them. |
| **Basic To-Do List** | ❌ Dropped | Existing productivity applications already provide this and it does not solve the identified problem by itself. |
| **Workload Score Based Only on Task Hours** | ❌ Dropped | Time alone does not represent a student's overall workload. |
| **Recovery Gamification / Streaks / Leaderboard** | ❌ Dropped | Gamification does not directly contribute to the core workload-management goal and may introduce unnecessary pressure. |

---

### 2.2 Ideation Boards

#### Mindmap

[Rebalance Mindmap](images/mindmap.png)


---

### 2.3 Mentor Consultation

| Date | Mentor | Feedback Received | What Was Changed |
|---|---|---|---|
| **10 Sept 2026** | Daniel Koh Yu Hang | Leaderboards may create unnecessary competition and do not directly help students manage workload. | Removed leaderboard and gamification features. |
| **10 Sept 2026** | Daniel Koh Yu Hang | Task-time prediction should use individual user data rather than data from all users. | Deferred task-time prediction to future work requiring individual usage history. |
| **10 Sept 2026** | Daniel Koh Yu Hang | Vibe Check needs a clear purpose and should not determine burnout from facial expressions alone. | Reframed Vibe Check as a personal reference baseline used by Focus Guard rather than a burnout detector. |
| **10 Sept 2026** | Daniel Koh Yu Hang | Prioritise features that directly support workload rebalancing. | Focused the app around Workload Assessment → Risk Detection → Save My Day / What-if → Recovery. |
| **10 Sept 2026** | Daniel Koh Yu Hang | Nine major features were too large a scope. | Reduced the scope to six core features. |
| **11 Sept 2026** | Daniel Koh Yu Hang | Focus Guard should support workload management rather than claim to detect fatigue or burnout. | Reframed Focus Guard as a supporting signal during study sessions. |
| **11 Sept 2026** | Daniel Koh Yu Hang | The risk engine should explain why workload is unsustainable rather than relying on unexplained AI. | Changed it to an explainable workload sustainability risk engine. |

---

## 3. Design & Prototype

**UI Prototype:** [View our prototype](https://canva.link/p0w9yobbavnf3r8)

## 4. What Makes It Different

ReBalance differs from traditional productivity apps by focusing on **whether a student's workload is realistically manageable**, rather than only organising tasks and available time.

The solution does not stop at identifying overload. It explains its causes and helps students take action.

| Novel Feature | What Makes It Different |
|---|---|
| **5-Dimensional Workload Assessment** | Measures workload across mental, time, physical, social, and errands rather than relying only on scheduled task hours. |
| **Explainable Overload Risk Detection** | Shows why workload may be unsustainable, such as deadline compression, high mental demand, or insufficient recovery. |
| **Save My Day** | Goes beyond detecting overload by providing actionable changes that can make the student's day more manageable. |
| **What-if Simulator** | Lets students experiment with moving, shortening, or removing a task and immediately preview the effect before committing. |
| **Recovery + Before/After** | Integrates recovery into workload management and shows how an intervention changes workload, demand, and recovery time. |
| **Vibe Engine** | Combines Quick Vibe Check and Focus Guard as supporting signals without claiming to diagnose burnout. |

### The Main Difference

Most productivity tools help users organise work.

ReBalance focuses on the complete intervention flow:

> **Assess workload → Explain overload → Rebalance → Simulate changes → Recover**

Rather than simply telling students that they are busy or stressed, **ReBalance helps them understand what is making their workload difficult and what they can realistically change.**

---

## 5. Technical Architecture & Feasibility

### Tech Stack

| Component | Technology | Why / Constraints |
|---|---|---|
| **Frontend** | React + Vite | Fast to develop and suitable for an interactive dashboard. Multiple UI states must be managed for simulations and rebalancing. |
| **Styling** | Tailwind CSS | Allows rapid interface development and modification during the prototype phase. |
| **Backend & Database** | Supabase | Provides database, authentication, and backend services in one platform. Free-tier limits may restrict production-scale usage. |
| **Database** | PostgreSQL via Supabase | Stores users, tasks, workload data, schedules, and recovery information. |
| **Risk Engine** | TypeScript rule-based calculations | Keeps workload calculations transparent and explainable instead of relying on black-box AI. |
| **Vibe Engine** | face-api.js / Browser Camera | Allows lightweight local session cues. It provides supporting signals only and does not diagnose fatigue or burnout. |
| **Hosting** | Vercel | Provides simple deployment suitable for the prototype. |
| **Version Control** | GitHub | Allows team collaboration, branch management, and change tracking. |

## Build Plan & Scope

During the building phase, the team focuses on implementing **one complete end-to-end workload-management flow** rather than attempting to fully implement every proposed feature.

### Core Features

#### Workload Assessment

Allow students to enter tasks and commitments and assess workload across the five dimensions.

#### Overload Risk Detection

Identify potentially unsustainable workload and clearly explain contributing factors such as:

- Insufficient available time
- Deadline compression
- High cognitive demand
- Insufficient recovery

#### Save My Day

Offer actionable suggestions that can make an overloaded day more manageable while protecting important commitments.

#### What-if Simulator

Allow students to select a task and test:

- Moving it
- Shortening it
- Removing it

The student can see the predicted effect on workload before accepting the change.

#### Recovery + Before/After

Recommend appropriate recovery actions and show how an intervention changes:

- Workload
- Planned demand
- Recovery time
- Workload level

### Supporting Innovation

The **Vibe Engine**, consisting of **Quick Vibe Check + Focus Guard**, is implemented as a supporting feature.

It provides a personal baseline and session-level cues during workload management but **does not independently determine overload or burnout**.

### Secondary Feature

**Friend Sharing / Social Support** is implemented as a secondary feature supporting the core flow but is not required for it.

### Future Work

**Personal Average Task Prediction** was not developed for the current prototype.

A future implementation could learn from an individual student's own task history to improve estimated completion times.

---

