import { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule, type ColDef } from "ag-grid-community";

// Register all community modules
ModuleRegistry.registerModules([AllCommunityModule]);

interface DatagridProps<T> {
  rowData: T[];
  colDefs: ColDef<T>[];
  height?: string | number;
  pagination?: boolean;
  paginationPageSize?: number;
  onRowClick?: (data: T) => void;
  loading?: boolean;
}

export const Datagrid = <T,>({
  rowData,
  colDefs,
  height = 500,
  pagination = true,
  paginationPageSize = 10,
  onRowClick,
  loading = false,
}: DatagridProps<T>) => {
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      sortable: true,
      filter: true,
      resizable: true,
      floatingFilter: true,
      flex: 1,
      minWidth: 100,
    };
  }, []);

  return (
    <div className="ag-theme-quartz" style={{ height: height, width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        pagination={pagination}
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={[10, 25, 50]}
        onRowClicked={(e) => onRowClick && onRowClick(e.data)}
        loading={loading}
        rowSelection={{
          mode: "singleRow",
          checkboxes: false,
          enableClickSelection: true,
        }}
      />
    </div>
  );
};
