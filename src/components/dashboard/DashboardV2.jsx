import { Link } from 'react-router-dom'
import StatusBar from '../StatusBar'
import FloatingMenu from '../FloatingMenu'
import { currentUser, newMembers, stats } from '../../data/mockData'
import '../../styles/dashboard.css'

// V2: Complete profile, no upcoming events
function DashboardV2() {
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'super': return 'status-super'
      case 'active': return 'status-active'
      default: return 'status-basic'
    }
  }

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`
  }

  // Simulated complete user profile
  const completeUser = {
    ...currentUser,
    profileCompletion: 100,
    status: 'super'
  }

  return (
    <>
      <StatusBar />
      <div className="page-content dashboard-page">
        {/* Header */}
        <div className="dashboard-header">
          <div className="header-left">
            <h1 className="welcome-greeting">Welcome, {completeUser.firstName}!</h1>
            <p className="welcome-subtitle">
              {stats.newMembersThisWeek} new people joined this week
            </p>
          </div>
        </div>

        {/* New Members Section */}
        <div className="section">
          <div className="section-header">
            <h2 className="section-title">New Members</h2>
            <Link to="/members" className="section-link">See all</Link>
          </div>
          <div className="new-members-scroll">
            {newMembers.map((member) => (
              <Link key={member.id} to={`/member/${member.id}`} className="new-member-card">
                <div className="new-member-avatar">
                  {member.profilePicture ? (
                    <img src={member.profilePicture} alt={member.firstName} />
                  ) : (
                    <span>{getInitials(member.firstName, member.lastName)}</span>
                  )}
                  <span className={`member-status-dot ${getStatusBadgeClass(member.status)}`} />
                </div>
                <span className="new-member-name">{member.firstName}</span>
              </Link>
            ))}
          </div>
        </div>

      </div>
      <FloatingMenu />
    </>
  )
}

export default DashboardV2
