## 1. Structured strikes data model

- [x] 1.1 Add a structured strike catalog with the official Golpes list
- [x] 1.2 Extend the technique model to support repeatable acquisitions with permanent strike selections
- [x] 1.3 Preserve repeated Golpes acquisitions without overwriting prior strike choices

## 2. Editor and acquisition UX

- [x] 2.1 Update guided technique selection so Golpes prompts for exactly two strike selections per acquisition
- [x] 2.2 Show known strikes clearly in the editor and keep them tied to their Golpes acquisition
- [x] 2.3 Prevent invalid or duplicate strike selection within the same acquisition block

## 3. Gameplay strike UX

- [x] 3.1 Show learned strikes as individual gameplay actions in play mode
- [x] 3.2 Display strike cost and resolution notes in the gameplay UI
- [x] 3.3 Keep strike actions distinct from non-strike techniques

## 4. Combo flow

- [x] 4.1 Add a transient combo flow in play mode
- [x] 4.2 Restrict combo follow-ups to learned strikes only
- [x] 4.3 Prevent repeating the same strike within one combo sequence
- [x] 4.4 Enforce Habilidade-based combo follow-up limit

## 5. Validation and release

- [x] 5.1 Run lint and build
- [x] 5.2 Commit implementation
- [x] 5.3 Push to origin/master
- [x] 5.4 Deploy to gh-pages
