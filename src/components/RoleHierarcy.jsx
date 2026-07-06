import React, { useMemo, useState } from "react";
import {
  Search,
  Plus,
  ChevronRight,
  ChevronDown,
  UserCircle,
  Pencil,
  Trash2,
  X,
  Users,
} from "lucide-react";

const initialRoles = [
  {
    id: 1,
    name: "CEO",
    parentId: null,
    description: "Top level organizational owner",
    users: [{ id: 1, name: "Rinku Singh", email: "rinku@email.com" }],
    createdAt: "2026-04-01",
    updatedAt: "2026-04-20",
  },
  {
    id: 2,
    name: "Sales Director",
    parentId: 1,
    description: "Leads sales department",
    users: [{ id: 2, name: "Akshay Mehta", email: "akshay@email.com" }],
    createdAt: "2026-04-02",
    updatedAt: "2026-04-20",
  },
  {
    id: 3,
    name: "Sales Manager",
    parentId: 2,
    description: "Handles regional sales team",
    users: [{ id: 3, name: "Rohit Sharma", email: "rohit@email.com" }],
    createdAt: "2026-04-03",
    updatedAt: "2026-04-20",
  },
  {
    id: 4,
    name: "Senior Executive",
    parentId: 3,
    description: "Senior sales executive",
    users: [],
    createdAt: "2026-04-04",
    updatedAt: "2026-04-20",
  },
  {
    id: 5,
    name: "Junior Executive",
    parentId: 3,
    description: "Junior sales executive",
    users: [],
    createdAt: "2026-04-05",
    updatedAt: "2026-04-20",
  },
  {
    id: 6,
    name: "Marketing Director",
    parentId: 1,
    description: "Leads marketing division",
    users: [{ id: 4, name: "Priya Kapoor", email: "priya@email.com" }],
    createdAt: "2026-04-06",
    updatedAt: "2026-04-20",
  },
];

const availableUsers = [
  { id: 10, name: "Rinku Singh", email: "rinku@email.com" },
  { id: 11, name: "Akshay Mehta", email: "akshay@email.com" },
  { id: 12, name: "Rohit Sharma", email: "rohit@email.com" },
  { id: 13, name: "Priya Kapoor", email: "priya@email.com" },
  { id: 14, name: "Aman Verma", email: "aman@email.com" },
];

export default function RoleHierarchy() {
  const [roles, setRoles] = useState(initialRoles);
  const [selectedRole, setSelectedRole] = useState(null);
  const [expandedNodes, setExpandedNodes] = useState([1, 2, 3]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAssignDrawer, setShowAssignDrawer] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [search, setSearch] = useState("");

  const [positionType, setPositionType] = useState("child");
  const [referenceRole, setReferenceRole] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const toggleExpand = (id) => {
    setExpandedNodes((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const getChildren = (parentId) =>
    roles.filter((role) => role.parentId === parentId);

  const getRoleById = (id) => roles.find((r) => r.id === id);

  const filteredRoles = useMemo(() => {
    if (!search) return roles;
    return roles.filter((r) =>
      r.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, roles]);

  const createRole = () => {
    if (!form.name || !referenceRole) return;

    const newId = Date.now();
    let parentId = null;

    if (positionType === "child") {
      parentId = referenceRole.id;
    }

    if (positionType === "sibling") {
      parentId = referenceRole.parentId;
    }

    if (positionType === "parent") {
      parentId = referenceRole.parentId;
    }

    const newRole = {
      id: newId,
      name: form.name,
      description: form.description,
      parentId,
      users: [],
      createdAt: new Date().toLocaleDateString(),
      updatedAt: new Date().toLocaleDateString(),
    };

    let updated = [...roles, newRole];

    if (positionType === "parent") {
      updated = updated.map((role) =>
        role.id === referenceRole.id ? { ...role, parentId: newId } : role
      );
    }

    setRoles(updated);
    setForm({ name: "", description: "" });
    setReferenceRole(null);
    setShowCreateModal(false);
  };

  const updateRole = () => {
    if (!selectedRole) return;

    setRoles((prev) =>
      prev.map((role) =>
        role.id === selectedRole.id
          ? {
              ...role,
              name: form.name || role.name,
              description: form.description || role.description,
              updatedAt: new Date().toLocaleDateString(),
            }
          : role
      )
    );

    setShowEditModal(false);
  };

  const deleteRole = () => {
    if (!selectedRole) return;

    setRoles((prev) =>
      prev.filter(
        (role) =>
          role.id !== selectedRole.id && role.parentId !== selectedRole.id
      )
    );

    setSelectedRole(null);
    setShowDeleteConfirm(false);
  };

  const assignUsers = (user) => {
    setRoles((prev) =>
      prev.map((role) =>
        role.id === selectedRole.id
          ? { ...role, users: [...role.users, user] }
          : role
      )
    );
  };

  const removeUser = (userId) => {
    setRoles((prev) =>
      prev.map((role) =>
        role.id === selectedRole.id
          ? {
              ...role,
              users: role.users.filter((u) => u.id !== userId),
            }
          : role
      )
    );
  };

  const renderTree = (parentId = null, level = 0) => {
    return filteredRoles
      .filter((role) => role.parentId === parentId)
      .map((role) => {
        const children = getChildren(role.id);
        const expanded = expandedNodes.includes(role.id);

        return (
          <div key={role.id}>
            <div
              onClick={() => setSelectedRole(role)}
              className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer border mb-1 ${
                selectedRole?.id === role.id
                  ? "bg-blue-50 border-blue-200"
                  : "border-transparent hover:bg-gray-50"
              }`}
              style={{ marginLeft: `${level * 18}px` }}
            >
              <div className="flex items-center gap-2">
                {children.length > 0 ? (
                  <button onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(role.id);
                  }}>
                    {expanded ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </button>
                ) : (
                  <div className="w-4" />
                )}

                <UserCircle size={18} className="text-blue-600" />
                <span className="font-semibold">{role.name}</span>
              </div>

              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                {role.users.length}
              </span>
            </div>

            {expanded && children.length > 0 && renderTree(role.id, level + 1)}
          </div>
        );
      });
  };

  return (
    <div className="ml-[60px] pt-16 p-6 bg-[#F1F5F9] min-h-screen">
      {/* Header */}
      <div className="bg-white border rounded-lg shadow-sm px-5 py-4 flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-black">Role Hierarchy</h1>
          <p className="text-sm text-gray-500">
            Manage organizational access & reporting structure
          </p>
        </div>

        <div className="flex gap-3 items-center">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-3 text-gray-400" />
            <input
              placeholder="Search Roles"
              className="pl-9 pr-3 py-2 border rounded-md"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Plus size={16} />
            Create New Role
          </button>
        </div>
      </div>

      <p className="text-sm text-blue-700 mb-4">
        Managers automatically inherit visibility of subordinate records.
      </p>

      {/* Main */}
      <div className="grid md:grid-cols-[38%_62%] gap-4">
        {/* Tree */}
        <div className="bg-white border rounded-lg shadow-sm p-4">
          <h2 className="font-bold mb-4">Organization Roles</h2>
          {renderTree()}
        </div>

        {/* Details */}
        <div className="space-y-4">
          {!selectedRole ? (
            <div className="bg-white border rounded-lg shadow-sm p-10 text-center">
              <Users size={50} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">Select a role to view details</p>
            </div>
          ) : (
            <>
              <div className="bg-white border rounded-lg shadow-sm p-4">
                <div className="flex justify-between mb-4">
                  <h2 className="font-bold text-lg">{selectedRole.name}</h2>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setForm({
                          name: selectedRole.name,
                          description: selectedRole.description,
                        });
                        setShowEditModal(true);
                      }}
                      className="border px-3 py-1 rounded flex gap-1"
                    >
                      <Pencil size={14} /> Edit
                    </button>

                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="border border-red-300 text-red-600 px-3 py-1 rounded flex gap-1"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span>Parent Role</span>
                    <span>{getRoleById(selectedRole.parentId)?.name || "-"}</span>
                  </div>

                  <div className="flex justify-between border-b pb-2">
                    <span>Description</span>
                    <span>{selectedRole.description}</span>
                  </div>

                  <div className="flex justify-between border-b pb-2">
                    <span>Created Date</span>
                    <span>{selectedRole.createdAt}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Last Updated</span>
                    <span>{selectedRole.updatedAt}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border rounded-lg shadow-sm p-4">
                <div className="flex justify-between mb-4">
                  <h2 className="font-bold">Assigned Users</h2>
                  <button
                    onClick={() => setShowAssignDrawer(true)}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Assign Users
                  </button>
                </div>

                {selectedRole.users.map((user) => (
                  <div
                    key={user.id}
                    className="flex justify-between items-center border-b py-3"
                  >
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>

                    <button
                      onClick={() => removeUser(user.id)}
                      className="text-red-600 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <Modal onClose={() => setShowCreateModal(false)} title="Create Role">
          <input
            placeholder="Role Name"
            className="w-full border rounded px-3 py-2 mb-3"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <textarea
            placeholder="Description"
            className="w-full border rounded px-3 py-2 mb-3"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <select
            className="w-full border rounded px-3 py-2 mb-3"
            value={positionType}
            onChange={(e) => setPositionType(e.target.value)}
          >
            <option value="child">Add Below Selected Role</option>
            <option value="parent">Add Above Selected Role</option>
            <option value="sibling">Add Same Level</option>
          </select>

          <select
            className="w-full border rounded px-3 py-2 mb-4"
            onChange={(e) =>
              setReferenceRole(
                roles.find((r) => r.id === Number(e.target.value))
              )
            }
          >
            <option>Select Reference Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>

          <button
            onClick={createRole}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Create Role
          </button>
        </Modal>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <Modal onClose={() => setShowEditModal(false)} title="Edit Role">
          <input
            value={form.name}
            className="w-full border rounded px-3 py-2 mb-3"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <textarea
            value={form.description}
            className="w-full border rounded px-3 py-2 mb-4"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <button
            onClick={updateRole}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
        </Modal>
      )}

      {/* Delete */}
      {showDeleteConfirm && (
        <Modal onClose={() => setShowDeleteConfirm(false)} title="Delete Role">
          <p className="mb-4 text-sm text-gray-600">
            Are you sure you want to delete this role? Users assigned to this
            role will lose access.
          </p>

          <button
            onClick={deleteRole}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </Modal>
      )}

      {/* Assign Drawer */}
      {showAssignDrawer && (
        <>
          <div
            onClick={() => setShowAssignDrawer(false)}
            className="fixed inset-0 bg-black/30 z-40"
          />

          <div className="fixed top-0 right-0 h-full w-[380px] bg-white shadow-xl z-50 p-5">
            <div className="flex justify-between mb-4">
              <h2 className="font-bold">Assign Users</h2>
              <X
                className="cursor-pointer"
                onClick={() => setShowAssignDrawer(false)}
              />
            </div>

            {availableUsers.map((user) => (
              <div
                key={user.id}
                className="flex justify-between items-center border-b py-3"
              >
                <div>
                  <p>{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>

                <button
                  onClick={() => assignUsers(user)}
                  className="text-blue-600"
                >
                  Assign
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function Modal({ children, onClose, title }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-[450px] p-5 relative">
        <button onClick={onClose} className="absolute right-4 top-4">
          <X size={18} />
        </button>

        <h2 className="font-bold text-lg mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
}