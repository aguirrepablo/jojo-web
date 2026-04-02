```markdown
# Design System Specification: The Kinetic Engineer

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Kinetic Engineer."** 

We are moving away from the "SaaS-standard" look of boxes and borders. Instead, we treat the UI as a high-precision instrument—an interface that feels engineered, not just designed. The aesthetic centers on the tension between the aggressive energy of vibrant red and the sophisticated transparency of glass. 

To achieve a high-end editorial feel, we utilize **intentional asymmetry**. Do not center-align everything; allow for wide margins and "bleeding" elements that suggest a larger, continuous workspace. We break the grid with overlapping "glass" containers that create a sense of three-dimensional space, moving beyond the flat web to an atmospheric, AI-driven environment.

---

### 2. Colors & Surface Philosophy
The palette is built for a "Dark Mode First" experience. It relies on the deep `surface` (#131313) to provide a canvas for the vibrant `primary` (#F24444) and the "electric" `tertiary` (#00DAF3).

#### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or layout containment. 
*   **How to define boundaries:** Use background shifts. A `surface-container-low` section sitting on a `surface` background creates a natural, sophisticated edge.
*   **The Signature Texture:** For primary CTAs or hero backgrounds, use a linear gradient from `primary` (#FFB3AD) to `primary-container` (#FF5451) at a 135-degree angle. This adds "soul" and depth that flat hex codes cannot achieve.

#### Surface Hierarchy & Nesting
Treat the UI as stacked sheets of frosted obsidian. 
*   **Layer 0 (Base):** `surface` (#131313)
*   **Layer 1 (Cards/Sections):** `surface-container-low` (#1C1B1B)
*   **Layer 2 (Inner Elements):** `surface-container-high` (#2A2A2A)

#### The "Glass & Gradient" Rule
To evoke "AI vibes," floating elements (modals, dropdowns, navigation) must use **Glassmorphism**:
*   **Background:** `surface-variant` (#353534) at 60% opacity.
*   **Effect:** `backdrop-filter: blur(20px)`.
*   **Edge:** A 1px "Ghost Border" using `outline-variant` (#5B403E) at 20% opacity to catch the "light."

---

### 3. Typography
We pair the eccentric, wide-built **Syne** (referenced as `spaceGrotesk` in tokens for its geometric similarity) with the hyper-legible **Inter**.

*   **Display & Headlines (Syne):** These are your "Architectural" elements. Use `display-lg` (3.5rem) with tight letter-spacing (-0.02em) to create an authoritative, futuristic impact.
*   **Body & Labels (Inter):** These are your "Functional" elements. Inter provides the technical clarity required for an AI-centric partner. 
*   **The Contrast Principle:** Always pair a large Syne headline with a significantly smaller Inter sub-head (e.g., `headline-lg` followed by `body-md`). This "high-low" contrast is the hallmark of editorial design.

---

### 4. Elevation & Depth
In this system, depth is a function of **Tonal Layering**, not shadows.

*   **The Layering Principle:** Stacking tiers (e.g., a `surface-container-lowest` card placed on a `surface-container-low` section) creates a "recessed" or "lifted" look without visual clutter.
*   **Ambient Shadows:** Use shadows only for the highest-level floating elements (e.g., a global command menu). Use the `on-surface` color (#E5E2E1) at 4% opacity with a 64px blur. This mimics a soft glow rather than a heavy drop shadow.
*   **The Ghost Border:** If a divider is mandatory for accessibility, use a "Ghost Border": `outline-variant` at 15% opacity. Never use 100% opaque lines.

---

### 5. Components

#### Buttons
*   **Primary:** Background: `primary` gradient; Text: `on-primary` (#68000A); Shape: `md` (0.375rem).
*   **Secondary (The Glass Button):** Background: `surface-variant` @ 20% opacity; Backdrop-blur: 10px; Border: 1px Ghost Border.
*   **Tertiary (AI Action):** Background: none; Text: `tertiary` (#00DAF3); Icon: Leading minimalist icon.

#### Cards & Lists
*   **The Rule of Space:** Forbid the use of divider lines between list items. Use the **Spacing Scale** `spacing-4` (1.4rem) to create clear vertical separation.
*   **Nesting:** Apply `roundedness-lg` (0.5rem) to cards. Content inside the card should use `roundedness-md`.

#### Input Fields
*   **State:** Default state is `surface-container-highest` with no border. 
*   **Focus State:** A 1px glowing border using `tertiary` (#00DAF3) with a subtle outer glow (4px blur).
*   **Feedback:** Error states use `error` (#FFB4AB) text, never a solid red box.

#### Additional AI Components
*   **Status Beams:** Use a 2px tall horizontal line using the `tertiary` (#00DAF3) color at the top of a container to indicate an "Active AI Processing" state.
*   **The "Processing" Glass:** A full-bleed semi-transparent overlay using `surface-dim` with a slow pulse animation.

---

### 6. Do’s and Don’ts

#### Do
*   **Do** use extreme white space. If a section feels "full," increase the spacing to the next token (e.g., move from `spacing-12` to `spacing-16`).
*   **Do** lean into the "Electric Blue" (`tertiary`) for data visualizations and micro-interactions.
*   **Do** use asymmetrical layouts where the headline is pinned to the left and the body text is offset to the right grid columns.

#### Don’t
*   **Don’t** use pure black (#000000) or pure white (#FFFFFF). Always use the `surface` and `on-surface` tokens to maintain the premium tonal range.
*   **Don’t** use standard "Drop Shadows." They break the engineered, glass-like illusion.
*   **Don’t** use heavy rounded corners. Keep it "engineered" with `md` (0.375rem) or `lg` (0.5rem); avoid "bubbly" aesthetics.

---

### 7. Spacing & Rhythm
Consistency is maintained through a strictly enforced spacing scale. 
*   **Section Padding:** Always use `spacing-20` (7rem) or `spacing-24` (8.5rem). 
*   **Internal Component Padding:** Use `spacing-4` (1.4rem) for standard breathing room.
*   **Micro-spacing:** Use `spacing-1.5` (0.5rem) to group labels with their corresponding inputs.

By adhering to these rules, you ensure that every screen feels like a bespoke piece of technology—high-contrast, atmospheric, and intentionally crafted.```