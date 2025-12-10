PHC Module
=========

Integration notes for the PHC (Primary Health Centre) React module.

How to register routes
- Import `phcRoutes` from `src/features/phc/phcRoutes.tsx` and add to your router configuration (react-router v6). Example:

  import { phcRoutes } from 'src/features/phc/phcRoutes'
  // merge into your routes array

Replacing mocks with real endpoints
- The mock service is at `src/features/phc/services/phcApi.ts`. Each function contains a TODO comment and examples of the HTTP endpoint and parameters.
- Replace implementations with fetch/axios calls and keep the exported function signatures.

Authentication & roles
- Wrap PHC routes with your existing `RequireAuth` or similar and check user roles: `phc_staff` or `phc_admin`.

MyMedX linking
- A sample hook `useSyncMyMedX` shows how to poll for linking status; replace with websockets/webhooks as needed.

Notes
- All lists use server-side pagination in the mocks. Debounced search inputs are included (300ms).
- Dates are shown in the local timezone using `toLocaleString`/`toLocaleDateString`.
