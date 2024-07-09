export default function TableHeader({ tableHeaderText }) {
  return (
    <>
      {tableHeaderText.map((item) => (
        <th scope="col" className="px-6 py-3" key={item.id}>
          {item.name}
        </th>
      ))}
    </>
  );
}
