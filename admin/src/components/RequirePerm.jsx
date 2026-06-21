import React from 'react'
import { useAuth } from '../lib/auth.jsx'

export default function RequirePerm({ section, adminOnly = false, children }) {
  const { can, isAdmin } = useAuth()
  const allowed = adminOnly ? isAdmin : can(section)
  if (!allowed) {
    return (
      <div className="card p-8 text-center">
        <p className="text-lg font-semibold text-gray-800">No access</p>
        <p className="text-sm text-gray-500 mt-1">
          You don’t have permission to view this section. Ask an admin to grant it.
        </p>
      </div>
    )
  }
  return children
}
