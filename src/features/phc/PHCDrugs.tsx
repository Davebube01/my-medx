import { useMemo } from "react";
import { PageLayout } from "../../components/shared/PageLayout";
import { Datagrid } from "../../components/shared/Datagrid";
import { Search, PlusCircle } from "lucide-react";
import { MOCK_DRUGS } from "../../data/mockData";
import { useInventory } from "../../hooks/useInventory";
import type { ColDef } from "ag-grid-community";

export const PHCDrugs = () => {
  const { addToInventory } = useInventory();

  const allDrugs = Object.values(MOCK_DRUGS);

  const colDefs = useMemo<ColDef[]>(
    () => [
      { field: "name", headerName: "Drug Name", filter: true, flex: 2 },
      {
        headerName: "Strength / Form",
        valueGetter: (p) => `${p.data.strength} • ${p.data.form}`,
        flex: 1,
      },
      {
        field: "category",
        headerName: "Category",
        cellRenderer: (p: any) => (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
            {p.value}
          </span>
        ),
        flex: 1,
      },
      {
        headerName: "Action",
        cellRenderer: (p: any) => (
          <button
            onClick={() => {
              // Quick add with defaults just to demonstrate
              addToInventory(p.data.id, 0);
              alert(
                `Added ${p.data.name} to PHC inventory! Go to Inventory to set details.`
              );
            }}
            className="flex items-center justify-end gap-1 text-green-600 hover:text-green-800 font-medium ml-auto"
          >
            <PlusCircle className="w-4 h-4" />
            Add to Inventory
          </button>
        ),
        width: 180,
        suppressMenu: true,
      },
    ],
    [addToInventory]
  );

  return (
    <PageLayout title="Drug Master List (PHC)">
      <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-6 text-green-800 text-sm">
        Browse the national drug master list to add authorized medicines to the
        PHC inventory.
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Search */}
        <div className="p-4 border-b border-gray-100">
          <div className="relative w-full max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search Drug Master List..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Datagrid */}
        <Datagrid rowData={allDrugs} colDefs={colDefs} />
      </div>
    </PageLayout>
  );
};
