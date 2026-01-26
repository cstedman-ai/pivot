import { useState } from 'react';
import { Building2, Mail, MessageSquare, Calendar, Linkedin, Github, ChevronDown, ChevronUp, Users, X } from 'lucide-react';
import { departments as allDepartments, type TeamMember } from '../components/partials/departments';

export const Organization = () => {
  const [expandedDepts, setExpandedDepts] = useState<string[]>(['exec']);
  const [showDepartmentsModal, setShowDepartmentsModal] = useState(false);

  const ceo: TeamMember = {
    id: 'ceo',
    name: 'Alex Thompson',
    role: 'Chief Executive Officer',
    email: 'alex.thompson@pivot.com',
    linkedIn: 'https://linkedin.com/in/alexthompson',
    slack: 'https://pivot.slack.com/team/U000CEO',
    calendarAvailability: 'https://calendar.google.com/calendar/appointments/schedules/alex-thompson',
    avatar: '👨‍💼',
    skills: ['Leadership', 'Strategic Planning', 'Business Development'],
  };

  // Show first 6 departments in main view, all others available in modal
  const departments = allDepartments.slice(0, 6);

  const toggleDepartment = (deptId: string) => {
    setExpandedDepts(prev =>
      prev.includes(deptId)
        ? prev.filter(id => id !== deptId)
        : [...prev, deptId]
    );
  };

  const renderContactLinks = (member: TeamMember) => (
    <div className="flex flex-wrap gap-2 mt-2">
      <a
        href={`mailto:${member.email}`}
        className="flex items-center space-x-1 px-2 py-1 text-xs bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
        title="Email"
      >
        <Mail className="w-3 h-3" />
      </a>
      {member.slack && (
        <a
          href={member.slack}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 px-2 py-1 text-xs bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
          title="Slack"
        >
          <MessageSquare className="w-3 h-3" />
        </a>
      )}
      {member.calendarAvailability && (
        <a
          href={member.calendarAvailability}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 px-2 py-1 text-xs bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
          title="Schedule Meeting"
        >
          <Calendar className="w-3 h-3" />
        </a>
      )}
      {member.linkedIn && (
        <a
          href={member.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 px-2 py-1 text-xs bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
          title="LinkedIn"
        >
          <Linkedin className="w-3 h-3" />
        </a>
      )}
      {member.github && (
        <a
          href={member.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 px-2 py-1 text-xs bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
          title="GitHub"
        >
          <Github className="w-3 h-3" />
        </a>
      )}
    </div>
  );

  const totalEmployees = allDepartments.reduce((sum, dept) => sum + dept.teamSize, 0) + 1; // +1 for CEO

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-3">
              <Building2 className="w-8 h-8 text-primary-600" />
              <h1 className="text-4xl font-bold text-gray-800">Organization Structure</h1>
            </div>
            <p className="text-lg text-gray-600">
              Explore our organizational hierarchy and connect with department leaders
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Employees</p>
                  <p className="text-2xl font-bold text-gray-800">{totalEmployees}</p>
                </div>
                <Users className="w-8 h-8 text-primary-600" />
              </div>
            </div>
            <button
              onClick={() => setShowDepartmentsModal(true)}
              className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg hover:border-purple-400 transition-all cursor-pointer w-full text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Departments</p>
                  <p className="text-2xl font-bold text-gray-800">{allDepartments.length}</p>
                  <p className="text-xs text-purple-600 mt-1">Click to view all</p>
                </div>
                <Building2 className="w-8 h-8 text-purple-600" />
              </div>
            </button>
            <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Leadership Team</p>
                  <p className="text-2xl font-bold text-gray-800">{allDepartments.length + 1}</p>
                  <p className="text-xs text-gray-600 mt-1">CEO + Dept Leads</p>
                </div>
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          {/* Organization Chart */}
          <div className="space-y-6">
            {/* CEO Section */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-primary-300 p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-3xl flex-shrink-0">
                    {ceo.avatar}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-800">{ceo.name}</h2>
                    <p className="text-primary-600 font-semibold text-lg">{ceo.role}</p>
                    {renderContactLinks(ceo)}
                  </div>
                </div>
              </div>
            </div>

            {/* Departments */}
            <div className="pl-8 border-l-4 border-gray-300 space-y-4">
              {departments.map((dept) => {
                const isExpanded = expandedDepts.includes(dept.id);
                return (
                  <div key={dept.id} className="relative">
                    {/* Connection Line */}
                    <div className="absolute left-0 top-8 w-8 h-0.5 bg-gray-300"></div>

                    {/* Department Card */}
                    <div className={`ml-8 bg-white rounded-xl shadow-md border-2 ${dept.color} overflow-hidden`}>
                      <div className="p-5">
                        {/* Department Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-3xl">{dept.icon}</span>
                            <div>
                              <h3 className="text-xl font-bold text-gray-800">{dept.name}</h3>
                              <p className="text-sm text-gray-600">{dept.teamSize} team members</p>
                            </div>
                          </div>
                          <button
                            onClick={() => toggleDepartment(dept.id)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label={isExpanded ? 'Collapse' : 'Expand'}
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5 text-gray-600" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-600" />
                            )}
                          </button>
                        </div>

                        {/* Department Lead (Expanded) */}
                        {isExpanded && (
                          <div className="border-t border-gray-200 pt-4">
                            <div className="flex items-start space-x-4">
                              <div className="w-14 h-14 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                                {dept.lead.avatar}
                              </div>
                              <div className="flex-1">
                                <h4 className="text-lg font-bold text-gray-800">{dept.lead.name}</h4>
                                <p className="text-primary-600 font-medium">{dept.lead.role}</p>
                                <p className="text-sm text-gray-600 mt-1">{dept.lead.email}</p>
                                {renderContactLinks(dept.lead)}
                                
                                {/* Skills */}
                                <div className="mt-3">
                                  <p className="text-xs font-semibold text-gray-700 mb-1">Key Skills</p>
                                  <div className="flex flex-wrap gap-1">
                                    {dept.lead.skills.map((skill, idx) => (
                                      <span
                                        key={idx}
                                        className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs"
                                      >
                                        {skill}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Collapsed View - Just show lead name */}
                        {!isExpanded && (
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span className="font-medium">Lead:</span>
                            <span>{dept.lead.name}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">💡 About Our Organization</h3>
            <p className="text-sm text-blue-800">
              Our organizational structure is designed to foster collaboration and innovation across all departments.
              Each department leader is committed to excellence and is available to discuss opportunities, mentorship,
              and cross-functional initiatives. Click on any department to expand and view detailed information about
              the department lead and their contact methods. Showing {departments.length} of {allDepartments.length} departments - click the Departments stat above to view all.
            </p>
          </div>
        </div>
      </div>

      {/* Departments Modal */}
      {showDepartmentsModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowDepartmentsModal(false)}
          />

          {/* Modal */}
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="relative bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">All Departments</h2>
                  <p className="text-sm text-gray-600">
                    {allDepartments.length} departments • {totalEmployees} total employees
                  </p>
                </div>
                <button
                  onClick={() => setShowDepartmentsModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="px-6 py-4 overflow-y-auto max-h-[calc(90vh-88px)]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {allDepartments.map((dept) => (
                    <div
                      key={dept.id}
                      className={`rounded-lg border-2 ${dept.color} p-4 hover:shadow-lg transition-shadow`}
                    >
                      <div className="flex items-start space-x-3 mb-3">
                        <span className="text-3xl">{dept.icon}</span>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 text-base">{dept.name}</h3>
                          <p className="text-sm text-gray-600">{dept.teamSize} team members</p>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-3 mt-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-lg flex-shrink-0">
                            {dept.lead.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm text-gray-800 truncate">{dept.lead.name}</p>
                            <p className="text-xs text-gray-600 truncate">{dept.lead.role}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mt-2">
                          <a
                            href={`mailto:${dept.lead.email}`}
                            className="p-1.5 bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                            title="Email"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Mail className="w-3 h-3 text-gray-600" />
                          </a>
                          {dept.lead.slack && (
                            <a
                              href={dept.lead.slack}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                              title="Slack"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MessageSquare className="w-3 h-3 text-gray-600" />
                            </a>
                          )}
                          {dept.lead.calendarAvailability && (
                            <a
                              href={dept.lead.calendarAvailability}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                              title="Schedule"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Calendar className="w-3 h-3 text-gray-600" />
                            </a>
                          )}
                          {dept.lead.linkedIn && (
                            <a
                              href={dept.lead.linkedIn}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                              title="LinkedIn"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Linkedin className="w-3 h-3 text-gray-600" />
                            </a>
                          )}
                          {dept.lead.github && (
                            <a
                              href={dept.lead.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                              title="GitHub"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Github className="w-3 h-3 text-gray-600" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

