import React, { Suspense } from "react";
// import { RouteObject } from "react-router-dom";

const PhcHome = React.lazy(() => import("./components/PhcHome"));
const PatientList = React.lazy(() => import("./components/PatientList"));
const PatientForm = React.lazy(() => import("./components/PatientForm"));
const PatientProfile = React.lazy(() => import("./components/PatientProfile"));
const CreateDispense = React.lazy(() => import("./components/CreateDispense"));
const InventoryList = React.lazy(() => import("./components/InventoryList"));
const MasterList = React.lazy(() => import("./components/MasterList"));
const DispenseHistory = React.lazy(() => import("./components/DispenseHistory"));
const Settings = React.lazy(() => import("./components/Settings"));

function lazyWrap(Comp: React.LazyExoticComponent<any>) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Comp />
    </Suspense>
  );
}

// Note: This exports an array of route objects suitable for use with react-router v6 createRoutesFromElements or similar.
export const phcRoutes = [
  {
    path: "/phc",
    element: lazyWrap(PhcHome as any) as any,
  },
  {
    path: "/phc/patients",
    element: lazyWrap(PatientList as any) as any,
  },
  {
    path: "/phc/patients/new",
    element: lazyWrap(PatientForm as any) as any,
  },
  {
    path: "/phc/patients/:phoneOrId",
    element: lazyWrap(PatientProfile as any) as any,
  },
  {
    path: "/phc/dispense/create",
    element: lazyWrap(CreateDispense as any) as any,
  },
  {
    path: "/phc/inventory",
    element: lazyWrap(InventoryList as any) as any,
  },
  {
    path: "/phc/masterlist",
    element: lazyWrap(MasterList as any) as any,
  },
  {
    path: "/phc/dispense/history",
    element: lazyWrap(DispenseHistory as any) as any,
  },
  {
    path: "/phc/settings",
    element: lazyWrap(Settings as any) as any,
  },
];

export default phcRoutes;
