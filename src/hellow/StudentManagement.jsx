import React from 'react';

export default function StudentManagement() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <h1 className="text-2xl font-bold text-slate-900">Manage Students</h1>

        {/* Add Student Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Add New Student</h2>
          <form className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
              <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-blue-500" placeholder="Jane" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
              <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-blue-500" placeholder="Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Assign Class</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-blue-500 bg-white">
                <option value="">Select...</option>
                <option value="10A">10A</option>
                <option value="10B">10B</option>
              </select>
            </div>
            <button type="button" className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Add Student
            </button>
          </form>
        </div>

        {/* Student List */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-semibold text-slate-700">Name</th>
                <th className="py-3 px-4 font-semibold text-slate-700">Grade</th>
                <th className="py-3 px-4 font-semibold text-slate-700">Class</th>
                <th className="py-3 px-4 font-semibold text-slate-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100 last:border-0">
                <td className="py-3 px-4 font-medium text-slate-900">John Doe</td>
                <td className="py-3 px-4 text-slate-600">Grade 10</td>
                <td className="py-3 px-4 text-slate-600">10A</td>
                <td className="py-3 px-4 text-right">
                  <button className="text-red-500 hover:text-red-700 text-sm font-medium">Remove</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}