import React, { useState, useEffect, useRef, Suspense } from "react";
import "./DataTable.css";

export default function DataTable({ columns, fetchData, fallback = "Chargement..." }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const result = await fetchData(page);
        if (result.length > 0) {
          setData(prevData => [...prevData, ...result]);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [page]);

  useEffect(() => {
    if (!hasMore) return;

    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50 &&
        !loading
      ) {
        setPage(prevPage => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <Suspense fallback={<div>{fallback}</div>}>
      <div className="data-table">
        <table>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.accessor}>{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, index) => (
                <tr key={index}>
                  {columns.map((col) => (
                    <td key={col.accessor}>{row[col.accessor]}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} style={{ textAlign: "center" }}>
                  Aucune donnée disponible
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {}
        {loading && <div className="loader">Chargement...</div>}
      </div>
    </Suspense>
  );
}
