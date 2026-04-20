# Refined Project Refactoring Plan: Onion Architecture Alignment

Following a deep audit of the codebase, this refined plan addresses specific duplicates and verified import paths.

## 🎯 Objectives
1.  **De-duplicate Components**: Remove identical components and layouts.
2.  **Strict Onion Layers**: Move logic and UI to Feature/Shared layers.
3.  **Domain Cleanup**: Standardize mock data location.

---

## 🛠️ Phase 1: Cleanup & Layout Optimization
**Agent:** `frontend-specialist`

1.  **Layout Transition**:
    *   **Action**: Update `src/app/layout.tsx` imports:
        *   `@/components/Sidebar` -> `@/shared/components/layout/sidebar`
        *   `@/components/Header` -> `@/shared/components/layout/header`
    *   **Cleanup**: Delete `src/components/Sidebar.tsx` and `src/components/Header.tsx`.
2.  **UI Kit Consolidation**:
    *   **Action**: Remove `src/components/ui/Toast.tsx` (duplicate of `src/shared/components/ui/toast.tsx`).
    *   **Cleanup**: Delete empty directory `src/shared/ui`.

## 📦 Phase 2: Feature Reorganization
**Agent:** `frontend-specialist`

1.  **Finance Feature**:
    *   Move `src/components/finance/` -> `src/features/finance/components/`.
    *   Update imports in `src/app/data/finance/page.tsx`.
2.  **Dashboard Feature**:
    *   Create `src/features/dashboard/components/`.
    *   Move from `src/components/`:
        *   `AIChatAssistant.tsx`
        *   `InsightsPanel.tsx`
        *   `MetricsGrid.tsx`
    *   Update imports in `src/app/page.tsx`.
3.  **Warehouse Feature**:
    *   **Action**: Update `src/app/page.tsx` to use `WarehouseKPI` from `@/features/warehouse` (instead of `@/components/WarehouseKPI`).
    *   **Cleanup**: Delete `src/components/WarehouseKPI.tsx` (already exists in `src/features/warehouse/components`).
4.  **Chat & Team Features**:
    *   Create `src/features/chat/components/` and `src/features/team/components/`.
    *   Move `src/components/chat/` contents to `src/features/chat/components/`.
    *   Move `src/components/team/` contents to `src/features/team/components/`.
    *   Update imports in `src/app/team/page.tsx` and `src/app/projects/page.tsx`.

## 🏗️ Phase 3: Infrastructure Optimization
**Agent:** `backend-specialist`

1.  **Mock Data Relocation**:
    *   Move `src/core/mock-data/warehouse.data.ts` -> `src/features/warehouse/mock-data/`.
2.  **Path Refactoring**:
    *   Update imports in `src/features/warehouse/services/warehouse.service.ts` and `src/features/warehouse/index.ts`.

## ✅ Phase 4: Final Validation
**Agent:** `test-engineer`

1.  **Integrity Check**:
    *   Run `python .agent/skills/lint-and-validate/scripts/lint_runner.py .`.
2.  **Visual Verification**:
    *   Confirm Dashboard, Finance, Team, and Projects pages render correctly with state preserved.

---

## 🚦 Approval
This plan reflects the exact state of the repo as of now. Ready to proceed? (Y/N)
