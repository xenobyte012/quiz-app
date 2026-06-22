import React from 'react';
import { useParams } from 'react-router-dom';
import { Printer } from 'lucide-react';

export default function AttendanceRegister() {
  const { grade, className } = useParams();
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
  // Dummy data for UI building
  const students = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Michael Johnson' },
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-screen print:bg-white print:p-0">
      <div className="max-w-6xl mx-auto">
        
        {/* Header - Hides buttons when printing */}
        <div className="flex justify-between items-end mb-6 print:mb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Class {className?.toUpperCase() || '10A'} Register
            </h1>
            <p className="text-slate-500 print:text-black">Week of Oct 12 - Oct 16</p>
          </div>
          
          <button 
            onClick={() => window.print()}
            className="print:hidden flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <Printer size={18} /> Print Register
          </button>
        </div>

        {/* The Data Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden print:shadow-none print:border-black print:rounded-none">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 print:bg-white print:border-black">
                <th className="py-3 px-4 font-semibold text-slate-700 print:text-black border-r print:border-black">Student Name</th>
                {days.map(day => (
                  <th key={day} className="py-3 px-4 font-semibold text-slate-700 print:text-black text-center border-r last:border-0 print:border-black">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-b border-slate-200 last:border-0 print:border-black">
                  <td className="py-3 px-4 font-medium text-slate-900 border-r print:border-black">{student.name}</td>
                  {days.map(day => (
                    <td key={`${student.id}-${day}`} className="py-3 px-4 text-center border-r last:border-0 print:border-black">
                      
                      {/* UI Toggle for web view */}
                      <label className="print:hidden cursor-pointer flex items-center justify-center">
                        <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                      </label>

                      {/* Empty box for physical pen marking on print view */}
                      <div className="hidden print:block w-6 h-6 border border-black mx-auto rounded-sm"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}