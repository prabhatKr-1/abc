const UserItem = ({ user, role, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.contact_number}</td>
      {/* <td>{user.password}</td> */}
      <td>{user.role}</td>
      {role !== "reader" && (
        <td>
          <button onClick={() => onEdit(user)}>Edit</button>
          <button onClick={() => onDelete(user.id)}>Delete</button>
        </td>
      )}
    </tr>
  );
};

export default UserItem;
