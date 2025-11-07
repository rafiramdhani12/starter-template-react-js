const Table = ({
  title,
  columns = [],
  bg_color = "blue",
  data = [],
  actions = [],
  emptyMessage = "Tidak ada data.",
}) => {
  const buttonStyles = {
    Edit: "bg-blue-500 hover:bg-blue-600 text-white",
    Hapus: "bg-red-500 hover:bg-red-600 text-white",
    Detail: "bg-green-500 hover:bg-green-600 text-white",
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div
        className={`text-white px-6 py-3 text-lg font-semibold ${
          bg_color === "red"
            ? "bg-red-600"
            : bg_color === "green"
            ? "bg-green-600"
            : "bg-blue-600"
        }`}
      >
        {title}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left border-t">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="py-3 px-4 font-semibold">
                  {col.header}
                </th>
              ))}
              {actions.length > 0 && (
                <th className="py-3 px-4 font-semibold">Actions</th>
              )}
            </tr>
          </thead>

          <tbody>
            {data && data.length > 0 ? (
              data.map((item, rowIdx) => (
                <tr
                  key={item.id || rowIdx}
                  className="border-t hover:bg-gray-50"
                >
                  {columns.map((col, colIdx) => (
                    <td
                      key={colIdx}
                      className={`py-3 px-4 ${col.className || ""}`}
                    >
                      {col.render ? col.render(item) : item[col.accessor]}
                    </td>
                  ))}

                  {actions.length > 0 && (
                    <td className="py-3 px-4">
                      {actions.map((action, idx) => (
                        <button
                          key={idx}
                          onClick={() => action.onClick(item)}
                          className={`px-3 py-1 rounded mr-2 ${
                            buttonStyles[action.label] ||
                            "bg-gray-500 text-white"
                          }`}
                        >
                          {action.label}
                        </button>
                      ))}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
                  className="text-center py-6 text-gray-500 italic"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
