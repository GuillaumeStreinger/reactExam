import DataTable from "./Component/DataTable/DataTable";

const columns = [
  { header: "Nom", accessor: "name" },
  { header: "Email", accessor: "email" },
];

const fetchData = async (page) => {
  const response = await fetch(`http://localhost:3000/user/${page}`, { method: "POST" });
  const result = await response.json();

  if (!Array.isArray(result)) {
    return result.data || [];
  }

  return result.map((item, index) => ({
    ...item,
    id: item.id || `${page}-${index}`,
  }));
};




function App() {
  return (
    <div>
      <h1>Liste des utilisateurs</h1>
      <DataTable columns={columns} fetchData={fetchData} fallback="Chargement des utilisateurs..." />
    </div>
  );
}

export default App;
