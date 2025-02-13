import DataTable from "./Component/DataTable/DataTable";

const columns = [
  { header: "Nom", accessor: "name" },
  { header: "Email", accessor: "email" },
];

const fetchData = async (page) => {
  const response = await fetch(`http://localhost:3000/user/${page}`, { method: "POST" });
  const result = await response.json();

  return Array.isArray(result) ? result : result.data || [];
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
